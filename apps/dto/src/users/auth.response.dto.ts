import CreateUserResponse from "./create.user.response";

export default class AuthResponseDto{
  id:number
  user:CreateUserResponse
  token:string
  setUser(d:CreateUserResponse){
    this.user=d
    return this;
  }
  setID(d:number){
    this.id=d
    return this;
  }
  setToken(d:string){
    this.token=d
    return this;
  }
}