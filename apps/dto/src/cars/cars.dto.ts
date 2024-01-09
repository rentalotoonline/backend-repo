import { SetterGetter } from "../../../helpers/src/Lombok";


export default class CarsDto{
  @SetterGetter("")
  plate_number:string; setPlateNumber; getPlateNumber
  @SetterGetter(0)
  driver_id:number; setDriverId; getDriverId
  @SetterGetter(false)
  is_available:boolean;setIsAvailable;getIsAvailable;
  @SetterGetter("")
  car_type_code:string;setCarTypeCode;getCarTypeCode;
  @SetterGetter("N/A")
  car_description:string;setCarDescription;getCarDescription;
  @SetterGetter(0)
  price:string;setPrice;getPrice;
}