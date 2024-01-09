import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Rent from "../rent/Rent";
import AppConstants from "../../../configs/src/constants";


@Entity({name:"rent_details",schema:"transactions"})
export default class RentDetails{
  	@PrimaryGeneratedColumn()
  	id:number
  	@ManyToOne(()=>Rent,rent=>rent.id)
  	@JoinColumn({ name:"rent_id" })
  	rentId:Rent
  	@Column()
	item_id:number;
	@Column()
  	item_type:string;
	@Column()
  	price:number;
	setRentId(r:Rent){
	  this.rentId=r
	  return this;
	}
	setItemType(item:"discount"|"admin_pay"|"driver"|string){
	  if (item==="discount"||item==="admin_pay"||item==="driver"){
		this.setItemId(AppConstants.RENT_ITEM_TYPE_ID[item])
		this.item_type=AppConstants.RENT_ITEM_TYPE[item]
	  }else{
		this.item_type=item
	  }
	  return this;
	}
	setItemId(id:number){
		this.item_id=id
	  return this;
	}
	setPrice(p:number){
	  this.price=p
	  return this;
	}
	setRent(e:Rent){
	  this.rentId=e
	  return this;
	}
}