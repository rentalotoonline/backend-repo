import { Injectable } from "@nestjs/common";
import RentReturnRepository from "./rent.return.repository";
import RentRepository from "../rent/rent.repository";


@Injectable()
export default class RentReturnService{
  constructor(
	protected repository:RentReturnRepository,
	protected rentRepository:RentRepository,
  ) {
  }

  createReturn(){}
}
