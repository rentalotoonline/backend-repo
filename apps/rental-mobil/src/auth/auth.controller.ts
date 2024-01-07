import { Body, Controller, Get, Post } from "@nestjs/common";
import LoginRequest from "../../../dto/src/users/login.request";
import AuthAdapter from "../../../core/src/auth/auth.adapter";
import LoginService from "../../../core/src/auth/login.service";

@Controller('auth')
export class AuthController {
  constructor(protected service:LoginService) {
  }
  @Post("/login")
  async login(@Body()request:LoginRequest){
    const dto = AuthAdapter.createLoginDto(request)
    const response = await this.service.login(dto)
    return response
  }
  @Post("/jwt-test")
  async jwtTest(@Body()request:LoginRequest){

    return this.service.loginWithJWT(request)
  }
}
