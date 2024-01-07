

export default class CreateRoleResponse{
  get _id(): number {
    return this.id;
  }

  set _id(value: number) {
    this.id = value;
  }

  get _role_name(): string {
    return this.role_name;
  }

  set _role_name(value: string) {
    this.role_name = value;
  }

  set _role_code(value: string) {
    this.role_code = value;
  }
  get _role_code() {
    return this.role_code
  }
    private id:number
    private role_name:string
    private role_code:string
}