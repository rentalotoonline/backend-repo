import RentDetails from "./rent.details";
import RentDetailResponse from "../../../dto/src/rent_detail/rent.detail.response";


export default class RentDetailAdapter{
  static entityToResp(e:RentDetails){
    if(e.getCars()!=null){
      return new RentDetailResponse().setId(e.id).setPrice(e.price).setDescription(e.getCars().getCarType().getValue())
    }else if(e.getAppParam()!=null){
      return new RentDetailResponse().setId(e.id).setPrice(e.price).setDescription(e.getAppParam().getValue())
    }

  }
  static listEntityToResp(e:RentDetails[]){
	return e.map(val=>{
	  return this.entityToResp(val)
	})
  }
}