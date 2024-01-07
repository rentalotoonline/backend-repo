import { Injectable } from "@nestjs/common";
import RolesRepository from "./roles.repository";
import AppResponse from "../../../configs/src/responses";
import { createFailResp, createSuccessResp } from "../../../helpers/src/createResponse";
import AppConstants from "../../../configs/src/constants";
import RoleAdapters from "./role.adapters";
import CreateRoleDto from "../../../dto/src/roles/CreateRoleDto";
import CreateRoleRequest from "../../../dto/src/roles/CreateRoleRequest";
import ApplicationParameter from "../app_parameter/ApplicationParameter";
import AppException from "../../../helpers/src/exceptions";
import Pagination from "../../../helpers/src/Pagination";


@Injectable()
export default class RoleService{
    constructor(private repository:RolesRepository) {
    }

    async findByCode(code:string){
      try {
        const result = await this.repository.findByCode(code)
        const vcode = RoleAdapters.getIfRoleData(result)
        if(!vcode){
          throw new AppException(AppConstants.MESSAGES.DATA_IS_NOT_ROLE,404)
        }
        const response = RoleAdapters.convertToResponse(result)
        return createSuccessResp(200,AppConstants.MESSAGES.SUCCESS,response)
      }catch (e) {
        createFailResp(400,AppConstants.MESSAGES.BAD_REQUEST,e)
      }
    }
    async findAll(page:number,search:any):Promise<AppResponse>{
      try{
        const {take,skip}  = Pagination.getOffset(page)

        const result =  await this.repository.list(take,skip,search)
        return createSuccessResp(200,AppConstants.MESSAGES.SUCCESS,RoleAdapters.convertRoleReponseList(result))
      }catch (e) {
        createFailResp(400,AppConstants.MESSAGES.BAD_REQUEST,e)
      }
    }
    async findById(id:number){
      try {
        const data =  await this.repository.findByID(id)
        const isRoleData  = RoleAdapters.getIfRoleData(data)
        if(!isRoleData){
          throw new AppException(AppConstants.MESSAGES.DATA_IS_NOT_ROLE,404)
        }
        return createSuccessResp(200,AppConstants.MESSAGES.SUCCESS,data)
      }catch (e) {
        if(e instanceof AppException){
          createFailResp(e.getCode(),AppConstants.MESSAGES.BAD_REQUEST,e)
        }else{
          createFailResp(500,AppConstants.MESSAGES.BAD_REQUEST,e)
        }
      }
    }

    async store(data:CreateRoleDto){
      try {
        const entity:ApplicationParameter = RoleAdapters.convertDtoToEntity(data)
        const result = await this.repository.save(entity)
        const response = RoleAdapters.convertToResponse(result)
        return createSuccessResp(201,AppConstants.MESSAGES.CREATED,response)
      }catch (e) {
        createFailResp(400,AppConstants.MESSAGES.BAD_REQUEST,e)
      }
    }

    async update(id:number,data:CreateRoleDto){
      try {
        const entity:ApplicationParameter = RoleAdapters.convertDtoToEntity(data)
        entity.setId(id)
        const result = await this.repository.update(entity)
        if(!result){
          throw new AppException("Something error on repository")
        }
        const response = RoleAdapters.convertToResponse(entity)
        return createSuccessResp(201,AppConstants.MESSAGES.UPDATED,response)
      }catch (e) {
        createFailResp(400,AppConstants.MESSAGES.BAD_REQUEST,e)
      }
    }

    async delete(id:number){
      try {
        const entity = RoleAdapters.createEntityByID(id)
        const result = await this.repository.delete(entity)
        return createSuccessResp(200,AppConstants.MESSAGES.DELETED,null)
      }catch (e) {
        createFailResp(400,AppConstants.MESSAGES.BAD_REQUEST,e)
      }
    }
}