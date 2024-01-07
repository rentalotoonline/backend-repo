import { Injectable } from "@nestjs/common";
import AppParamRepository from "../app_parameter/app.param.repository";
import { InjectRepository } from "@nestjs/typeorm";
import ApplicationParameter from "../app_parameter/ApplicationParameter";
import { ILike, Repository } from "typeorm";
import AppConstants from "../../../configs/src/constants";


@Injectable()
export default class RolesRepository extends AppParamRepository{
  groupType:string = AppConstants.APPLICATION_PARAMETER_GROUP_TYPES.ROLE
  constructor(@InjectRepository(ApplicationParameter)  repos:Repository<ApplicationParameter>) {
    super(repos);
  }

  list(take: number, skip: number, search?: any): Promise<ApplicationParameter[]> {
    let wheres=["value","code"]
    const where = wheres.map(val=>{
      if(search!=null){
        return {
          group_data:this.groupType,
          [val]:ILike(`%${search}%`)
        }
      }else{
        return {
          group_data:this.groupType,
        }
      }

    })

    return this.raw().find({
      take,skip,where,
    })
  }


  findByCode(value: any): Promise<ApplicationParameter> {
    return super.findBy("code", value);
  }


}