import AppResponse from "../../configs/src/responses";
import { HttpException, HttpStatus, Logger } from "@nestjs/common";
import AppConstants from "../../configs/src/constants";

export function createSuccessResp(code:200|201,message:string,data?:any){
	let responses = new AppResponse()
	responses._code = code;
	responses._message=message;
	responses._data=data??null;
	return responses;
}
export function createFailResp(code:400|500|403|401|404,message?:string,err?:Error){

	throw new HttpException({
		status:code,
		error:message ?? AppConstants.MESSAGES.BAD_REQUEST,
	},HttpStatus.BAD_REQUEST,{
		cause:err.message ?? message,
	})
}