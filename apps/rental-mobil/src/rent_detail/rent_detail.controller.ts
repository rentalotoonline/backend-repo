import { Body, Controller, Post } from "@nestjs/common";
import RentRequest from "../../../dto/src/rent/rent.request";
import RentService from "../../../core/src/rent/rent.service";

@Controller('rent-detail')
export class RentDetailController {
  constructor(private service:RentService) {
  }
  @Post("rent")
  async rent(@Body() request:RentRequest){
	return await this.service.create(request)
  }
}
