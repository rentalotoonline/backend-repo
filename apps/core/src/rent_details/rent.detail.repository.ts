import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import RentDetails from "./rent.details";
import { Repository } from "typeorm";


@Injectable()
export default class RentDetailRepository{
  	constructor(@InjectRepository(RentDetails) private repo:Repository<RentDetails>) {
	}
	raw(){
		return this.repo
	}
}