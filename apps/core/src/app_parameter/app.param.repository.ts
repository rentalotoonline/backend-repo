import BaseRepository from "../../../helpers/src/BaseRepository";
import ApplicationParameter from "./ApplicationParameter";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import keyValInjection from "../../../helpers/src/keyValInjection";
import AppException from "../../../helpers/src/exceptions";
import AppConstants from "../../../configs/src/constants";


@Injectable()
export default class AppParamRepository implements BaseRepository<ApplicationParameter>{

  constructor(@InjectRepository(ApplicationParameter) protected repo:Repository<ApplicationParameter>) {
  }
  
  raw(){
    return this.repo
  }

  findByID(id: number): Promise<ApplicationParameter> {
        return this.repo.findOne({where:{id}})
    }
    findBy(key: string, value: any): Promise<ApplicationParameter> {
        return this.repo.findOne({where:{...keyValInjection(key,value)}})
    }
    listBy(key: string, value: any, take: number, skip: number): Promise<ApplicationParameter[]> {
        return this.repo.find({skip,take,where:{...keyValInjection(key,value)}})
    }
    list(take: number, skip: number, search?: any): Promise<ApplicationParameter[]> {
        if (search!=undefined){
          return this.repo.find({
            take,skip,
            where:[
              {code:ILike(`%${search}%`) },
              {value:ILike(`%${search}%`) },
              {group_data:ILike(`%${search}%`) },
              {type_data:ILike(`%${search}%`) },
            ]
          })
        }
        return this.repo.find({take,skip})

    }
    save(entity: ApplicationParameter): Promise<ApplicationParameter> {
        return this.repo.save(entity)
    }
    async update(entity: ApplicationParameter): Promise<boolean> {
        try {
          await this.repo.update(entity.id,entity)
          return true
        }catch (e){
          return false
        }
    }
    async delete(entity: ApplicationParameter): Promise<boolean> {
        try {
          await this.repo.delete(entity.id)
          return true
        }catch (e) {
          return false
        }
    }

}