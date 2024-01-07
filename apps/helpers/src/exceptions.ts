

export default class AppException extends Error{
	code:400|401|403|404|500
	constructor(msg = '',code?:400|401|403|404|500) {
		super(msg);
		this.code=code ?? 400;
	}
	getMessage(){
		return this.message
	}
	getCode(){
		return this.code;
	}
}