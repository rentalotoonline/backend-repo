import CarsRequest from "../../../dto/src/cars/cars.request";
import CarsDto from "../../../dto/src/cars/cars.dto";
import Users from "../users/Users";
import ApplicationParameter from "../app_parameter/ApplicationParameter";
import Cars from "./Cars";
import { SetterGetter } from "../../../helpers/src/Lombok";
import CarsResponse from "../../../dto/src/cars/cars.response";
import UserAdapter from "../users/user.adapter";
import CarTypeResponse from "../../../dto/src/car_type/car.type.response";
import CarTypeAdapter from "../car_type/car.type.adapter";


export default class CarsAdapter{
  static convertToCarsDto(request:CarsRequest):CarsDto{
    const dto = new CarsDto()
    dto.setPlateNumber(request.plate_number)
    dto.setIsAvailable(request.is_available)
    dto.setDriverId(request.driver_id)
    dto.setCarTypeCode(request.car_type_code)
    dto.setCarDescription(request.car_description)
    dto.setPrice(request.price)
    dto.setWithoutDriver(request.without_driver)
    dto.setDriverPrice(request.driver_price)
    return dto;
  }
  static convertToCarsEntity(dto:CarsDto,driver:Users,carType:ApplicationParameter):Cars{
    const entity = new Cars()
    entity.setPlateNumber(dto.getPlateNumber())
    entity.setCarType(carType)
    entity.setIsAvailable(dto.getIsAvailable())
    entity.setDriver(driver)
    entity.setCarDescription(dto.getCarDescription())
    entity.setPrice(dto.getPrice())
    entity.setWithoutDriver(dto.getWithoutDriver())
    entity.setAdditionalPrice(dto.getDriverPrice())
    return entity
  }
  static convertToCarsResponse(entity:Cars):CarsResponse{
        const responseUser = UserAdapter.entityToResponse(entity.getDriver())
        const responseCars:CarTypeResponse = CarTypeAdapter.entityToResponse(entity.getCarType())
        const response = new CarsResponse()
        response.setId(entity.id)
        response.setDriver(responseUser)
        response.setCarType(responseCars)
        response.setPlateNumber(entity.getPlateNumber())
        response.setIsAvailable(entity.getIsAvailable())
        response.setCarDescription(entity.getCarDescription())
        response.setPrice(entity.getPrice())
        response.setWithoutDriver(entity.getWithoutDriver())
        response.setDriverPrice(entity.getAdditionalPrice())
        return response;
  }

  static entityListToResponse(e:Cars[]):CarsResponse[]{
    return e.map(val=>{
      return this.convertToCarsResponse(val)
    })
  }
}