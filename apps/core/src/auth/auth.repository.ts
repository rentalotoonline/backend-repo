import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import PersonalAccessToken from "./personal.access.token";
import { Repository } from "typeorm";
import BaseRepository from "../../../helpers/src/BaseRepository";


@Injectable()
export default class AuthRepository implements BaseRepository<PersonalAccessToken>
{

  constructor(@InjectRepository(PersonalAccessToken)protected repository:Repository<PersonalAccessToken>) {
  }
  raw(){
    return this.repository
  }
  findByID(id: number): Promise<PersonalAccessToken> {
        throw new Error("Method not implemented.");
    }
    findBy(key: string, value: any): Promise<PersonalAccessToken> {
        throw new Error("Method not implemented.");
    }
    listBy(key: string, value: any, take: number, skip: number): Promise<PersonalAccessToken[]> {
        throw new Error("Method not implemented.");
    }
    list(take: number, skip: number, search?: any): Promise<PersonalAccessToken[]> {
        throw new Error("Method not implemented.");
    }
    save(entity: PersonalAccessToken): Promise<PersonalAccessToken> {
        return this.repository.save(entity)
    }
    update(entity: PersonalAccessToken): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    delete(entity: PersonalAccessToken): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}