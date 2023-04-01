<template>
	<view class="y-tabs">
		<view class="u-tabs-box">
			<u-tabs-swiper activeColor="#607d8b" inactiveColor="#a9a9a9" :barHeight="8" ref="tabs" :list="list" :current="current"
			 @change="change" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
		</view>
		<!-- <uLoadmore :status="status"></uLoadmore> -->
		<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
			<swiper-item class="swiper-item">
				<scroll-view @scrolltolower="lower" scroll-y style="height: 100%;width: 100%;">
					<view class="page-box">
						<view class="card animation-slide-bottom" v-for="(item,index) in orderList1" :key="index" @click="tz(item.id)">
							<image class="card-img" :src="item.img" mode="aspectFill"></image>
							<view class="card-right">
								<view class="card-title">
									{{item.title}}
								</view>
								<view class="card-yprice">
									{{item.yprice}}
								</view>
								<view class="card-price">
									{{item.xprice}}
								</view>
							</view>
							<view class="card-right-bottom">
								<button type="default" class="card-btn" size="mini" v-if="item.status === 1">去拼团</button>
								<button type="default" style="color: #919191" class="card-btn" size="mini" v-else>已结束</button>
								<text class="iconfont icon-shandian spark1"></text>
								<text class="iconfont icon-shandian spark"></text>
							</view>
						</view>
						<uLoadmore v-show="loadmore[0]" :status="status[0]"></uLoadmore>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item class="swiper-item">
				<scroll-view @scrolltolower="lower" scroll-y style="height: 100%;width: 100%;">
					<view class="page-box">
						<view class="card animation-slide-bottom" v-for="(item,index) in orderList2" :key="index" @click="tz(item.id)">
							<image class="card-img" :src="item.img" mode="aspectFill"></image>
							<view class="card-right">
								<view class="card-title">
									{{item.title}}
								</view>
								<view class="card-yprice">
									{{item.yprice}}
								</view>
								<view class="card-price">
									{{item.xprice}}
								</view>
							</view>
							<view class="card-right-bottom">
								<button type="default" class="card-btn" size="mini" v-if="item.status === 1">去拼团</button>
								<button type="default" style="color: #919191" class="card-btn" size="mini" v-else>已结束</button>
								<text class="iconfont icon-shandian spark1"></text>
								<text class="iconfont icon-shandian spark"></text>
							</view>
						</view>
						<uLoadmore v-show="loadmore[1]" :status="status[1]"></uLoadmore>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item class="swiper-item">
				<scroll-view @scrolltolower="lower" scroll-y style="height: 100%;width: 100%;">
					<view class="page-box">
						<view class="card animation-slide-bottom" v-for="(item,index) in orderList3" :key="index" @click="tz(item.id)">
							<image class="card-img" :src="item.img" mode="aspectFill"></image>
							<view class="card-right">
								<view class="card-title">
									{{item.title}}
								</view>
								<view class="card-yprice">
									{{item.yprice}}
								</view>
								<view class="card-price">
									{{item.xprice}}
								</view>
							</view>
							<view class="card-right-bottom">
								<button type="default" class="card-btn" size="mini" v-if="item.status === 1">去拼团</button>
								<button type="default" style="color: #919191" class="card-btn" size="mini" v-else>已结束</button>
								<text class="iconfont icon-shandian spark1"></text>
								<text class="iconfont icon-shandian spark"></text>
							</view>
						</view>
						<uLoadmore v-show="loadmore[2]" :status="status[2]"></uLoadmore>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import uTabsSwiper from "@/components/u-tabs-swiper/u-tabs-swiper.vue"
	import uLoadmore from "@/components/u-loadmore/u-loadmore"
	import axios from '@/components/request.js'
	export default {
		components: {
			uTabsSwiper,
			uLoadmore
		},
		data() {
			return {
				/*
					loadmore   加载更多
					 loading   正在加载...
					 nomore    没有更多
				*/
				// status: 'nomore',
				status: ['loadmore', 'loadmore', 'loadmore'],
				finish: [false, false, false],
				loading: [true, true, true],
				loadmore: [true, true, true],
				timer: 200, // 每一个添加动画时间
				limit: 15,
				page: [0, 0, 0],
				orderList1: [],
				orderList2: [],
				orderList3: [],
				tabsHeight: 0,
				dx: 0,
				current: 0,
				swiperCurrent: 0,
				list: [
					{
						name: '装修'
					},
					{
						name: '建材'
					},
					{
						name: '软装'
					}
				],
			}
		},
		watch: {
			current() {
				let current = this.current
				let a = current === 0 ? 1 : current === 1 ? 2 : 3
				let count = this[`orderList${a}`].length
				if (count === 0)
					this.getOrderList()
			}
		},
		created() {
			this.getOrderList();
		},
		methods: {
			tz(id) {
				/**
				 *   val     0:装修  1：建材   2:软装
				 *   index  列表下标
				 */
				console.log(id)
				uni.navigateTo({
					url: '/pages/newadd/Collage/detailed?id='+id
				});
			},
			lower(e) {
				let curren = this.current
				if (this.finish[curren] || this.loading[curren]) return;
				this.getOrderList()
			},
			getOrderList() {
				let current = this.current
				this.loading[current] = true
				this.status[current] = 'loading'
				this.$forceUpdate()
				let time = this.timer
				let a = current === 0 ? 1 : current === 1 ? 2 : 3
				let text = current === 0 ? '装修' : current === 1 ? '建材' : '软装' // 虚拟分类 真实数据无用可删除
				let count = this[`orderList${a}`].length // 虚拟第n个 真实数据无用可删除
				this.page[current]++
				let params = {
					page: this.page[current],
					limit: this.limit,
					type:text
				}
				/*请求数据*/
				let data=[];
				axios.post("/api/Decoration/groupList", params).then(res => {
					console.log(res)
					if(res.code === 1){
						data=res.data
					}			
				});
				/*整理数据*/
				let arr = []
				setTimeout(() => {
					this.loadmore[current] = false
					for (let i = 0; i < data.length; i++) {
						let obj = {
							id:data[i].id,
							img: data[i].cover_image,
							title: data[i].name,
							yprice: `原价${data[i].old_price}`,
							xprice: data[i].new_price
						}
						this[`orderList${a}`].push(obj)
						/*动画添加数据*/
						/* let timer = setTimeout(() => {
							clearTimeout(timer)
							this[`orderList${a}`].push(obj)
						}, time * i) */
					}
					

					/*全部加载完时间*/
					/* let date = time * this.limit + time

					let aaa = setTimeout(() => {
						clearTimeout(aaa)
						
					}, date) */
					this.loadmore[current] = true
					this.loading[current] = false
					this.finish[current] = true
					this.status[current] = data.length < this.limit ? 'nomore' : 'loadmore'
					this.$forceUpdate()
				}, 800)

			},
			// tab栏切换
			change(index) {
				this.swiperCurrent = index;
			},
			transition({
				detail: {
					dx
				}
			}) {
				this.$refs.tabs.setDx(dx);
			},
			animationfinish({
				detail: {
					current
				}
			}) {
				this.$refs.tabs.setFinishCurrent(current);
				this.current = current;
				this.swiperCurrent = current;
			}
		}
	}
