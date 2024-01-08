import BaseRepository from "../../../helpers/src/BaseRepository";
import Cars from "./Cars";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import keyValInjection from "../../../helpers/src/keyValInjection";
import { Injectable } from "@nestjs/common";

@Injectable()
export default class CarsRepository implements BaseRepository<Cars>{
    private relation = ['driver','carType']
    constructor(@InjectRepository(Cars) protected repos:Repository<Cars>) {
    }
    async findByID(id: number): Promise<Cars> {
       return await this.repos.findOne({where:{id},relations:this.relation})
    }
    async findBy(key: string, value: any): Promise<Cars> {
        return await this.repos.findOne({where:{...keyValInjection(key,value)},relations:this.relation})
    }
    async listBy(key: string, value: any, take: number, skip: number): Promise<Cars[]> {
        return this.repos.find({
            take,skip,where:{...keyValInjection(key,value)},relations:this.relation,
        })

    }
    async list(take: number, skip: number, search?: any): Promise<Cars[]> {
        let where=[]
        const fields = [
          "car_description",
          "plate_number"
        ];
        if(search!=null){
            where = fields.map(val=>{
                return {
                    [val]:ILike(`%${search}%`)
                }
            })
        }

        return  this.repos.find({take,skip,where,relations:this.relation})
    }
    async save(entity: Cars): Promise<Cars> {
        return this.repos.save(entity);
    }
    update(entity: Cars): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    delete(entity: Cars): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}