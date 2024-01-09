export default class CreateUserRequest{
   getEmail(): string {
    return this.email;
   }

   setEmail(value: string) {
    this.email = value;
   }

   getName(): string {
    return this.name;
   }

   setName(value: string) {
    this.name = value;
   }

   getPassword(): string {
    return this.password;
   }

   setPassword(value: string) {
    this.password = value;
   }

   getId(): number {
    return this.id;
   }

   setId(value: number) {
    this.id = value;
   }

 getRoleCode(): string {
  return this.role_code;
 }

 setRoleCode(value: string) {
  this.role_code = value;
 }

   email?:string
   name?:string
   password?:string
   id?:number
   role_code?:string
}