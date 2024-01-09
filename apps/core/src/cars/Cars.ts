import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Users from "../users/Users";
import ApplicationParameter from "../app_parameter/ApplicationParameter";
import { SetterGetter } from "../../../helpers/src/Lombok";


const schema="referable"
const name="cars"
@Entity({name,schema})
export default class Cars{
	@PrimaryGeneratedColumn()
  	id:number;setId(v){this.id=v};getId(){return this.id}
  	@Column({unique:true})

  	plate_number:string;setPlateNumber(v){this.plate_number=v};getPlateNumber(){return this.plate_number};
	@ManyToOne(()=>Users,user=>user.id)
  	@JoinColumn({name:"driver_id"})

  	driver:Users;setDriver=(v)=>{this.driver=v};getDriver=()=>{return this.driver};

  	@ManyToOne(()=>ApplicationParameter,carType=>carType.id)
  	@JoinColumn({name:"car_type_id"})
  	carType:ApplicationParameter;setCarType=(v)=>{this.carType=v};getCarType=()=>{return this.carType};
  	@Column()
  	is_available:boolean;setIsAvailable=(v)=>{
		this.is_available=v;
  	}
  	getIsAvailable(){return this.is_available};
	@Column()
  	car_description:string
  	setCarDescription(v){this.car_description=v}
  	getCarDescription(){return this.car_description};

	@Column()
  	price:number
  	setPrice=(v:number)=>(this.price=v);
	getPrice=()=>(this.price)


	@Column({default:false})
  	without_driver:boolean
  	setWithoutDriver=(v:boolean)=>(this.without_driver=v);
  	getWithoutDriver=()=>(this.without_driver)

  	@Column({default:0})
  	additional_price:number
  	setAdditionalPrice(additionalPrice:number){
		this.additional_price=additionalPrice
	  return this;
	}
	getAdditionalPrice(){
		return this.additional_price
	}


}