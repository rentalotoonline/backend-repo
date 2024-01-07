


export default interface BaseAdapters<ENTITY,REQUEST,DTO,RESPONSE>{
    entityToResponse(entity:ENTITY):RESPONSE;
    entityToResponseList(e:ENTITY[]):RESPONSE[];
    requestToDto(request:REQUEST):DTO;
    dtoToEntity(dto:DTO):ENTITY;

}