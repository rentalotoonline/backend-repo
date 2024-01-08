import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import ApplicationParameter from "../app_parameter/ApplicationParameter";
import { ILike, Repository } from "typeorm";
import AppParamRepository from "../app_parameter/app.param.repository";
import AppConstants from "../../../configs/src/constants";


@Injectable()
export default class CarTypeRepository extends AppParamRepository{

  	constructor(@InjectRepository(ApplicationParameter) repository:Repository<ApplicationParameter>) {
	  super(repository);
	}

	async findAllCarType(take:number,skip:number,search:string|null){
		const group_data = AppConstants.APPLICATION_PARAMETER_GROUP_TYPES.CAR_TYPE
		const repos =  this.raw()
	    const defaultCondition = {group_data}
	  	let where=[];
	  	const wheres=["value","code"]

	  	if(search!=null){
		  where = wheres.map(val=>{
			return {
			  group_data,
			  [val]:ILike(`%${search}%`)}
		  })
		}else{
			where.push({group_data})
		}

	  	return repos.find({
		  take,skip,where
		})
	}

	async findCarType(code:string){
	  const group_data = AppConstants.APPLICATION_PARAMETER_GROUP_TYPES.CAR_TYPE
	  const where={
		group_data,
		code,
	  }
		return await this.raw().findOne({
		  where
		})
	}

}