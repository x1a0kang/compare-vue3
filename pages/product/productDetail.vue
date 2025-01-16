<template>
	<view class="layout pageBg">
		<swiper class="swiper" :current="currentIndex" circular @change="swiperChange">
			<swiper-item class="swiper-item" v-for="url in detail.imageList">
				<image :src="url" mode="aspectFill"></image>
			</swiper-item>
		</swiper>

		<view class="count">{{currentIndex+1}} / {{imageCount}}</view>

		<view class="name">{{detail.brand}} {{detail.name}}</view>
		<view class="line" v-for="spec in specList.value">
			<view class="key"> {{spec.text}} ：</view>
			<view class="value">
				{{detail[spec.value]}}
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
		addToCompare
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
			id = null
		} = e
		param.id = id
		getOne()
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

	.name {
		margin: 20rpx 10rpx;
		padding: 10rpx 10rpx;
		font-size: 40rpx;
		font-weight: bold;
		border-bottom: 1rpx solid #000;
	}

	.line {
		padding: 10rpx 10rpx;
		margin: 20rpx 10rpx;
		display: flex;

		.key {
			width: 30%;
			height: 100%;
			word-wrap: break-word;
		}

		.value {
			width: 70%;
			height: 100%;
			margin: 0 20rpx;
			word-wrap: break-word;
		}
	}

	.bottom-bar {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
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