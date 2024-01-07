import EnvHelper from "./EnvHelper";
import * as jwt from 'jsonwebtoken'
import AppException from "./exceptions";
import { createFailResp } from "./createResponse";
import CreateUserResponse from "../../dto/src/users/create.user.response";

export default class JwtHelper{
  	static jwtKey = EnvHelper.getValue("JWT_KEY","aprit")
  	static signToken(user:CreateUserResponse){
	  	const token = jwt.sign(JSON.stringify(user),this.jwtKey)
	  	return token
	}
	static verifyToken(token){
		return new Promise((resolve,reject) =>{
		  jwt.verify(token,this.jwtKey,(error, decoded)=>{
			if(error){
			  reject(error)
			}else{
			  resolve(decoded)
			}

		  })
		} )
	}

	static TimeExpiry(){
		const envVal = EnvHelper.getValue("JWT_TIME","3600")
		return Math.floor(new Date().getTime() / 1000)+parseInt(envVal)
	}
	static DoubleTimeExpiry(){
		const envVal = EnvHelper.getValue("JWT_TIME","3600")
		return this.TimeExpiry()*2
	}
	static compareExpiry(expiryFromDB){
		const now =Math.floor(new Date().getTime() / 1000)
	    return now<=expiryFromDB
	}
}