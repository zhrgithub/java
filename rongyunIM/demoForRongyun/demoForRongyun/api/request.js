//线上版本
//let urlHeader = "https://www.pinjianfang.cn/"
//测试版本
let urlHeader = "http://localhost:9090/"
import app from '@/App.vue'
function post(url, data) {
	return uni.request({
		url: urlHeader + url,
		data: data,
		header:{
			'Content-Type': 'application/json'
		},
		method: "POST"
	}).then((res) => {
		if (res[1].data.code == 1) {
			return res[1].data
		}else{
			uni.showToast({
				title:res[1].data.message,
				mask:true,
				icon:'none',
				duration:1000
			})
			uni.reLaunch({
				url: '/pages/login/login'
			});
		}
	}).catch(err => {
		uni.showToast({
			title: err,
			icon: 'none'
		})
		return 
	})
}
export default {
	post,
	
}
