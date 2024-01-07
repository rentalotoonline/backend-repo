

import CreateUserResponse from "./create.user.response";

export default class LoginResponseDto{
	private user:CreateUserResponse
    private token:string
	setUser(value:CreateUserResponse){
	  this.user = value
	  return this;
	}
	setToken(value:string){
	  this.token=value
	  return this;
	}

	getUser(){
	  return this.user
	}
	getToken(){
	  return this.token
	}

}