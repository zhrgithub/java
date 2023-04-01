import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		token: '',
		cityList: '', // 城市列表
		currentCity: '', // 用户所处的当前城市名
		cityCode: '', //城市编码
		areaList: [] ,// 当前城市下的城区列表
		houseItemVux:[],
		imList:[],
		userList:[]
	},
	mutations: {
		updateUserList(state,obj){
			
			if(obj.isUpdateMessageNum==="newMsg"){//消息来了
				let oldUserList = uni.getStorageSync('userList');
				console.log("消息来了消息来了消息来了消息来了消息来了")
				let newArr = obj.arr.map((d,index)=>{
					console.log(d)
					if(oldUserList.find(item=>(d.targetId == item.targetId))){
						let needObj = oldUserList.find(item=>(d.targetId == item.targetId))
						needObj.unreadMessageCount+=1
						return needObj
					}else{
						return d
					}
				})
				
				// state.userList = newArr
				uni.setStorageSync('userList', newArr);
				
			}else if(obj.isUpdateMessageNum===true){//清除消息条数
				state.userList = obj.arr
				uni.setStorageSync('userList', obj.arr);
				
			}else{//初始化
				let oldUserList = uni.getStorageSync('userList');
				let newArr
				if(oldUserList){
					newArr = obj.arr.map((d,index)=>{
						if(oldUserList.find(item=>(d.targetId == item.targetId))){
							return oldUserList.find(item=>(d.targetId == item.targetId))
						}else{
							return d
						}
					})
				}else{
					newArr = obj.arr
				}
				state.userList = newArr
				uni.setStorageSync('userList', newArr);
				
				
			}
			
			let tabbarNum = 0
			state.userList.forEach(item=>{
				tabbarNum+=item.unreadMessageCount
			})
			//#ifndef H5 
				if(tabbarNum){
					uni.setTabBarBadge({
						index: 2,
						text: tabbarNum.toString()
					})
				}else{
					uni.removeTabBarBadge({index:2})
				}
			//#endif
			//#ifdef H5
				if(tabbarNum){
					uni.setTabBarBadge({
						index: 3,
						text: tabbarNum.toString()
					})
				}else{
					uni.removeTabBarBadge({index:3})
				}
			//#endif
			
			console.log("Vux更新会话列表",state.userList,"isUpdateMessageNum",obj.isUpdateMessageNum)
		},
		addIMMsg(state,val){
			state.imList.push(val)
			let data = uni.getStorageSync("meInfo")
			// console.log("自己的信息",data)
			//非自己的消息震动
			if(val.senderUserId!=data.id){
				console.log('振动');
				//#ifndef H5 
				uni.vibrateLong();
				//#endif
			}
			console.log("Vux更新聊天列表",state.imList)
		},
		getToken(state, val) {
			state.token = val
		},
		holdDate(state,val){
			state.houseItemVux = val
		},
		removeToken(state) {
			state.token = ''
		},
		// 修改当前城市
		setCurrentCity(state, val) {
			state.currentCity = val
		},
		// 设置citylist
		setCityList(state, val) {
			state.cityList = val
		},
		// 设置citycode
		setCityCode(state, val) {
			state.cityCode = val
		},
		// 设置areaList
		setAreaList(state, val) {
			state.areaList = val
		}
	},
	getters: {
		// 根据城市名获取城市编码
		// CITY_CODE: (state,store) => {
		// 	return (cityName)=>{
		// 		console.log()
		// 		store.ALL_CITY.forEach((item,index)=>{
		// 			if(item.name===cityName){
		// 				return item.code
		// 			}
		// 		})
		// 	}
		// },
		// // 获取所有城市
		// ALL_CITY(state){
		// 	if(!state.cityList){
		// 		return []
		// 	}
		// 	return state.cityList.city
		// }
	}

})

export default store
