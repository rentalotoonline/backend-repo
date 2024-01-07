import { Injectable, Logger } from "@nestjs/common";
import UserRepository from "./user.repository";
import UserAdapter from "./user.adapter";
import Pagination from "../../../helpers/src/Pagination";
import CreateUserRequest from "../../../dto/src/users/create.user.request";
import { createFailResp, createSuccessResp } from "../../../helpers/src/createResponse";
import AppConstants from "../../../configs/src/constants";
import Hash from "../../../helpers/src/Cipher";
import RolesRepository from "../roles/roles.repository";

@Injectable()
export default class UserService{
  constructor(
	private repository:UserRepository,
	private roleRepository:RolesRepository,
  ) {}

  async findAll(page:number,search:string|null){
	const {take,skip} = Pagination.getOffset(page)
	if(search==null){
	  return this.repository.list(take,skip)
	}else{
	  return this.repository.list(take,skip,search)
	}
  }

  async save(user:CreateUserRequest){
		try {
		  const hash = new Hash()
		  const dto = UserAdapter.requestToDto(user)
		  const role = await this.roleRepository.findByCode(user.role_code)
		  const entity = UserAdapter.dtoToEntity(dto)

		  const hashedPassword = await hash.make(entity.getPassword())
		  entity.setPassword(hashedPassword)
		  entity.setRole(role)
		  const result = await this.repository.save(entity)
		  const response = UserAdapter.entityToResponse(result)
		  return createSuccessResp(200,AppConstants.MESSAGES.CREATED,response)
		}catch (e) {

		  Logger.error(e,e.error)
		  createFailResp(400,AppConstants.MESSAGES.BAD_REQUEST,e)

		}

  }

}