import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Cars from "../cars/Cars";
import Users from "../users/Users";

@Entity({name:"rents",schema:"transactions"})
export default class Rent{
  @PrimaryGeneratedColumn()
  id:number;


  @Column({unique:true})
  invoice_number:string;


  @Column()
  destination_type:string;

  @ManyToOne(()=>Users,user=>user.id)
  @JoinColumn({ name:"customer_id" })
  customer:Users


  @Column({type:"timestamptz"})
  return_estimation_date:Date


  @Column({type:"timestamptz"})
  rent_date:Date


  @Column()
  payment:number


  @Column()
  payment_request_to_payment_gateway:string

  @Column()
  discount:number


  @Column()
  terminated:boolean


  @Column()
  use_driver:boolean


  setPayment(v:number){this.payment=v}
  getPayment(){return this.payment}
  setUseDriver(v:boolean){this.use_driver=v}
  getUseDriver(){return this.use_driver}

  getId(){return this.id}
  setInvoiceNumber(v:string){this.invoice_number=v}
  getInvoiceNumber(){return this.invoice_number}

  setDestinationType(v){this.destination_type=v}
  getDestinationType(){return this.destination_type}
  setCustomer(c:Users) {
    this.customer = c;
    return this;
  }
  getCustomer(){return this.customer}
  setReturnEstimationDate(v){this.return_estimation_date=v}
  getReturnEstimationDate(){return this.return_estimation_date}

  setRentDate(v){this.rent_date=v}
  getRentDate(){return this.rent_date}

  setPaymentRequestToPaymentGateway(v:any){this.payment_request_to_payment_gateway=JSON.stringify(v)}
  getPaymentRequestToPaymentGateway(){return JSON.parse(this.payment_request_to_payment_gateway)}
  setTerminated(v:boolean){this.terminated=v}
  getTerminated(){return this.terminated}

  setDiscount(v:number){this.discount=v}
  getDiscount(){return this.discount ?? 0}

}