</script>


<style lang="scss" scoped>
	$u-type-warning-dark: #f29100;
	$u-tips-color: #909399;
	$u-border-color: #e4e7ed;
	$u-type-info-dark: #82848a;

	.y-tabs {
		flex: 1;
		margin-top: 20rpx;
		border-top: 2rpx solid #f2f2f2;

		.u-tabs-box {
			box-shadow: 5rpx 5rpx 5rpx #f2f2f2;
		}
	}

	.swiper-box {
		flex: 1;
	}

	.swiper-item {
		height: 100%;
	}

	.card {
		display: flex;
		width: 710rpx;
		margin: auto;
		flex-direction: row;
		padding-top: 20rpx;
		position: relative;
		padding-bottom: 20rpx;
		border-bottom: 1px solid #f2f2f2;

		.card-img {
			width: 282rpx;
			height: 191rpx;
			border-radius: 5rpx;
		}

		.card-right {
			padding: 10rpx 0 20rpx 20rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
		}

		.card-title {
			color: #607d8b;
			font-size: 14px;
		}

		.card-yprice {
			text-decoration: line-through;
			color: #c6c6c6;
			font-size: 12px;
		}

		.card-price {
			color: #ec6142;
			font-size: 12px;
		}

		.card-right-bottom {
			position: absolute;
			bottom: 10rpx;
			right: 10rpx;
			display: flex;
			align-items: center;
		}

		.card-btn {
			background-image: linear-gradient(#F9DD70, #FDB221);
			border-top-left-radius: 50rpx;
			border-bottom-left-radius: 50rpx;
			font-size: 12px;
			color: #f21010;
			position: relative;
			padding: 0rpx 40rpx 0rpx 40rpx;
			z-index: 1;

			&::after {
				border: none;
			}
		}

		.spark1 {
			color: #FFFFFF;
			font-size: 40px;
			margin-left: -45rpx;
			position: relative;
			z-index: 2;
		}

		.spark {
			background: linear-gradient(#F9DD70, #FDB221);
			-webkit-background-clip: text;
			color: transparent;
			font-size: 35px;
			height: 100rpx;
			margin-left: -72rpx;
			margin-top: 15rpx;
			position: relative;
			z-index: 3;
		}
	}
</style>
