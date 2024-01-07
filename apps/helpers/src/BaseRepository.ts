
export default interface BaseRepository<T>{
  findByID(id:number):Promise<T>;
  findBy(key:string,value:any):Promise<T>;
  listBy(key:string,value:any,take:number,skip:number):Promise<T[]>;
  list(take:number,skip:number,search?:any):Promise<T[]>;
  save(entity:T):Promise<T>
  update(entity:T):Promise<boolean>
  delete(entity:T):Promise<boolean>
}