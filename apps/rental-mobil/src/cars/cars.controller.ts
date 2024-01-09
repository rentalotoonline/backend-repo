import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import CarsService from "../../../core/src/cars/cars.service";
import CarsRequest from "../../../dto/src/cars/cars.request";

@Controller('cars')
export class CarsController {
constructor(protected service:CarsService) {
	}
  @Post()
  async store(@Body()data:CarsRequest){
		return await this.service.create(data)
  }

  @Get("/:plate_number")
  async getByPlateNumber(@Param("plate_number") plate_number:string){
  	return await this.service.findCarByPlate(plate_number)
  }
}
