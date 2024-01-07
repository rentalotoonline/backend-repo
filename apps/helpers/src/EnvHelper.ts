import * as process from 'process';
require("dotenv").config()
export default class EnvHelper{
  static getValue(key,defaultValue:string):string{
    const env = process.env
    if(!env[key]){
      return defaultValue;
    }
    return env[key].toString();
  }
}