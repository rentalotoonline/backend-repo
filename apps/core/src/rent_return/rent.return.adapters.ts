import BaseAdapters from "../../../helpers/src/baseAdapters";
import RentReturn from "./rent.return";
import RentReturnRequest from "../../../dto/src/rent_return/rent.return.request";
import RentReturnDto from "../../../dto/src/rent_return/rent.return.dto";
import RentReturnResponse from "../../../dto/src/rent_return/rent.return.response";
import RentAdapter from "../rent/rent.adapter";
import RentDetails from "../rent_details/rent.details";
import Cars from "../cars/Cars";

export default class RentReturnAdapters {
    static entityToResponse(entity: RentReturn): RentReturnResponse {
		return new RentReturnResponse()
		  .setRent(RentAdapter.entityToResponse(entity.getRent()))
		  .setReturnDate(entity.getDateReturn().toDateString())
		  .setInvoice(entity.getRent().getInvoiceNumber())
		  .setExcessDay(entity.getExcessDay())
		  .setCharge(entity.getCharge())
    }
    static entityToResponseList(e: RentReturn[]): RentReturnResponse[] {
        return e.map(val=>{
		  return this.entityToResponse(val)
		})
    }
    static requestToDto(request: RentReturnRequest): RentReturnDto {
        throw new Error("Method not implemented.");
    }
    static dtoToEntity(dto: RentReturnDto): RentReturn {
        throw new Error("Method not implemented.");
    }


}