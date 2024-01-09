import RentDetails from "./rent.details";
import RentDetailResponse from "../../../dto/src/rent_detail/rent.detail.response";


export default class RentDetailAdapter{
  static entityToResp(e:RentDetails){
	return new RentDetailResponse().setId(e.id).setPrice(e.price).setDescription(e.item_type)
  }
  static listEntityToResp(e:RentDetails[]){
	return e.map(val=>{
	  return this.entityToResp(val)
	})
  }
}