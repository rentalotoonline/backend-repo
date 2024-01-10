import { DataSource, QueryRunner } from 'typeorm';
import SeedFactory from "../seed.factory";
import ApplicationParameter from "../../core/src/app_parameter/ApplicationParameter";
import AppConstants from "../../configs/src/constants";
import { Logger } from '@nestjs/common';

export default class UserRoleSeeder   {
    static async run(ds: DataSource) {
			const queryRunner = ds.createQueryRunner()
			await queryRunner.connect()
			try {
					const appParam = new ApplicationParameter()
						.setCode("role_super_admin")
						.setValue("Super Admin")
						.setGroupData(AppConstants.APPLICATION_PARAMETER_GROUP_TYPES.ROLE)
						.setDataType("STRING")
					await queryRunner.manager.save(ApplicationParameter,appParam)
			}catch (e) {
				Logger.debug("UserRole:CODE ALREADY BEEN TAKEN")
			}

    }

}


