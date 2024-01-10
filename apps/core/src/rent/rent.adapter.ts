import Rent from "./Rent";
import RentRequest from "../../../dto/src/rent/rent.request";
import RentDto from "../../../dto/src/rent/rent.dto";
import RentResponse from "../../../dto/src/rent/rent.response";
import Cars from "../cars/Cars";
import Users from "../users/Users";
import RentDetails from "../rent_details/rent.details";
import RentDetailAdapter from "../rent_details/rent.detail.adapter";
import ApplicationParameter from "../app_parameter/ApplicationParameter";
import AppConstants from '../../../configs/src/constants';


export default class RentAdapter {
    static entityToResponse(entity: Rent): RentResponse {
        let cars:Cars
        entity.getRentDetails().map(val=>{
            if(val.getItemType()=="Cars"){
                cars = val.getCars()
            }
        })

        return new RentResponse()
          .setId(entity.getId())
          .setCustomerName(entity.getCustomer().getName())
          .setInvoice(entity.getInvoiceNumber())
          .setDriverName(cars.getDriver().getName())
          .setRentDate(entity.getRentDate())
          .setReturnDateEstimation(entity.getReturnEstimationDate())
          .setWithDriver(entity.getUseDriver())
          .setDiscount(entity.getDiscount())
          .setPayment(entity.getPayment())
          .setDetail(RentDetailAdapter.listEntityToResp(entity.getRentDetails()))
    }
    static entityToResponseList(e: Rent[]): RentResponse[] {
        throw new Error("Method not implemented.");
    }
    static requestToDto(request: RentRequest): RentDto {
       return new RentDto()
                    .setCustomerId(request.customer_id)
                    .setCarId(request.car_id)
                    .setRentDate(request.rent_date)
                    .setReturnDateEstimation(request.return_date_estimation)
                    .setDestinationType(request.destination_type)
                    .setWithDriver(request.with_driver)
                    .setDiscount(request.discount ?? 0)


    }
    static dtoToEntity(dto: RentDto, customer: Users, statusCode: ApplicationParameter): Rent {
	    const re = new Rent()
        re.setCustomer(customer)
        re.setRentDate(new Date(dto.getRentDate()))
        re.setDestinationType(dto.getDestinationType())
        re.setPayment(0)
        re.setInvoiceNumber("")
        re.setPaymentRequestToPaymentGateway("")
        re.setReturnEstimationDate(new Date(dto.getReturnDateEstimation()))
        re.setTransactionStatus(statusCode)
        re.setDiscount(0)
        re.setUseDriver(dto.getWithDriver())
        return re;
    }

}