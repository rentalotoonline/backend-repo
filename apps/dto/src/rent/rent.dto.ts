import RentRequest from "./rent.request";

export default class RentDto extends RentRequest{
	setCustomerId(id:number){
	  this.customer_id=id
	  return this;
	}
	setCarId(id:number){
	  this.car_id = id
	  return this;
	}
	setRentDate(date:Date){
	  this.rent_date = date;
	  return this;
	}
	setReturnDateEstimation(date:Date){
	  this.return_date_estimation = date;
	  return this;
	}
	setDestinationType(dest:string){
	  this.destination_type = dest;
	  return this;
	}
	setWithDriver(val:boolean){
	  this.with_driver = val;
	  return this;
	}
	setDiscount(val:number){
		this.discount = val
		return this;
	}
	getWithDriver=()=>(this.with_driver)
	getDestinationType=()=>(this.destination_type)
	getReturnDateEstimation=()=>(this.return_date_estimation)
	getRentDate=()=>(this.rent_date)
  	getCarId=()=>(this.car_id)
  	getCustomerId=()=>(this.customer_id)
  	getDiscount=()=>(this.discount)


}