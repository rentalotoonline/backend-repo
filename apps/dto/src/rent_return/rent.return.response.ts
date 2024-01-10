import RentReturnDto from "./rent.return.dto";
import RentResponse from "../rent/rent.response";


export default class RentReturnResponse extends RentReturnDto{
  	charge:number
  	excess_day:number
  	rent:RentResponse
  	setCharge(ch:number){
		this.charge=ch
	  	return this
	}
	setExcessDay(eDay:number){
		this.excess_day=eDay
	  	return this;
	}
	setRent(r:RentResponse){
		this.rent=r
	  return this;
	}
}