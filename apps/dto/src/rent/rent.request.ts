export default class RentRequest{
	customer_id:number
	car_id:number
	rent_date:Date
  	return_date_estimation:Date
  	destination_type:string
  	with_driver:boolean
  	discount?:number
}