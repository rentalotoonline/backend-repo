import { Module } from '@nestjs/common';
import { CarTypesController } from './car_types.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import ApplicationParameter from "../../../core/src/app_parameter/ApplicationParameter";
import CarTypeRepository from "../../../core/src/car_type/car.type.repository";
import CarTypeService from "../../../core/src/car_type/car.type.service";
import AppParamRepository from "../../../core/src/app_parameter/app.param.repository";

@Module({
  imports:[TypeOrmModule.forFeature([ApplicationParameter])],
  providers:[
    CarTypeRepository,
    CarTypeService,
    AppParamRepository,
  ],
  controllers: [
    CarTypesController,
  ]
})
export class CarTypesModule {}
