import { Injectable } from "@nestjs/common";
import BaseAdapters from "../../../helpers/src/baseAdapters";
import Users from "./Users";
import CreateUserRequest from "../../../dto/src/users/create.user.request";
import CreateUsersDto from "../../../dto/src/users/create.users.dto";
import CreateUserResponse from "../../../dto/src/users/create.user.response";
import RoleAdapters from "../roles/role.adapters";


@Injectable()
export default class UserAdapter {
    static entityToResponse(entity: Users): CreateUserResponse {
        const role = RoleAdapters.convertToResponse(entity.getRole())
        return new CreateUserResponse()
          .setId(entity.getId())
          .setName(entity.getName())
          .setEmail(entity.getEmail())
          .setRole(role)
    }
    static entityToResponseList(e: Users[]): CreateUserResponse[] {
        return e.map(val=>{
            return this.entityToResponse(val)
        })
    }
    static requestToDto(request: CreateUserRequest): CreateUsersDto {
        return new CreateUsersDto()
          .setName(request.name)
          .setEmail(request.email)
          .setPassword(request.password)
          .setRoleCode(request.role_code)
    }
    static dtoToEntity(dto: CreateUsersDto): Users {
        return new Users()
          .setEmail(dto.getEmail())
          .setName(dto.getName())
          .setPassword(dto.getPassword())
    }



}