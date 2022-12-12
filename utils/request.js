/**
 * 请求组件封装
 * @param {Object} contentType 请求类型 1=json 2=form
 */

function request({
	url,
	data,
	method = "GET",
	contentType = 1
}) {
	let header = {
		'content-type': contentType === 1 ? "application/json" : "application/x-www-form-urlencoded"
	}
	let baseUrl = "http://127.0.0.1:3000"

	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + url,
			data,
			method,
			header,
			// 根据statusCode判断
			success: (res) => {
				if (res.statusCode === 200) {
					// 请求成功
					resolve(res.data)
				} else if (res.statusCode === 401) {
					uni.showToast({
						icon: 'none',
						title: '未登录或者登录状态已超时',
						duration: 1000
					})
				} else if (res.statusCode === 405) {
					uni.showToast({
						icon: 'none',
						title: '请求方法错误',
						duration: 1000
					})
				} else {
					uni.showToast({
						icon: 'none',
						title: '请求错误' + res.statusCode,
						duration: 1000
					})
				}
			},
			fail: (err) => {
				console.log("err:", err)
				uni.showToast({
					icon: 'none',
					title: err.errMsg,
					duration: 1000
				})
				reject(err)
			}
		})
	})
}

export default {
	request
}
