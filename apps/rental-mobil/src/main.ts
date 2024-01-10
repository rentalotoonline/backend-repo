import { NestFactory } from '@nestjs/core';
import { RentalMobil } from './app.module';
import DatasourceConfiguration from "../../configs/src/databases";
import MainSeeder from "../../seeds/main.seed";




async function beforeRun(){
 try {
  await DatasourceConfiguration.createSchema()
 }catch (e) {
 }
  //await MainSeeder.Run()
}
async function bootstrap() {
 await beforeRun()

 const app = await NestFactory.create(RentalMobil);
 await app.listen(3000);

/*
  let cartip = new CarTypeDto()
  cartip.setCarTypeName("LOBAK")
  console.log(cartip.getCarTypeName())*/
}
bootstrap();
