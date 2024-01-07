
import { DataSource } from "typeorm";
import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import AppConstants from "./constants";
import EnvHelper from "../../helpers/src/EnvHelper";
import ApplicationParameter from "../../core/src/app_parameter/ApplicationParameter";
import Users from "../../core/src/users/Users";
import PersonalAccessToken from "../../core/src/auth/personal.access.token";
import Cars from "../../core/src/cars/Cars";



@Injectable()
export default class DatasourceConfiguration{
  static dataSource:DataSource;
  static async createSchema() {
    var ormOptions = this.getDatabase()
    this.dataSource = new DataSource({
      type:"postgres",
      host: EnvHelper.getValue(AppConstants.DB_ENV_KEYS.HOST,"localhost"),
      port: parseInt(EnvHelper.getValue(AppConstants.DB_ENV_KEYS.PORT,"5432")),
      username: EnvHelper.getValue(AppConstants.DB_ENV_KEYS.USER,"postgres"),
      password: EnvHelper.getValue(AppConstants.DB_ENV_KEYS.PASSWORD,"password"),
      database: EnvHelper.getValue(AppConstants.DB_ENV_KEYS.DATABASE,"penjualan_development"),
      synchronize:true,
    })
    await this.dataSource.initialize();
    const qrun = this.dataSource.createQueryRunner("master")
    try{
      await qrun.query("create schema if not exists referable")

    }catch (e){
      console.log("referable already exists")
    }
    try{
      await qrun.query("create schema if not exists transactions")
    }catch (e) {
      console.log("transactions already exists")
    }
    try{
      await qrun.query("create schema if not exists auth")

    }catch (e){
      console.log("auth schema already exists")
    }

  }
  static getDatabase=():TypeOrmModuleOptions =>{ return {
    type: "postgres",
    host: EnvHelper.getValue(AppConstants.DB_ENV_KEYS.HOST,"localhost"),
    port: parseInt(EnvHelper.getValue(AppConstants.DB_ENV_KEYS.PORT,"5432")),
    username: EnvHelper.getValue(AppConstants.DB_ENV_KEYS.USER,"postgres"),
    password: EnvHelper.getValue(AppConstants.DB_ENV_KEYS.PASSWORD,"password"),
    database: EnvHelper.getValue(AppConstants.DB_ENV_KEYS.DATABASE,"penjualan_development"),
    entities:[ApplicationParameter,Users,PersonalAccessToken,Cars],
    synchronize:true,
  }}
}


