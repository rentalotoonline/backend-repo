import { Injectable } from "@nestjs/common";
import BaseRepository from "../../../helpers/src/BaseRepository";
import Users from "./Users";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import keyValInjection from "../../../helpers/src/keyValInjection";
import ApplicationParameter from "../app_parameter/ApplicationParameter";

@Injectable()
export default class UserRepository implements BaseRepository<Users>{
    fieldList = ["name","email"];
    constructor(@InjectRepository(Users) protected repository:Repository<Users>) {
    }
    async findByID(id: number): Promise<Users> {
        const where={id}
        return this.repository.findOne({where})
    }
    async findBy(key: string, value: any): Promise<Users> {
        const where = keyValInjection(key,value)
        return  this.repository.findOne({where,relations:['role_']})
    }
    listBy(key: string, value: any, take: number, skip: number): Promise<Users[]> {
        const where = {[key]:value}
        return this.repository.find({where,skip,take})
    }
    list(take: number, skip: number, search?: any): Promise<Users[]> {
        let where=[];
        if(search!=null){
            where = this.fieldList.map(conditionKey=>{
                return{[conditionKey]:ILike(`%${search}%`)}
            })
        }

        return this.repository.find({take,skip,where})

    }
    async save(entity: Users): Promise<Users> {
        return this.repository.save(entity)
    }
    update(entity: Users): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    delete(entity: Users): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}