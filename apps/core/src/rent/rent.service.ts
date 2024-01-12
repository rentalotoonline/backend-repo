import { Injectable, Logger } from "@nestjs/common";
import RentRepository from "./rent.repository";
import CarsRepository from "../cars/cars.repository";
import UserRepository from "../users/user.repository";
import Rent from "./Rent";
import AppException from "../../../helpers/src/exceptions";
import RentDto from "../../../dto/src/rent/rent.dto";
import AppResponse from "../../../configs/src/responses";
import { dateDifference, padText } from "../../../helpers/src/string.fn";
import RentRequest from "../../../dto/src/rent/rent.request";
import { createFailResp, createSuccessResp } from "../../../helpers/src/createResponse";
import AppConstants from "../../../configs/src/constants";
import RentAdapter from "./rent.adapter";
import { QueryRunner } from "typeorm";
import Cars from "../cars/Cars";
import RentDetails from "../rent_details/rent.details";
import DatasourceConfiguration from "../../../configs/src/databases";
import AppParamRepository from "../app_parameter/app.param.repository";
import ApplicationParameter from '../app_parameter/ApplicationParameter';
import RentDetailRepository from '../rent_details/rent.detail.repository';


@Injectable()
export default class RentService{
  	constructor(
		protected rentRepository:RentRepository,
		protected carRepository:CarsRepository,
		protected customerRepository:UserRepository,
		protected appParamRepository:AppParamRepository,
		protected rentDetailRepository:RentDetailRepository,
	) {

	}

  	private async generateInvoice(){
		const db = this.rentRepository.raw()
	  	const data = await db.query("SELECT invoice_number FROM transactions.rents ORDER by id desc LIMIT 1")
	  	let fr,back = ""
	  	try {
		  [fr,back] = data[0].invoice_number.split("-")
		}catch (e) {
		  back="0"
		}

	  	const backInt = parseInt(back)+1
		const code = padText(backInt,8)
	    return `IVN-${code}`
	}
	getTransactionStatusCodeCreated = async ()=>{
	  return await this.appParamRepository.findBy("code", AppConstants.TRX_STATUS_ARRAY.CREATED.code)
	}
  	async create(rent:RentRequest):Promise<AppResponse>{

	  const q = await DatasourceConfiguration.getDataSource()
	  const qRun = q.createQueryRunner("slave")
	  await qRun.connect()
	  try {
		  	await qRun.startTransaction()
		  	const dto = RentAdapter.requestToDto(rent)
				const statusCode = await this.getTransactionStatusCodeCreated()
				const invoice = await this.generateInvoice()
				const findCar = await this.carRepository.findByQrunnerID(dto.getCarId(),qRun)
				if(findCar==null){
					throw new AppException("Car is not available")
				}
					const customerInfo = await this.customerRepository.findByID(dto.getCustomerId())
				const e = RentAdapter.dtoToEntity(dto,customerInfo,statusCode)
				e.setInvoiceNumber(invoice)
					const result = await this.rentRepository.create(e,qRun)
				const payment =await this.createRentDetails(dto,e,findCar,dto.getDiscount()??0,qRun)
				result.setPayment(payment.totalPayment)
				result.setDiscount(payment.discount)
				const finalResult = await this.rentRepository.update(result,qRun)
			finalResult.setDetail(payment.data)
				const updatedCars = await this.carStatusUpdate(qRun,findCar)
				const resp = RentAdapter.entityToResponse(finalResult)
				await qRun.commitTransaction()

				return createSuccessResp(201,AppConstants.MESSAGES.CREATED,resp)
		}catch (e) {
				Logger.error(e)
		  	await qRun.rollbackTransaction()
		  	createFailResp(400,AppConstants.MESSAGES.BAD_REQUEST,e)
		}
	}

  private async carStatusUpdate(qRun: QueryRunner, findCar: Cars):Promise<Cars>{

		try {
		  let fCar = findCar
		  fCar.setIsAvailable(false)
		  await qRun.connect()
		  await qRun.startTransaction()
		  await qRun.manager.update(Cars,fCar.id,fCar)
		  await qRun.commitTransaction()
		  return fCar

		}catch (e) {
		  await qRun.rollbackTransaction()
		  return null
		}

  }
	async update(rent:Rent):Promise<Rent>{
	  throw new AppException("Not implemented")
	}

