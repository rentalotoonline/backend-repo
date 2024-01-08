import { Module } from '@nestjs/common';
import { CarsController } from './cars.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import ApplicationParameter from "../../../core/src/app_parameter/ApplicationParameter";
import Cars from "../../../core/src/cars/Cars";
import Users from "../../../core/src/users/Users";
import CarsService from "../../../core/src/cars/cars.service";
import CarsRepository from "../../../core/src/cars/cars.repository";
import CarTypeRepository from "../../../core/src/car_type/car.type.repository";
import UserRepository from "../../../core/src/users/user.repository";

@Module({
  imports:[TypeOrmModule.forFeature([ApplicationParameter,Cars,Users])],
  providers:[
    CarsService,
    CarsRepository,
    CarTypeRepository,
    UserRepository,
  ],
  controllers: [CarsController]
})
export class CarsModule {}
