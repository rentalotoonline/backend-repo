import { Injectable, Logger } from '@nestjs/common';
import RentReturnRepository from "./rent.return.repository";
import RentRepository from "../rent/rent.repository";
import RentReturnRequest from '../../../dto/src/rent_return/rent.return.request';
import RentReturnAdapters from './rent.return.adapters';
import RentReturnDto from '../../../dto/src/rent_return/rent.return.dto';
import Rent from '../rent/Rent';
import { dateDifference } from '../../../helpers/src/string.fn';
import RentReturn from './rent.return';
import CarsRepository from '../cars/cars.repository';
import AppConstants from '../../../configs/src/constants';
import { createFailResp, createSuccessResp } from '../../../helpers/src/createResponse';
import DatasourceConfiguration from '../../../configs/src/databases';
import ApplicationParameter from '../app_parameter/ApplicationParameter';
import AppParamRepository from '../app_parameter/app.param.repository';


@Injectable()
export default class RentReturnService{
  constructor(
      protected repository:RentReturnRepository,
      protected rentRepository:RentRepository,
      protected carRepository: CarsRepository,
      protected applicationParamRepository:AppParamRepository
  ) {
  }

  async createReturn(req:RentReturnRequest){
    const ds = await DatasourceConfiguration.getDataSource()
    const queryRun = ds.createQueryRunner('slave')
    try {
      await queryRun.connect()
      await queryRun.startTransaction()
      this.repository.setQueryRunner(queryRun)
      let dto = RentReturnAdapters.requestToDto(req)
      const rent = await this.rentRepository.findBy({key:"invoice_number",value:dto.getInvoice()},["details","customer"])
      let entity=RentReturnAdapters.dtoToEntity(dto,rent)
      const excesDay = this.getExcessDay(dto,rent)
      entity.setExcessDay(excesDay)
      entity = await this.getExcessCalculation(entity)
      const result = await this.repository.save(entity)
      const response = RentReturnAdapters.entityToResponse(result)
      queryRun.commitTransaction()
      return createSuccessResp(201,AppConstants.MESSAGES.CREATED,response)
    }catch (e) {
      queryRun.rollbackTransaction()
      Logger.log(e)
      createFailResp(400,AppConstants.MESSAGES.BAD_REQUEST,e)
    }
  }

  private getExcessDay(dto: RentReturnDto, rent: Rent) {
    const returnDate = dto.getDate()
    const estimationDate = rent.getReturnEstimationDate()
    const excess = dateDifference(estimationDate,returnDate)
    return excess.days < 0 ? 0 : excess.days;
  }


  private async getExcessCalculation(entity: RentReturn) {
    let price = 0;
    let details = entity.getRent().getDetail()
    let detailArray = [];
    for(let detail of details){
      let xdetail = detail
      if(detail.getItemType().toLowerCase()=="cars"){
        const cars = await this.carRepository.findWithoutScopeByID(detail.item_id)
        Logger.debug(cars);
        price = (cars.getPrice()*AppConstants.CHARGE_PERCENTAGE)*entity.getExcessDay()
        xdetail.setCars(cars)
      }else{
        const AppParam = await this.applicationParamRepository.findByID(detail.item_id)
        xdetail.setAppParam(AppParam)
      }
      detailArray.push(xdetail)
    }
    let rent = entity.getRent()

    entity.setCharge(price)
    rent.setDetail(detailArray)
    entity.setRent(rent)

    return entity;
  }
}
