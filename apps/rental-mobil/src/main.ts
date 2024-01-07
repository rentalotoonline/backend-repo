import { NestFactory } from '@nestjs/core';
import { RentalMobil } from './app.module';
import DatasourceConfiguration from "../../configs/src/databases";

async function bootstrap() {
  await DatasourceConfiguration.createSchema()
  const app = await NestFactory.create(RentalMobil);
  await app.listen(3000);
}
bootstrap();
