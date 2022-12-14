<template>
	<view class="video">
		<view class="topbar">
			<scroll-view scroll-x="true" class="scroll-view" :show-scrollbar="false">
				<view class="rel">
					<view class="item" v-for="(item,index) in allNavList" :key="index"
						:class="{active: curNav === item.id}" @click="switchNav(item.id,index)">
						<view class="desc">
							{{item.name}}
						</view>

					</view>
					<!-- 下划线 -->

				</view>
			</scroll-view>
		</view>

		<!-- 视频列表 -->
		<mescroll-uni :down="downOption" :up="upOption" @down="downCallBack" @up="upCallBack">
			<view class="video-list">
				<view class="video-item" v-for="(item,index) in relatedVideo" :key="index">
					<view class="video-wrap">
						<image :src="item.coverUrl" class="img"></image>
						<view class="desc ellipsis">
							{{item.title}}
						</view>
						<view class="creater-bar flex-box">
							<view class="name">
								{{item.creator[0].userName}}
							</view>
						</view>
					</view>
				</view>

			</view>
		</mescroll-uni>
	</view>
</template>

<script>
	import {
		GetNavList,
		GetAllNavList,
		GetRelatedVideo
	} from "@/apis/index.js"

	import MescrollUni from '@/components/mescroll-uni/components/mescroll-uni/mescroll-uni.vue'
	export default {

		components: {
			MescrollUni
		},
		data() {
			return {
				allNavList: [], //全部导航栏
				navList: [], //真实展示的数据,通过
				curNav: '', //当前选中的导航条
				sliderWidth: 60, //导航条默认宽度
				sliderOffset: 30, //导航条偏移量
				downOption: { //下拉刷新配置
					auto: true
				},
				upOption: { //上拉加载配置
					auto: true,
					page: {
						num: 0, //起始页
						size: 10, //一页的条数
					},
				},
				relatedVideo: [], //视频列表	

			};
		},
		onLoad() {
			this.getNavList()
			// this.init() 
		},

		methods: {

			// 获取导航条数据
			async getNavList() {
				// const params = {
				// 	id: 124
				// }
				this.allNavList = await GetAllNavList()
				this.allNavList = this.allNavList.data.slice(0, 7)
				this.curNav = this.allNavList[0].id
				// 自动切换到第一项
				this.switchNav(this.curNav, 0)
			},
			// 导航条高亮切换
			switchNav(itemId, index) {
				this.curNav = itemId
				// 导航条宽度
				// 请求数据未知
				// 加载第一项对应的视频列表
				this.getList(1, 5, res => {
					console.log(res)
					this.relatedVideo = res
				})
				this.$forceUpdate()
			},
			// 获取视频列表
			getList(pageNum, pageSize, successCb, errCb) {
				const params = {
					id: this.curNav,
					pageNum,
					pageSize
				}

				GetRelatedVideo(params).then(res => {
					successCb && successCb(res.data)
				}, err => {
					errCb && errCb(err)
				})

			},
			// 下拉刷新回调
			downCallBack(mescroll) {
				// console.log("downback")
				// 重置列表为第一列（自动执行Page.num =1）
				mescroll.resetUpScroll()
			},
			// 上拉加载回调
			upCallBack(mescroll) {
				// console.log("upback", mescroll)
				// 加载下一页数据
				this.getList(mescroll.num, mescroll.size, res => {
					if (mescroll.num == 1) {
						this.relatedVideo = []
					}
					// 下拉累加数据
					this.relatedVideo = this.relatedVideo.concat(res)
					// 隐藏刷新加载状态
					mescroll.endSuccess()
				}, () => {
					// 失败的回调，隐藏下拉刷新	 
					mescroll.endErr();
				})

			}
		},

	}
</script>

<style lang="scss">
	.topbar {
		.h86 {
			height: 86rpx;
		}
	}

	.scroll-view {
		position: fixed;
		top: 0;
		width: 100%;
		height: 86rpx;
		white-space: nowrap;
		text-align: center;
		line-height: 86rpx;
		color: #333;
		font-weight: 600;
		border-bottom: 1rpx solid #e6e6e6;
		z-index: 10;
		background: #fff;

		.item {
			position: relative;
			display: inline-block;
			min-width: 126rpx;
			height: 86rpx;
			line-height: 86rpx;
			padding: 0 20rpx;

			&.active {
				color: #f32628;
			}
		}
	}

	.slide {
		position: absolute;
		width: 60rpx;
		height: 4rpx;
		left: 0;
		bottom: 0rpx;
		background: #f32628;
		transition: transform 0.3s;
		z-index: 2;
		/* #ifdef MP-WEIXIN */
		bottom: 2rpx;
		/* #endif */
	}

	.video-list {
		color: #333;
		background: #f8f8f8;

		.tit-bar {
			padding-left: 32rpx;
		}

		.video-item {
			padding-top: 32rpx;
			background: #fff;
			border-bottom: 24rpx solid #f8f8f8;
		}

		.video-wrap {
			width: 686rpx;
			margin: 0 auto;
		}

		.img {
			display: block;
			width: 686rpx;
			height: 390rpx;
			border-radius: 10rpx;
			background: #eee;
		}

		.desc {
			font-size: 30rpx;
			font-weight: 600;
			line-height: 84rpx;
			border-bottom: 1rpx solid #e6e6e6;
		}
	}

	.creater-bar {
		height: 100rpx;
		justify-content: space-between;
		align-items: center;

		.avactor-box {
			align-items: center;
		}

		.avactor {
			width: 66rpx;
			height: 66rpx;
			margin-right: 10rpx;
			border-radius: 66rpx;
			background: #eee;
		}

		.name {
			line-height: 100rpx;
		}
	}
</style>
