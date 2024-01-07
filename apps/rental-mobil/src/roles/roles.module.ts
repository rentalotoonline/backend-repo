import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import RoleAdapters from "../../../core/src/roles/role.adapters";
import RoleService from "../../../core/src/roles/role.service";
import RolesRepository from "../../../core/src/roles/roles.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import ApplicationParameter from "../../../core/src/app_parameter/ApplicationParameter";

@Module({
  imports:[TypeOrmModule.forFeature([ApplicationParameter])],
  controllers: [RolesController],
  providers:[RoleAdapters,RoleService,RolesRepository]
})

export class RolesModule {}
