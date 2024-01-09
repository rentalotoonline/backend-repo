import { Module } from '@nestjs/common';
import { RolesModule } from './roles/roles.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CarsModule } from './cars/cars.module';
import { CarTypesModule } from './car_types/car_types.module';
import DatasourceConfiguration from "../../configs/src/databases";


@Module({


  imports: [
    TypeOrmModule.forRoot(DatasourceConfiguration.getDatabase()),
    RolesModule,
    UsersModule,
    AuthModule,
    CarsModule,
    CarTypesModule,

  ]
})
export class RentalMobil {}
