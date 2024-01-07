
import * as bcrypt from 'bcrypt'
import AppConstants from "../../configs/src/constants";
import { Logger } from "@nestjs/common";
export default class Hash{
  async make(password:string){
    try {
      const hashed =  await bcrypt.hash(password,AppConstants.CIPHER.SALT_ROUND)
      Logger.log(`hashed:${hashed}`)
      return hashed
    }catch (e) {
      return password
    }

  }
  async check(plaintext:string,hash:string){
    return await bcrypt.compare(plaintext,hash)
  }
}