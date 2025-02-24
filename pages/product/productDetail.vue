<template>
	<view class="layout pageBg">
		<!-- 图片 -->
		<view class="top">
			<mySwiper class="mySwiper shadow" :imageList="detail.imageList"></mySwiper>
			<view class="head">
				<view class="box" v-for="spec in headSpecList" :key="spec.value">

					<view class="title">
						{{spec.text}}

						<uni-icons v-if="spec.description" custom-prefix="iconfont" type="icon-question-circle"
							size="16" @click="openPop(spec.description)">
						</uni-icons>
					</view>

					<view class="text">
						{{detail[spec.value]}}{{spec.unit}}
					</view>

				</view>
			</view>
		</view>

		<tabList :arrs="tabs" :showMore="false"></tabList>

		<!-- 参数内容区 -->
		<view class="content">
			<view class="line" v-for="spec in contentSpecList" :key="spec.value">
				<view class="key">
					{{spec.text}}
					<uni-icons v-if="spec.description" custom-prefix="iconfont" type="icon-question-circle" size="16"
						@click="openPop(spec.description)"></uni-icons>
					:
				</view>

				<view class="value">
					{{detail[spec.value]}}{{spec.unit}}
				</view>

			</view>
		</view>

		<view class="fill"></view>

		<!-- 底部功能栏 -->
		<view class="bottom-bar">
			<button class="share" open-type="share">
				<uni-icons custom-prefix="iconfont" type="icon-share" size="20" color="black"></uni-icons>
				<view class="share-text">分享</view>
			</button>

			<view class="toFunction" @click="toProduct()">
				<uni-icons custom-prefix="iconfont" type="icon-shopfill" size="22"></uni-icons>
				鞋库
			</view>
			<view class="toFunction" @click="toCompare()">
				<uni-icons custom-prefix="iconfont" type="icon-versus" size="20"></uni-icons>
				去对比
			</view>
			<button class="addButton" @click="add()">
				加入对比
			</button>
		</view>

		<view class="fillSafeArea"></view>

		<uni-popup ref="pop" type="bottom" background-color="white" border-radius="20px 20px 0 0">
			<view class="pop-title">参数解析</view>
			<view class="content-text">{{ popupContent }}</view>
		</uni-popup>
	</view>
</template>

<script setup>
	import {
		useSpecListStore
	} from '@/store/specList'
	import {
		apiGetSpecList,
		apiGetOneDetail,
		apiViewCount
	} from '@/api/api.js'
	import {
		goToHome
	} from '@/utils/function.js'
	import {
		reactive,
		ref
	} from 'vue'
	import {
		onLoad,
		onShareAppMessage,
	} from "@dcloudio/uni-app"
	import {
		useCompareListStore
	} from '@/store/compareList'

	const tabs = [{
		"name": "详细参数"
	}]

	const compareListStore = useCompareListStore()

	const {
		contentSpecList,
		headSpecList
	} = useSpecListStore()

	const detail = ref({})

	const currentIndex = ref(0)

	const param = {}

	function add() {
		compareListStore.add(detail.value)
	}

	function toCompare() {
		uni.switchTab({
			url: '/pages/compare/compareList'
		})
	}

	function toProduct() {
		uni.switchTab({
			url: '/pages/product/product'
		})
	}

	function swiperChange(e) {
		currentIndex.value = e.detail.current;
	}

	const pop = ref()
	const popupContent = ref('')

	function openPop(text) {
		popupContent.value = text
		pop.value.open()
	}

	apiGetSpecList()

	// // 分享给好友
	// onShareAppMessage(() => {
	// 	return {
	// 		title: "跑鞋相对论",
	// 		path: "/pages/home/home"
	// 	}
	// })

	onLoad((e) => {
		let {
			id = null, name = null
		} = e
		// id不存在时返回首页
		if (!id) {
			goToHome()
			return
		}
		param.id = id
		getOne()
		// 记一次view
		apiViewCount(param)
		uni.setNavigationBarTitle({
			title: name
		})
	})

	async function getOne() {
		let res = await apiGetOneDetail(param)
		detail.value = res.data
	}
</script>

<style lang="scss" scoped>
	.layout {
		position: relative;
		padding: 5rpx 15rpx 110rpx 15rpx;
	}

	.top {
		width: 100%;
		height: 420rpx;
		background: white;
		display: flex;
		border-radius: 20rpx;
	}

	.mySwiper {
		width: 60%;
		border-radius: 20rpx;
	}

	.head {
		margin-left: 15rpx;
		background: white;
		display: flex;
		flex-direction: column;
		width: 40%;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: 10rpx 0;
		gap: 20rpx;
		border-radius: 20rpx;
	}

	.box {
		// background: red;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.title {
		margin-bottom: 5rpx;
	}

	.text {
		font-weight: bold;
	}

	.content {
		// margin-bottom: 120rpx;
		background: white;
		border-radius: 0 0 20rpx 20rpx;
		// padding: 1rpx 0;
		overflow: hidden;
	}

	.line {
		margin: 30rpx 0;
		padding: 10rpx 20rpx;
		display: flex;

		.key {
			width: 40%;
			height: 100%;
			word-wrap: break-word;
			text-align: center;
		}

		.value {
			width: 60%;
			height: 100%;
			word-wrap: break-word;
			text-align: center;
		}
	}

	.fill {
		height: env(safe-area-inset-bottom);
		width: 100vw;
		// background: white;
	}

	.bottom-bar {
		position: fixed;
		left: 0;
		right: 0;
		bottom: env(safe-area-inset-bottom);
		display: flex;
		padding: 5rpx 20rpx;
		align-items: center;
		background: white;
	}

	.toFunction {
		width: 80rpx;
		height: 80rpx;
		display: flex;
		flex-direction: column;
		font-size: 12px;
		align-items: center;
		justify-content: center;
		margin: 0 10rpx;
		background: white;
	}

	.share {
		font-size: 10px;
		width: 80rpx;
		height: 80rpx;
		display: flex;
		flex-direction: column;
		text-decoration: none;
		text-align: center;
		line-height: 1;
		background: white;
		padding: 6rpx 0 0 0;
		margin: 0 10rpx 0 0;
		border-radius: 0;
	}

	.share-text {
		margin-top: 5rpx;
		font-size: 12px;
	}

	.addButton {
		width: 400rpx;
		background: $theme-color;
		color: $theme-font-color;
		border-radius: 50rpx;
		margin-right: 0;
	}

	.fillSafeArea {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: env(safe-area-inset-bottom);
		width: 100vw;
		background: white;
	}

	.pop-title {
		background: $theme-color;
		color: $theme-font-color;
		height: 80rpx;
		text-align: center;
		font-size: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 20rpx 20rpx 0 0;
	}

	.content-text {
		padding: 10rpx 30rpx;
		text-indent: 2em;
		line-height: 2;
		min-height: 500rpx;
	}

	button::after {
		border: none;
	}
</style>