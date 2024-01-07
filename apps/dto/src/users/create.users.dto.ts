

export default class CreateUsersDto{
  name:string|null
  email:string|null
  password:string|null
  role_code:string|null

  setName(_name){
    this.name = _name
    return this
  }
  setEmail(_email){
    this.email=_email
    return this
  }

  setPassword(pwd){
    this.password=pwd
    return this
  }

  setRoleCode(roleCode){
    this.role_code=roleCode
    return this
  }
  getName(){
    return this.name
  }
  getEmail(){
    return this.email
  }
  getRoleCode(){
    return this.role_code
  }
  getPassword(){
    return this.password
  }
}