import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import CarTypeRequest from "../../../dto/src/car_type/car.type.request";
import CarTypeService from "../../../core/src/car_type/car.type.service";

@Controller('car-types')
export class CarTypesController {
  constructor(private service:CarTypeService) {
  }
  @Post()
  async store(@Body() request:CarTypeRequest){
	return await this.service.create(request)
  }
  @Get()
  async index(@Query("page")page?:string,@Query("search")search?:string){
    return await this.service.all(parseInt(page??"0"),search??null)
  }
  @Get("/:code")
  async find(@Param("code")code:string){
    return await this.service.find(code)
  }
}
