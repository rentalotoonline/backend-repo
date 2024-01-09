import CarTypeResponse from "../../../dto/src/car_type/car.type.response";
import ApplicationParameter from "../app_parameter/ApplicationParameter";
import CarsRequest from "../../../dto/src/cars/cars.request";
import CarTypeRequest from "../../../dto/src/car_type/car.type.request";
import CarTypeDto from "../../../dto/src/car_type/car.type.dto";
import AppConstants from "../../../configs/src/constants";
import { snakeToCamelCase } from "../../../helpers/src/string.fn";
import { Logger } from "@nestjs/common";
import Slugfy from "../../../helpers/src/Slugfy";


export default class CarTypeAdapter{

  	static entityToResponse(entity:ApplicationParameter):CarTypeResponse{
		const resp = new CarTypeResponse()
	  resp.setId(entity.id)
	  resp.setCarType(entity.value)
	  resp.setCode(entity.code)
	  return resp;
	}

  	static requestToDTO(request:CarTypeRequest):CarTypeDto{
		const dto:CarTypeDto = new CarTypeDto()

	  	dto.setCarTypeName(request.car_type_name)
	  	return dto
	}
  	static dtoToEntity(dto:CarTypeDto):ApplicationParameter{
		const group_data=AppConstants.APPLICATION_PARAMETER_GROUP_TYPES.CAR_TYPE
		const code = Slugfy.sligfyText("car type "+dto.getCarTypeName())
	  	return new ApplicationParameter()
		  .setCode(code)
		  .setGroupData(group_data)
		  .setDataType("STRING")
		  .setValue(dto.getCarTypeName())
	}

	static ListEntityToResponse(list:ApplicationParameter[]){
		return list.map(val=>{
		  	return this.entityToResponse(val)
		})
	}
}