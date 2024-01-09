import { Injectable, Logger } from "@nestjs/common";
import RentRepository from "./rent.repository";
import CarsRepository from "../cars/cars.repository";
import UserRepository from "../users/user.repository";
import Rent from "./Rent";
import AppException from "../../../helpers/src/exceptions";
import RentDto from "../../../dto/src/rent/rent.dto";
import AppResponse from "../../../configs/src/responses";
import { dateDifference, padText } from "../../../helpers/src/string.fn";
import RentRequest from "../../../dto/src/rent/rent.request";
import { createFailResp, createSuccessResp } from "../../../helpers/src/createResponse";
import AppConstants from "../../../configs/src/constants";
import RentAdapter from "./rent.adapter";
import { DataSource, getConnection, QueryRunner } from "typeorm";
import Cars from "../cars/Cars";
import RentDetails from "../rent_details/rent.details";
import DatasourceConfiguration from "../../../configs/src/databases";
import { InjectDataSource } from "@nestjs/typeorm";
import RentDetailRepository from "../rent_details/rent.detail.repository";


@Injectable()
export default class RentService{
  	constructor(
		protected rentRepository:RentRepository,
		protected carRepository:CarsRepository,
		protected customerRepository:UserRepository,
		protected rentDetailRepository:RentDetailRepository,
	) {

	}

  	private async generateInvoice(){
		const db = this.rentRepository.raw()
	  	const data = await db.query("SELECT invoice_number FROM transactions.rents ORDER by id desc LIMIT 1")
	  	let fr,back = ""
	  	try {
		  [fr,back] = data[0].invoice_number.split("-")
		}catch (e) {
		  back="0"
		}

	  	const backInt = parseInt(back)+1
		const code = padText(backInt,8)
	    return `IVN-${code}`
	}
  	async create(rent:RentRequest):Promise<AppResponse>{

	  const q = await DatasourceConfiguration.getDataSource()
	  const qRun = q.createQueryRunner("slave")
	  await qRun.connect()
	  try {
		  	await qRun.startTransaction()
		  	const dto = RentAdapter.requestToDto(rent)

			const invoice = await this.generateInvoice()
		  	const findCar = await this.carRepository.findByID(dto.getCarId())
		  	const customerInfo = await this.customerRepository.findByID(dto.getCustomerId())
			const e = RentAdapter.dtoToEntity(dto,customerInfo)
			e.setInvoiceNumber(invoice)
		  	const result = await this.rentRepository.create(e,qRun)
			const payment =await this.createRentDetails(e,findCar,dto.getDiscount()??0,qRun)
			result.setPayment(payment.totalPayment)
			result.setDiscount(payment.discount)
			const finalResult = await this.rentRepository.update(result,qRun)
			const resp = RentAdapter.entityToResponse(finalResult,payment.data,findCar)
			await qRun.commitTransaction()

			return createSuccessResp(201,AppConstants.MESSAGES.CREATED,resp)
		}catch (e) {
			Logger.error(e)
		  	await qRun.rollbackTransaction()
		  	createFailResp(400,AppConstants.MESSAGES.BAD_REQUEST,e)
		}
	}
	async update(rent:Rent):Promise<Rent>{
	  throw new AppException("Not implemented")
	}

	async cancelInvoice(rent:Rent):Promise<Rent>{
	  throw new AppException("Not implemented")
	}

	async findByID(id:number):Promise<Rent>{
	  throw new AppException("Not implemented")
	}
	async findByCustomer(customer_id:number):Promise<Rent>{
	  throw new AppException("Not implemented")
	}

	async findByInvoiceNo(invoiceNum:string):Promise<Rent>{
		  throw new AppException("Not implemented")
	}


  private async createRentDetails( e: Rent, findCar: Cars, discount: number,q:QueryRunner) {

		const qRun = q
		await qRun.connect()
		await qRun.startTransaction()
		try {

		  let rdet = new RentDetails()
		  let datas:RentDetails[]=[]
		  //cars
		  const {days} = dateDifference(e.getRentDate(),e.getReturnEstimationDate())
		  let payment = days*findCar.getPrice();
		  let driver_payment = e.getUseDriver()?days*findCar.getAdditionalPrice() : 0;
		  let tPayment = payment+driver_payment
		  let adminNominal = tPayment*AppConstants.ADMIN_DEF_PAYMENT
		  let discountNominal = tPayment*(discount/100)
		  rdet.setItemType(findCar.getCarType().getValue())
			.setRent(e)
			.setPrice(payment)
			.setItemType(findCar.getCarType().getValue())
			.setItemId(findCar.getId())

		  rdet = await qRun.manager.save(RentDetails,rdet)
		  datas.push(rdet)

		  rdet = new RentDetails()
		  rdet.setRent(e)
			.setPrice(driver_payment)
			.setItemType("driver")

		  rdet = await qRun.manager.save(RentDetails,rdet)
		  datas.push(rdet)

		  rdet = new RentDetails()
			.setRent(e)
			.setPrice(adminNominal)
			.setItemType("admin_pay")


		  rdet = await qRun.manager.save(RentDetails,rdet)
		  datas.push(rdet)
		  rdet = new RentDetails()
			.setRent(e)
			.setPrice(discount==0?0 : 0-(discountNominal))
			.setItemType("discount")
		  rdet = await qRun.manager.save(RentDetails,rdet)
		  datas.push(rdet)
		  await qRun.commitTransaction()
		  return {
			data:datas,
			totalPayment:tPayment-discountNominal+adminNominal,
			discount,
		  };
		}catch (e) {
		  qRun.rollbackTransaction()
		  throw new AppException(e.message,500)
		}

  }
}