import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import Rent from "./Rent";
import { QueryRunner, Repository } from "typeorm";
import keyValInjection from "../../../helpers/src/keyValInjection";


@Injectable()
export default class RentRepository{
  fields=["terminated","customer_id",""];
  private relations: string[]=["customer"];
  constructor(@InjectRepository(Rent) protected rentRepository:Repository<Rent>) {}

  raw(){
    return this.rentRepository
  }
  async create(e:Rent,queryRun:QueryRunner):Promise<Rent>{

      return await queryRun.manager.save(Rent,e)
  }
  async update(e:Rent,queryRun:QueryRunner):Promise<Rent>{
    const id =e.id
      await queryRun.manager.update(Rent,e.id,e)
      const result =  await this.findByID(id,queryRun)
      Logger.log("QUERY OK")
     return result
  }

  async delete(id:number){
    const findby = await this.findByID(id)
    await this.rentRepository.delete(findby.id)
    return findby
  }

  async findBy({key,value}){
    const where = keyValInjection(key,value)
    return this.rentRepository.findOne({ where })
  }

  async findByID(id,runner?:QueryRunner){
    if(runner!=undefined){
      return await runner.manager.findOne(Rent,{ where:{id:id},relations:this.relations })
    }else{
      return await this.rentRepository.findOne({where:{id}})
    }
  }

  async listBy({take,skip,search,key,val}){

    const conditionDefault= keyValInjection(key,val)


  }


}