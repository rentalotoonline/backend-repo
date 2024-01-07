import { Injectable, Logger } from "@nestjs/common";
import AuthRepository from "./auth.repository";
import JwtHelper from "../../../helpers/src/JwtHelper";
import Users from "../users/Users";
import PersonalAccessToken from "./personal.access.token";
import CreateUserResponse from "../../../dto/src/users/create.user.response";
import AppException from "../../../helpers/src/exceptions";
import AuthAdapter from "./auth.adapter";
import { createSuccessResp } from "../../../helpers/src/createResponse";
import AppConstants from "../../../configs/src/constants";


export default class AuthService{
  constructor(protected repository:AuthRepository) {}

  async sign(user:CreateUserResponse){
    const token = JwtHelper.signToken(user)
    return token;
  }

  async findByToken(token:string,user_:Users){
      const where={
        token,
        user_
      }
      const result = await this.repository
          .raw()
          .findOne({where,relations:['user_','user_.role_']})
      const response = AuthAdapter.createLoginWithTokenResponse(result)
      if(JwtHelper.compareExpiry(result == null ? 0 : result.expiryTime)){
          return createSuccessResp(200,AppConstants.MESSAGES.SUCCESS,response);
      }else{
          throw new AppException("TOKEN EXPIRED",401)
      }
  }
  async save(data:PersonalAccessToken){
      return this.repository.save(data)
  }
}