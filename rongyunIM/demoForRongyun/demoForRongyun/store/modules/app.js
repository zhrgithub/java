import {cs} from "@/api/index.js"
const state = {}
const mutations ={}
const actions = {

}
const getterss = {
	async cs:(state)=>(params)=>{
		let res = await cs(params)
		return res
	}
}
export default{
	namespaced:true,
	state,
	getters,
	mutations,
	actions
}