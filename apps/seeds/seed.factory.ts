import { QueryRunner } from "typeorm";


export default abstract class SeedFactory{
  abstract run(queryRunner:QueryRunner);
}