import store from '@/store'
import url from './requrl.js'
let urlHeader = url
let hasLogin = false;
let token = null;
let theToken = null;
/**
 * [getToken description]
 * @return {[type]} [description]
 */


/**
 * main.nvue 路径是写死的
 */


function getToken() {
	theToken = uni.getStorageSync('token')
	hasLogin = uni.getStorageSync('hasLogin')
	if (hasLogin === false || hasLogin === "false") {
		theToken = ""
	}
	return theToken;
}

/**
 * [get description]
 * @param  {[type]} url  [description]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function get(url, data, type) {
	token = getToken();
	if (token === "" && type === "auth") {
		return uni.reLaunch({
			url: '/pages/user/login'
		})
	}
	return uni.request({
		url: urlHeader + url, //仅为示例，并非真实接口地址。
		data: data,
		method: "GET",
		dataType: "json",
		header: {
			'Authorization': token,
			'Content-Type': 'application/x-www-form-urlencoded', //自定义请求头信息
		}
	}).then((res) => {
		if (parseInt(res[1].data.code) === 0 || res[1].data.code == 1 || res[1].data.code == 2 && parseInt(res[1].statusCode) ===
			200) {
			return res[1]
		} else if (token === null || hasLogin === false || res[1].data.code == 402 || res[1].data.code == 401) {
			uni.showToast({
				icon: 'none',
				title: "请先登录"
			})
			return uni.reLaunch({
				url: '/pages/user/psdlogin'
			})
		} else {
			return console.log(res)
		}
	}).catch(res => {
		uni.showToast({
			title: res,
			icon: 'none'
		})
		return Promise.reject()
	})
}
/**
 * [post description]
 * @param  {[type]} url  [description]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function post(url, data, type = "auth") {
	token = getToken()
	if (token === "" && type === "auth") {
		console.log('token:',token)
		return uni.reLaunch({
			url: '/pages/user/login'
		})
	}

	return uni.request({
		url: urlHeader + url, //仅为示例，并非真实接口地址。
		data: data,
		method: "POST",
		dataType: "json",
		header: {
			'Authorization': token,
			'Content-Type': 'application/json', //自定义请求头信息
		}
	}).then((res) => {
		console.log('url:',url)
		console.log(res)
		if (res[1].data.code == 0 || res[1].data.code == 1 || res[1].data.code == 3 || res[1].data.code == 2 && res[1].statusCode ==
			200) {
			// console.log(res[1].data)
			return res[1].data
		} else if (token === '' || hasLogin === false || res[1].data.code == 402 || res[1].data.code == 401) {
			// console.log('url:',url)
			// console.log('data:',data)
			// console.log('token:',token)
			// console.log('code:',res[1].data.code)
				uni.showToast({
					icon: 'none',
					title: "请先登录"
				})
				return uni.reLaunch({
					url: '/pages/user/login'
				})
		} else {
			return console.log(res)
		}
	}).catch(res => {
		uni.showToast({
			title: res,
			icon: 'none'
		})
		return Promise.reject()
	})
}
/**
 * [onceUpload description]
 * @param  {[type]}   url      [description]
 * @param  {[type]}   name     [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
function upload(url, name, callback) {
	token = getToken();
	uni.chooseImage({
		count: 1,
		sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
		success: (res) => { // 本机显示预览图  5242880
			uni.showLoading({
				title: '上传中'
			});
			// console.log(res.tempFiles[0].size)
			if (res.tempFiles[0].size > 5242880) {
				uni.hideLoading();
				uni.showToast({
					icon: 'none',
					title: '上传图片不能大于5M'
				})
			} else {
				uni.uploadFile({
					url: `${urlHeader + url}`,
					//url: "http://fangchan.chuangmi.site/api/plugs.extend/upload",
					filePath: res.tempFilePaths[0], // 上传图
					header: {
						'Authorization': token
					},
					name: `${name}`,
					success: function(uploadFileRes) {
						// console.log(JSON.parse(uploadFileRes.data))
						if (JSON.parse(uploadFileRes.data).code == 1) {
							callback([res.tempFilePaths[0], JSON.parse(uploadFileRes.data).data.url])
							// console.log(JSON.parse(uploadFileRes.data).data.file_path)
							// console.log(path);
						} else {
							console.log("上传失败")
							uni.showToast({
								icon: 'none',
								title: '上传失败'
							})
						}
					},
					fail: (err) => {
						console.log(err)
					},
					complete: () => {
						uni.hideLoading();
					}
				});
			}
		}
	});
}

export default {
	get,
	post,
	upload
}
