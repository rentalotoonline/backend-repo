import { NestFactory } from '@nestjs/core';
import { RentalMobil } from './app.module';
import DatasourceConfiguration from "../../configs/src/databases";
import CarsRequest from "../../dto/src/cars/cars.request";
import CarTypeDto from "../../dto/src/car_type/car.type.dto";





async function bootstrap() {
 await DatasourceConfiguration.createSchema()

 const app = await NestFactory.create(RentalMobil);
 await app.listen(3000);

/*
  let cartip = new CarTypeDto()
  cartip.setCarTypeName("LOBAK")
  console.log(cartip.getCarTypeName())*/
}
bootstrap();
