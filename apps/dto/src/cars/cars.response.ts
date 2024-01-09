import CarTypeResponse from "../car_type/car.type.response";
import CreateUserResponse from "../users/create.user.response";
import { SetterGetter } from "../../../helpers/src/Lombok";


export default class CarsResponse{
id:number;setId(v){this.id=v};getId=()=>(this.id);
car_type:CarTypeResponse;setCarType=(v)=>(this.car_type=v);getCarType=()=>(this.car_type);
driver:CreateUserResponse;setDriver=(v)=>{this.driver=v};getDriver=()=>(this.driver);
plate_number:string;setPlateNumber=(v)=>(this.plate_number=v);getPlateNumber=()=>(this.plate_number);
is_available:boolean;setIsAvailable=(v)=>(this.is_available=v);getIsAvailable=()=>(this.is_available);
car_description:boolean;setCarDescription=(v)=>(this.is_available=v);getCarDescription=()=>(this.is_available);
price:number;setPrice=(v:number)=>(this.price=v);getPrice=()=>(this.price)
without_driver:boolean;setWithoutDriver=(v:boolean)=>(this.without_driver=v);getWithoutDriver=()=>(this.without_driver)
driver_price:number
  setDriverPrice(additionalPrice: number) {
    this.driver_price=additionalPrice
    return this;
  }
}