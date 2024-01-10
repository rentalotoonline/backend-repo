import SeedFactory from "../seed.factory";
import ApplicationParameter from "../../core/src/app_parameter/ApplicationParameter";
import AppConstants from "../../configs/src/constants";
import { Logger } from "@nestjs/common";
import { DataSource, QueryRunner } from 'typeorm';


export default class TransactionStatusFactory{
    static async run(queryRunner: DataSource) {
	  	const dataType="STRING"
	  	const datas = AppConstants.TRX_STATUS_ARRAY
	  	const groupType = AppConstants.APPLICATION_PARAMETER_GROUP_TYPES.TRX_STATUS
		const keys =Object.keys(datas)
	    const params:ApplicationParameter[]=keys.map(key=>{
			const {value,code} = datas[key]

				return new ApplicationParameter()
				  .setCode(code)
				  .setValue(value)
				  .setGroupData(groupType)
				  .setDataType(dataType)

			}
		)

	  params.map(async (val)=>{
		  try {
			await queryRunner.manager.save(ApplicationParameter,val)
		  }catch (e) {
			Logger.debug("TransactionStatusFactory:CODE ALREADY BEEN TAKEN")
		  }
		})


    }

}