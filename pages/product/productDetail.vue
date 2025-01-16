<template>
	<view class="layout pageBg">
		<swiper class="swiper" :current="currentIndex" circular @change="swiperChange">
			<swiper-item class="swiper-item" v-for="url in detail.imageList">
				<image :src="url" mode="aspectFill"></image>
			</swiper-item>
		</swiper>

		<view class="count">{{currentIndex+1}} / {{imageCount}}</view>

		<view class="content">
			<view class="line" v-for="spec in specList.value">
				<view class="key"> {{spec.text}} ：</view>
				<view class="value">
					{{detail[spec.value]}}
				</view>
			</view>
		</view>

		<view class="bottom-bar">
			<view class="toFunction" @click="toProduct()">
				<uni-icons type="shop"></uni-icons>
				产品列表
			</view>
			<view class="toFunction" @click="toCompare()">
				<uni-icons type="list"></uni-icons>
				对比列表
			</view>
			<button class="addButton" @click="add()">
				加入对比
			</button>
			<view class="safe-area-inset-bottom"></view>
		</view>
	</view>
</template>

<script setup>
	import {
		useSpecListStore
	} from '@/store/specList'
	import {
		apiGetSpecList,
		apiGetOne
	} from '@/api/api.js'
	import {
		addToCompare,
		goToHome
	} from '@/utils/function.js'
	import {
		ref
	} from 'vue'
	import {
		onLoad
	} from "@dcloudio/uni-app"

	const {
		specList
	} = useSpecListStore()
	const detail = ref({})

	const currentIndex = ref(0)
	const imageCount = ref(0)
	const param = {}

	function add() {
		addToCompare(detail.value)
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

	apiGetSpecList()

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
		uni.setNavigationBarTitle({
			title: name
		})
	})

	async function getOne() {
		let res = await apiGetOne(param)
		detail.value = res.data
		imageCount.value = detail.value.imageList.length
	}
</script>

<style lang="scss" scoped>
	.layout {
		position: relative;
	}

	.swiper {
		height: 450rpx;
	}

	.swiper-item {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.count {
		position: absolute;
		top: 400rpx;
		right: 20rpx;
		width: fit-content;
		background: rgba(0, 0, 0, 0.1);
		font-size: 24rpx;
		border-radius: 40rpx;
		padding: 8rpx 20rpx;
		backdrop-filter: blur(10rpx);
	}

	.content {
		margin: 20rpx 20rpx;
		border-top: 1rpx solid #000;
		
		.line {
			padding: 10rpx 10rpx;
			margin: 20rpx 0;
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
				margin: 0 20rpx;
				word-wrap: break-word;
				text-align: center;
			}
		}
	}

	.bottom-bar {
		position: fixed;
		left: 0;
		right: 0;
		bottom: env(safe-area-inset-bottom);
		display: flex;
		padding: 5rpx 20rpx;
		align-items: center;
		background: rgb(255, 255, 255);

		.toFunction {
			width: 80rpx;
			height: 80rpx;
			display: flex;
			flex-direction: column;
			font-size: 20rpx;
			align-items: center;
			justify-content: center;
			margin: 0 15rpx;
		}

		.addButton {
			width: 460rpx;
			background: linear-gradient(90deg, #ebb8e9, #bbebea, #d1ebaa);
			color: black;
			border-radius: 50rpx;
			margin-right: 0;
		}

		// .toCompareList {
		// 	width: 310rpx;
		// 	margin: 0 0;
		// 	background-color: #0053B8;
		// 	color: white;
		// 	border-radius: 0 50rpx 50rpx 0;
		// }
	}
</style>