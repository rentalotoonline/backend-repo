import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Users from "../users/Users";

const schema="auth"
const name="personal_access_tokens"
@Entity({name,schema})
export default class PersonalAccessToken{
  @PrimaryGeneratedColumn()
  id:number
  @ManyToOne(()=>Users,user_=>user_.id)
  @JoinColumn()
  user_:Users
  @Column()
  token:string
  @Column({type:"bigint"})
  expiryTime:number


  setUser(user:Users){
    this.user_=user
    return this;
  }
  setToken(token:string){
    this.token=token
    return this;
  }
  setExpiry(expiry:number){
    this.expiryTime = expiry
    return this;
  }

  getUser() {
    return this.user_;
  }
}