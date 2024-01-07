import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Users from "../users/Users";


const schema="referable"
const name="cars"
@Entity({name,schema})
export default class Cars{
	@PrimaryGeneratedColumn()
  	id:number
  	@Column({unique:true})
  	plate_number:string
	@ManyToOne(()=>Users,user=>user.id)
  	@JoinColumn({name:"driver_id"})
  	driver:Users
  	@Column()
  	is_available:boolean;
	setID(d:number){
	  this.id=d
	  return this
	}
	setPlateNumber(d:string){
	  this.plate_number=d
	  return this
	}
	setDriver(d:Users){
	  this.driver=d
	  return this
	}
	setAvailable(d:boolean){
	  this.is_available=d
	  return this
	}

	getId(){
	  return this.id
	}
	getDriver(){
	  return this.driver
	}
	getPlateNumber(){
	  return this.plate_number
	}
	getAvailable(){
	  return this.is_available
	}

}