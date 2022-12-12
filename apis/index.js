import request from "@/utils/request.js"

// 轮播请求接口
export function GetBanner(data) {
	return request.request({
		url: '/banner',
		method: "GET",
		data
	})
}

// 推荐歌单
export function GetRecommendSongs(data) {
	return request.request({
		url: "/personalized",
		method: "GET",
		data
	})
}

// 新碟新歌