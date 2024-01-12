import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Rent from "../rent/Rent";
import AppConstants from "../../../configs/src/constants";
import Cars from "../cars/Cars";
import ApplicationParameter from '../app_parameter/ApplicationParameter';


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
	appParam?:ApplicationParameter

	cars?:Cars

	setCars(car:Cars){
		this.cars=car
	}
	setAppParam(app:ApplicationParameter){
		this.appParam=app
	}
	setItemType(item:"ApplicationParameter"|"Cars"){
		this.item_type=item
	  return this;
	}
	getCars(){
		return this.cars
	}

	getAppParam(){
		return this.appParam
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

	getItemType() {
		return this.item_type;
	}
}