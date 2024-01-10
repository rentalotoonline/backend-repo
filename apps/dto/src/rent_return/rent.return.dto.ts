import RentReturnRequest from "./rent.return.request";

export default class RentReturnDto extends RentReturnRequest{
  return_date:Date
  setInvoice(invoice:string)
  {
	this.invoice=invoice
	return this;

  }
  setReturnDate(date:string){
		this.return_date=new Date(date)
		return this;
  }

  getInvoice(){
	return this.invoice
  }
  getDate(){
	return this.return_date
  }

}