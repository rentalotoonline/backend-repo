import RentRequest from "./rent.request";
import RentDto from "./rent.dto";
import RentDetailResponse from "../rent_detail/rent.detail.response";

export default class RentResponse extends RentDto{
  	id:number
  	customer_name:string
  	driver_name:string
  	details:any[]
  	invoice:string
  	payment:number


  	setPayment(p){
		this.payment=p
	  	return this;
	}
  	setInvoice(i){
		this.invoice=i
		return this
	}
  	setCustomerName(name:string){
		this.customer_name=name
		return this;
	}
  setDriverName(name:string){
	this.driver_name=name
	return this;
  }
  setDetail(d:RentDetailResponse[]=[]){
		this.details=d
		return this;
  }
  setId(id:number){
		this.id=id;
		return this;
  }
}