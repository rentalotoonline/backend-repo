import AuthService from "./auth.service";
import AuthRepository from "./auth.repository";
import UserRepository from "../users/user.repository";
import { createFailResp, createSuccessResp } from "../../../helpers/src/createResponse";
import AppConstants from "../../../configs/src/constants";
import Hash from "../../../helpers/src/Cipher";
import UserAdapter from "../users/user.adapter";
import { Injectable, Logger } from "@nestjs/common";
import LoginResponseDto from "../../../dto/src/users/login.response.dto";
import AuthAdapter from "./auth.adapter";
import LoginDto from "../../../dto/src/users/LoginDto";
import AppException from "../../../helpers/src/exceptions";
import LoginRequest from "../../../dto/src/users/login.request";
import JwtHelper from "../../../helpers/src/JwtHelper";

@Injectable()
export default class LoginService extends AuthService{
  constructor(
	protected repository:AuthRepository,
	private userRepository:UserRepository,

	) {
	super(repository)
  }
  async login(dto:LoginDto){
	try {
	  const {email,password} = dto.getBoth()
	  const user = await this.userRepository.findBy("email",email)
	  const passwordUser = user.getPassword()
	  const checkHash = await new Hash().check(password,passwordUser)
	  if(checkHash){
		const userResponse=UserAdapter.entityToResponse(user)
		const token = await this.sign(userResponse)
		const response = AuthAdapter.createLoginResponse(userResponse,token)
		const expiryTime = JwtHelper.TimeExpiry()
		const entity = AuthAdapter.createEntity(user,token,expiryTime)
		await this.save(entity)
		return createSuccessResp(200,AppConstants.MESSAGES.SUCCESS,response)
	  }else{
		throw new AppException("Hash not match")
	  }


	}catch (e) {
	  Logger.error(e)
	  createFailResp(400,AppConstants.MESSAGES.INVALID_UNAME,e)
	}

  }
  async loginWithJWT(request:LoginRequest){
	try{
	  const jwt = await JwtHelper.verifyToken(request.token)
	  const user = await this.userRepository.findByID(jwt["id"])
	  if(user==null||user==undefined){
			throw new AppException("INVALID TOKEN")
	  }
	  return await this.findByToken(request.token,user)
	}catch (e) {
	  	Logger.error(e)
		createFailResp(400,AppConstants.MESSAGES.BAD_REQUEST,e)
	}

  }

}