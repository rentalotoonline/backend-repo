import { DataSource, QueryRunner } from 'typeorm';
import SeedFactory from "../seed.factory";
import ApplicationParameter from "../../core/src/app_parameter/ApplicationParameter";
import { Logger } from '@nestjs/common';

export default class PaymentTypeFactory  {
    static async run(ds: DataSource) {
			let queryRunner = ds.createQueryRunner();
			await queryRunner.connect()
			const code=["charge_admin","charge_biaya_supir","discount"]
			const group_data="charge_items"
			const values=["Biaya Admin","Biaya Supir(Jika menggunakan Driver)","Discount"]
			const app_params:ApplicationParameter[] = code.map((val,index)=>{
				return new ApplicationParameter()
				.setCode(val).setValue(values[index]).setGroupData(group_data).setDataType("STRING")
			})
			app_params.map(async (v)=>{
				try {
					await queryRunner.manager.save(ApplicationParameter,v)
				}catch (e) {
					Logger.debug("PaymentType:CODE ALREADY BEEN TAKEN")
				}
			})



    }

}