

export default class Pagination{
	static getLimit(){
		return 10;
	}
	static getOffset(page=0){
		const take=10
		const skip = page==0||page==1?0:page*take
		return {skip,take}
	}
}