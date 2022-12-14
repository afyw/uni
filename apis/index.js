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
export function GetTopAlbum(data) {
	return request.request({
		url: "/album/newest",
		method: "GET",
		data
	})
}


// 精选视频
export function GetRelatedVideo(data) {
	return request.request({
		url: "/related/allvideo",
		method: "GET",
		data
	})
}


// 视频页
// 导航条
export function GetAllNavList(data) {
	return request.request({
		url: "/video/group/list",
		method: "GET",
		data
	})
}

export function GetNavList(data) {
	return request.request({
		url: "/related/allvideo",
		method: "GET",
		data
	})
}
