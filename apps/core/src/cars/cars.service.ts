import CarsRepository from "./cars.repository";
import { Injectable, Logger } from "@nestjs/common";
import CarsAdapter from "./cars.adapter";
import CarsRequest from "../../../dto/src/cars/cars.request";
import UserRepository from "../users/user.repository";
import CarTypeRepository from "../car_type/car.type.repository";
import { createFailResp, createSuccessResp } from "../../../helpers/src/createResponse";
import AppConstants from "../../../configs/src/constants";
import Pagination from "../../../helpers/src/Pagination";

@Injectable()
export default class CarsService{
  	constructor(
		protected repository:CarsRepository,
		protected userRepository:UserRepository,
		protected carTypeRepository:CarTypeRepository,
		) {
	}

	async findCarByPlate(code:string){
		try {
		  const result = await this.repository.findBy("plate_number",code)
		  const response = CarsAdapter.convertToCarsResponse(result)
		  return createSuccessResp(200,AppConstants.MESSAGES.SUCCESS,response)
		}catch (e) {
			Logger.error(e)
		  	createFailResp(400,AppConstants.MESSAGES.BAD_REQUEST,e)
		}
	}

	async create(request:CarsRequest){
		try {
		  const dto = CarsAdapter.convertToCarsDto(request)
		  const driverID = dto.getDriverId()
		  const driver = await this.userRepository.findByID(parseInt(driverID))
		  const carType = await this.carTypeRepository.findCarType(dto.getCarTypeCode())
		  const entity = CarsAdapter.convertToCarsEntity(dto,driver,carType)
		  const result = await this.repository.save(entity)
		  const cars = await this.repository.findByID(result.getId())
		  const response = CarsAdapter.convertToCarsResponse(cars)
		  return createSuccessResp(201,AppConstants.MESSAGES.CREATED
		  ,response)
		}catch (e) {
		  Logger.error(e)
		  createFailResp(400,AppConstants.MESSAGES.BAD_REQUEST,e)
		}

	}
	async findAll(page:number,search:string|null){
		try {
		  const {take,skip} = Pagination.getOffset(page)
		  const result = await this.repository.list(take,skip,search)
		  const response = CarsAdapter.entityListToResponse(result)
		  return createSuccessResp(200,AppConstants.MESSAGES.SUCCESS,response)
		}catch (e) {
		  Logger.error(e)
		  createFailResp(400,AppConstants.MESSAGES.BAD_REQUEST,e)
		}
	}
}