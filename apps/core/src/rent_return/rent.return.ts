import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Rent from "../rent/Rent";


@Entity({name:"rent_returns",schema:"transactions"})
export default class RentReturn{
  @PrimaryGeneratedColumn()
  id:number
  @OneToOne(()=>Rent)
  @JoinColumn({ name:"rent_id" })
  rent:Rent
  @Column()
  date_return:Date
  @Column()
  charge:number
  @Column()
  excess_day:number


  setID(id:number){
    this.id=id;
    return this;
  }
  setRent(rents:Rent){
    this.rent=rents
    return this;
  }

  setDateReturn(date:string){
    this.date_return = new Date(date)
    return this;
  }

  setCharge(c=0){
    this.charge=c
    return this;
  }
  setExcessDay(day=0){
    this.excess_day = day
    return this;
  }

  getId(){
    return this.id
  }

  getRent(){
    return this.rent
  }

  getDateReturn(){
    return this.date_return
  }

  getExcessDay(){
    return this.excess_day
  }

  getCharge(){
    return this.charge
  }


}