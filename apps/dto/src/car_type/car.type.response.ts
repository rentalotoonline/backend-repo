import { SetterGetter } from "../../../helpers/src/Lombok";


export default class CarTypeResponse{
  	 code:string;
	   setCode(val){
		 this.code = val
		 return this;
	   }
	getCode(){
		 return this.code
  }
  	 car_type:string;
	   setCarType(val){this.car_type=val;return this;}
  getCarType(){
		 return this.car_type
  }
  	 id:number;setId(val){this.id=val;return this};getId(){return this.id};

}