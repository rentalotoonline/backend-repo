import { DataSource, QueryRunner } from 'typeorm';
import SeedFactory from "../seed.factory";
import ApplicationParameter from "../../core/src/app_parameter/ApplicationParameter";
import Slugfy from "../../helpers/src/Slugfy";
import AppConstants from "../../configs/src/constants";
import { Logger } from '@nestjs/common';


export default class CarTypeFactory  {
		static async run(ds: DataSource) {
		const queryRunner = ds.createQueryRunner("slave")
		const avanza = "Avanza"
		const xenia = "Xenia"
		const values =[avanza,xenia]
		const codes = values.map(val=>{
				return Slugfy.sligfyText(`car type ${val}`)
		})
		const group_type = AppConstants.APPLICATION_PARAMETER_GROUP_TYPES.CAR_TYPE
		const carType:ApplicationParameter[]=codes.map((val,index)=>{
			return new ApplicationParameter()
			.setCode(val)
			.setValue(values[index])
			.setGroupData(group_type)
			.setDataType("STRING")
		})
		await queryRunner.connect()
		carType.map(async (val)=>{
				try {
					await queryRunner.manager.save(ApplicationParameter,val)
				}catch (e) {
					Logger.debug("CarType:CODE ALREADY BEEN TAKEN")
				}
		})


    }


}