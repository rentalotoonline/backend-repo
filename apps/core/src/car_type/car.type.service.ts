import { Injectable, Logger } from "@nestjs/common";

import CarTypeAdapter from "./car.type.adapter";
import CarTypeRequest from "../../../dto/src/car_type/car.type.request";
import CarTypeRepository from "./car.type.repository";
import { createFailResp, createSuccessResp } from "../../../helpers/src/createResponse";
import AppConstants from "../../../configs/src/constants";
import Pagination from "../../../helpers/src/Pagination";


@Injectable()
export default class CarTypeService{
  	constructor(private repo:CarTypeRepository) {
	}
  	async create(request:CarTypeRequest){
		try {
		  const dto = CarTypeAdapter.requestToDTO(request)
		  const entity = CarTypeAdapter.dtoToEntity(dto)
		  const result = await this.repo.save(entity)
		  const response = CarTypeAdapter.entityToResponse(result)
		  return createSuccessResp(201,AppConstants.MESSAGES.CREATED,response)
		}catch (e) {
		  Logger.log(e)
		  createFailResp(400,AppConstants.MESSAGES.BAD_REQUEST,e)
		}
	}
	async find(code:string){
		try {
		  const result  =  await this.repo.findCarType(code)
		  const resp = CarTypeAdapter.entityToResponse(result)
		  return createSuccessResp(200,AppConstants.MESSAGES.SUCCESS,resp);
		}catch (e) {
			createFailResp(400,AppConstants.MESSAGES.BAD_REQUEST,e)
		}

	}
	async all(page:number,search:string|null){
		try {
		  let {take,skip} = Pagination.getOffset(page)
		  const results= await this.repo.findAllCarType(take,skip,search)
		  const response = CarTypeAdapter.ListEntityToResponse(results)
		  return createSuccessResp(200,AppConstants.MESSAGES.SUCCESS,response)
		}catch (e) {
			createFailResp(400,AppConstants.MESSAGES.BAD_REQUEST,e)
		}

	}
}