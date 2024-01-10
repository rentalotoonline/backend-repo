import { Logger, Module } from "@nestjs/common";
import { RolesModule } from './roles/roles.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CarsModule } from './cars/cars.module';
import { CarTypesModule } from './car_types/car_types.module';
import { RentDetailModule } from './rent_detail/rent_detail.module';
import DatasourceConfiguration from "../../configs/src/databases";
import { getConnection, getConnectionManager } from "typeorm";
import MainSeeder from "../../seeds/main.seed";


@Module({


  imports: [
    TypeOrmModule.forRoot(DatasourceConfiguration.getDatabase()),
    RolesModule,
    UsersModule,
    AuthModule,
    CarsModule,
    CarTypesModule,
    RentDetailModule,

  ]
})
export class RentalMobil {
  constructor() {

  }
}
