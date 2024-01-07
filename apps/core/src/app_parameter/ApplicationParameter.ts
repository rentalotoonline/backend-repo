import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


const schema="referable"
const name="application_parameters"
@Entity({name,schema})
export default class ApplicationParameter{
  @PrimaryGeneratedColumn()
  id:number;
  @Column({unique:true})
  code:string;
  @Column()
  value:string;
  @Column()
  group_data:string;
  @Column()
  type_data:string

  getId(){
    return this.id
  }
  getCode(){
    return this.code
  }

  getValue(){
    return this.value
  }

  getGroupData(){
    return this.group_data
  }

  getTypeDatya(){
    return this.type_data
  }

  setCode(code:string){
    this.code=code;
    return this;
  }
  setValue(value:string){
    this.value=value
    return this;
  }
  setGroupData(value:string){
    this.group_data=value
    return this;
  }
  setDataType(value:"STRING"|"NUMBER"|"JSON"|"ARRAY"){
    this.type_data = value
    return this;
  }
  setId(id:number){
    this.id=id
    return this;
  }



}