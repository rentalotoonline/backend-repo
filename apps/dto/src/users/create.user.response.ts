import CreateRoleResponse from "../roles/CreateRoleResponse";

export default class CreateUserResponse{
  getId(): number {
    return this.id;
  }

  setId(value: number) {
    this.id = value;
    return this
  }

  getName(): string {
    return this.name;
  }

  setName(value: string) {
    this.name = value
    return this
  }

  getEmail(): string {
    return this.email;
  }

  setEmail(value: string) {
    this.email = value
    return this
  }

  getRole(): CreateRoleResponse {
    return this.role;
  }

  setRole(value: CreateRoleResponse) {
    this.role = value
    return this
  }
  private id:number
  private name:string
  private email:string
  private role:CreateRoleResponse
}