

export default class CreateRoleDto{
  get _role_name(): string {
    return this.role_name;
  }

  set _role_name(value: string) {
    this.role_name = value;
  }
  private role_name:string
}