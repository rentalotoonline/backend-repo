import BaseRepository from "../../../helpers/src/BaseRepository";
import Cars from "./Cars";


export default class CarsRepository implements BaseRepository<Cars>{
    findByID(id: number): Promise<Cars> {
        throw new Error("Method not implemented.");
    }
    findBy(key: string, value: any): Promise<Cars> {
        throw new Error("Method not implemented.");
    }
    listBy(key: string, value: any, take: number, skip: number): Promise<Cars[]> {
        throw new Error("Method not implemented.");
    }
    list(take: number, skip: number, search?: any): Promise<Cars[]> {
        throw new Error("Method not implemented.");
    }
    save(entity: Cars): Promise<Cars> {
        throw new Error("Method not implemented.");
    }
    update(entity: Cars): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    delete(entity: Cars): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}