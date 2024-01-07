import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import RoleService from "../../../core/src/roles/role.service";
import CreateRoleRequest from "../../../dto/src/roles/CreateRoleRequest";
import RoleAdapters from "../../../core/src/roles/role.adapters";

@Controller('roles')
export class RolesController {
  constructor(private service : RoleService) {}
  @Get()
  async findAll(@Query("page") page?:string, @Query("search") search?:string){
    console.log(page,search)
    return await this.service.findAll(parseInt(page ?? "0") ,search ?? null)
  }
  @Get("find-by-code/:code")
  async findByCode(@Param("code") code:string){
    return await this.service.findByCode(code)
  }
  @Post()
  async store(@Body()  role:CreateRoleRequest){
    const dto = RoleAdapters.convertRoleRequestToRoleDto(role)
    return await this.service.store(dto);
  }
}
