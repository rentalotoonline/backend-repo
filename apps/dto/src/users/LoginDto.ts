export default class LoginDto{
  email:string
  password:string
  getEmail(){
	return this.email
  }
  setEmail(val:string){
	this.email=val
	return this;
  }
  getPassword(){
	return this.password
  }
  setPassword(val:string){
	this.password=val
	return this;
  }
  getBoth(){
	const email = this.email
	const password = this.password
	return { email,password}
  }

}