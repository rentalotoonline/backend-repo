import { Module } from '@nestjs/common';
import { RentDetailController } from './rent_detail.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import ApplicationParameter from "../../../core/src/app_parameter/ApplicationParameter";
import Cars from "../../../core/src/cars/Cars";
import Rent from "../../../core/src/rent/Rent";
import RentDetails from "../../../core/src/rent_details/rent.details";
import Users from "../../../core/src/users/Users";
import RentService from "../../../core/src/rent/rent.service";
import RentRepository from "../../../core/src/rent/rent.repository";
import CarsRepository from "../../../core/src/cars/cars.repository";
import UserRepository from "../../../core/src/users/user.repository";
import RentDetailRepository from "../../../core/src/rent_details/rent.detail.repository";

@Module({
  imports:[TypeOrmModule.forFeature([Cars,ApplicationParameter,Rent,RentDetails,Users])],
  controllers: [RentDetailController],
  providers:[
    RentService,
    RentRepository,
    CarsRepository,
    UserRepository,
    RentDetailRepository,
  ]
})
export class RentDetailModule {}
