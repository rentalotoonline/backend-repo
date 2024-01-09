export default class RentDetailResponse{
  id:number
  price:number
  description:string
  setId(id:number){
	this.id=id
	return this;
  }
  setDescription(itemData:string){
	this.description = itemData
	return this;
  }
  setPrice(p:number){
	this.price=p
	return this
  }
}