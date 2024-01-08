import { Logger } from "@nestjs/common";
import { snakeToCamelCase } from "./string.fn";
import Func = jest.Func;

export function SetterGetter(seed:any){
	return (target,key)=>{

	  target[key] =seed;
	  const setterFn = snakeToCamelCase(`set_${key}`)

	  const getterFn = snakeToCamelCase(`get_${key}`)
	  target[`${setterFn}`]=val=>{target[key]=val}
	  target[`${getterFn}`] = ()=> {
			return target[key];
	  }

	}

}