	async cancelInvoice(rent:Rent):Promise<Rent>{
	  throw new AppException("Not implemented")
	}

	async findByID(id:number):Promise<Rent>{
	  throw new AppException("Not implemented")
	}
	async findByCustomer(customer_id:number):Promise<Rent>{
	  throw new AppException("Not implemented")
	}

	async findByInvoiceNo(invoiceNum:string):Promise<Rent>{
		  throw new AppException("Not implemented")
	}




  private async createRentDetails(dto:RentDto, e: Rent, findCar: Cars, discount: number,q:QueryRunner) {

		const qRun = q
		await qRun.connect()
		await qRun.startTransaction()
		try {
		  let datas:RentDetails[]=[]
		  //cars
		  const {days} = dateDifference(e.getRentDate(),e.getReturnEstimationDate())
		  let payment = days*findCar.getPrice();
		  let driver_payment = dto.getWithDriver()?days*findCar.getAdditionalPrice() : 0;
		  let tPayment = payment+driver_payment
		  let adminNominal = tPayment*AppConstants.ADMIN_DEF_PAYMENT
		  let discountNominal = tPayment*(discount/100)
			let admin=await this.createAdminPayment(qRun,e,adminNominal)
			let driver = await this.createDriverPayment(qRun,e,driver_payment)
			let discountData = await this.createDiscountPrice(qRun,e,discountNominal)
			let carData = await this.createCarData(qRun,e,findCar,payment)


			const adminResult_tmp = await qRun.manager.save(RentDetails, admin);
			const adminResult = await this.getApplicationParams(qRun,adminResult_tmp)
			adminResult_tmp.setAppParam(adminResult)
			datas.push(adminResult_tmp)
			const driverResultTmp = await qRun.manager.save(RentDetails, driver);
			const driverResult = await this.getApplicationParams(qRun,driverResultTmp)
			driverResultTmp.setAppParam(driverResult)
			datas.push(driverResultTmp)
			const discountResultTmp = await qRun.manager.save(RentDetails, discountData);
			const discountResult = await this.getApplicationParams(qRun,discountResultTmp)
			discountResultTmp.setAppParam(discountResult)
			datas.push(discountResultTmp)
			const carResultTmp = await qRun.manager.save(RentDetails, carData);
			const carResult = await qRun.manager.findOne(Cars, {
				where:{
					id:carResultTmp.item_id
				},
				relations:['driver','carType']
			});
			carResultTmp.setCars(carResult)
			datas.push(carResultTmp)

		  await qRun.commitTransaction()
		  return {
				data:datas,
				totalPayment:tPayment-discountNominal+adminNominal,
				discount,
		  };
		}catch (e) {
		  qRun.rollbackTransaction()
		  throw new AppException(e.message,500)
		}

  }

	private async createAdminPayment(qRun: QueryRunner, e: Rent, adminNominal: number) {
		const itemType = "ApplicationParameter"
		const item = await this.rentDetailRepository.getAdminPayment(qRun)
		return new RentDetails()
				.setRent(e)
				.setItemType(itemType)
				.setItemId(item.getId())
				.setPrice(adminNominal)

	}

	private async createDriverPayment(qRun: QueryRunner, e: Rent, driver_payment: number) {
		const itemType = "ApplicationParameter"
		const item = await this.rentDetailRepository.getDriverPayment(qRun)
		return new RentDetails()
			.setRent(e)
			.setItemType(itemType)
			.setItemId(item.getId())
			.setPrice(driver_payment)
	}

	private async createDiscountPrice(qRun: QueryRunner, e: Rent, driver_payment: number) {
		const itemType = "ApplicationParameter"
		const item = await this.rentDetailRepository.getDiscount(qRun)
		return new RentDetails()
			.setRent(e)
			.setItemType(itemType)
			.setItemId(item.getId())
			.setPrice(driver_payment)
	}

	private async createCarData(qRun: QueryRunner, e: Rent, findCar: Cars, payment: number) {
		const itemType = "Cars"
		return new RentDetails()
			.setRent(e)
			.setItemType(itemType)
			.setItemId(findCar.getId())
			.setPrice(payment)
	}

	private async getApplicationParams(qRun: QueryRunner, rentDetails: RentDetails) {
		return await qRun.manager.findOne(ApplicationParameter,{
			where:{id:rentDetails.item_id}
		})
	}
}