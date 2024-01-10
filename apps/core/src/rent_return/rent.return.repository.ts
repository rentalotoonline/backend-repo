import { Injectable } from "@nestjs/common";
import { QueryRunner } from "typeorm";
import RentReturn from "./rent.return";


@Injectable()

export default class RentReturnRepository{
  protected queryRunner:QueryRunner


  setQueryRunner(q:QueryRunner){
	this.queryRunner = q
	return this;
  }
  async save(ent:RentReturn):Promise<RentReturn>{
	return await this.queryRunner.manager.save(RentReturn,ent)
  }



}