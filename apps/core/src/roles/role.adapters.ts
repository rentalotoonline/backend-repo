import CreateRoleResponse from "../../../dto/src/roles/CreateRoleResponse";
import ApplicationParameter from "../app_parameter/ApplicationParameter";
import CreateRoleRequest from "../../../dto/src/roles/CreateRoleRequest";
import CreateRoleDto from "../../../dto/src/roles/CreateRoleDto";
import AppConstants from "../../../configs/src/constants";
import Slugfy from "../../../helpers/src/Slugfy";


export default class RoleAdapters{
    static groupType:string = AppConstants.APPLICATION_PARAMETER_GROUP_TYPES.ROLE
    public static convertRoleReponseList(entities:ApplicationParameter[]):CreateRoleResponse[]{
      return entities.map(val=>{
        return this.convertToResponse(val)
      })
    }

    static convertRoleRequestToRoleDto(request:CreateRoleRequest):CreateRoleDto{
      let roleDto = new CreateRoleDto()
      roleDto._role_name=request.role_name
      return roleDto
    }
    static convertDtoToEntity(request:CreateRoleDto):ApplicationParameter{

      return new ApplicationParameter()
                .setCode(`role_${Slugfy.sligfyText(request._role_name)}`)
                .setValue(request._role_name)
                .setGroupData(this.groupType)
                .setDataType("STRING")
    }

    static convertToResponse(val:ApplicationParameter){
      const result = new CreateRoleResponse()
      result._id=val.getId()
      result._role_name=val.getValue()
      result._role_code=val.getCode()
      return result;
    }

    static createEntityByID(id:number):ApplicationParameter{
      return new ApplicationParameter()
        .setId(id)
    }


    static getIfRoleData(entity:ApplicationParameter): boolean{
        if (entity.getGroupData().toLowerCase()===this.groupType.toLowerCase()){
          return true
        }
        return false;
    }
}