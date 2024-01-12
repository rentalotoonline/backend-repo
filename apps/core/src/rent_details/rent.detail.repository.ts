import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import RentDetails from "./rent.details";
import { QueryRunner, Repository } from 'typeorm';
import ApplicationParameter from '../app_parameter/ApplicationParameter';
import AppConstants from '../../../configs/src/constants';


@Injectable()
export default class RentDetailRepository{
  	constructor(@InjectRepository(RentDetails) private repo:Repository<RentDetails>) {
	}
	raw(){
		return this.repo
	}

	async getAdminPayment(q:QueryRunner){
			const code=AppConstants.ADMIN_PAYMENT_PARAMETER;
			return await q.manager.findOneBy(ApplicationParameter,{code})
	}
	async getDiscount(q:QueryRunner){
			const code=AppConstants.DISCOUNT_PARAMETER;
			return await q.manager.findOneBy(ApplicationParameter,{code})
	}
	async getDriverPayment(q:QueryRunner){
			const code=AppConstants.DRIVER_PAYMENT_PARAMETER;
			return await q.manager.findOneBy(ApplicationParameter,{code})
	}
}