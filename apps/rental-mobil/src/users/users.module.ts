import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import UserAdapter from "../../../core/src/users/user.adapter";
import UserService from "../../../core/src/users/user.service";
import UserRepository from "../../../core/src/users/user.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import Users from "../../../core/src/users/Users";
import RolesRepository from "../../../core/src/roles/roles.repository";
import AppParamRepository from "../../../core/src/app_parameter/app.param.repository";
import ApplicationParameter from "../../../core/src/app_parameter/ApplicationParameter";


@Module({
  controllers: [UsersController],
  providers:[
    UserService,
    UserRepository,
    AppParamRepository,
    RolesRepository,
  ],
  imports:[TypeOrmModule.forFeature([Users,ApplicationParameter])]
})
export class UsersModule {}
