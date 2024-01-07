import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import UserService from "../../../core/src/users/user.service";
import UserAdapter from "../../../core/src/users/user.adapter";
import CreateUserRequest from "../../../dto/src/users/create.user.request";

@Controller('users')
export class UsersController {
  constructor(private service:UserService ) {

  }
  @Post("/register")
  async register(@Body() users:CreateUserRequest){
	return await this.service.save(users)
  }
  @Get()
  async index(@Query("page")page?:string,@Query('search')search?:string){
    return await this.service.findAll(parseInt(page??"0"),search??null)
  }

}
