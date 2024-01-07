import { Module } from '@nestjs/common';
import PersonalAccessToken from "../../../core/src/auth/personal.access.token";
import ApplicationParameter from "../../../core/src/app_parameter/ApplicationParameter";
import Users from "../../../core/src/users/Users";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from './auth.controller';
import AppParamRepository from "../../../core/src/app_parameter/app.param.repository";
import RolesRepository from "../../../core/src/roles/roles.repository";
import LoginService from "../../../core/src/auth/login.service";
import AuthRepository from "../../../core/src/auth/auth.repository";
import UserRepository from "../../../core/src/users/user.repository";

@Module({
  imports:[TypeOrmModule.forFeature([PersonalAccessToken,ApplicationParameter,Users])],
  providers:[
	AppParamRepository,
	LoginService,
	AuthRepository,
	UserRepository,
  ],
  controllers: [AuthController]
})
export class AuthModule {}
