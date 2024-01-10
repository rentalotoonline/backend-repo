import DatasourceConfiguration from "../configs/src/databases";
import TransactionStatusFactory from "./seeders/transaction.status.factory";
import CarTypeFactory from "./seeders/car.type.factory";
import UserRoleSeeder from "./seeders/user.role.seeder";
import PaymentTypeFactory from './seeders/payment.type.factory';


export default class MainSeeder{
  	static async Run(){

		const dataSource = await DatasourceConfiguration.getDataSourceWithoutEntities()

	  	await TransactionStatusFactory.run(dataSource)
	  	await CarTypeFactory.run(dataSource)
			await PaymentTypeFactory.run(dataSource)
			await UserRoleSeeder.run(dataSource)
	}
}