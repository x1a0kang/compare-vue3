<template>
	<view class="layout pageBg">
		<swiper class="swiper" circular>
			<swiper-item class="swiper-item" v-for="ss in detail.value.imageList">
				<image :src="ss" mode="aspectFill"></image>
			</swiper-item>
		</swiper>

		<view class="name">{{detail.value.name}}</view>
		<view class="line" v-for="spec in specList.value">
			<view class="key"> {{spec.text}} ：</view>
			<view class="value">
				{{detail.value[spec.value]}}
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
		apiGetSpecList
	} from '@/api/api.js'
	import {
		addToCompare
	} from '@/utils/function.js'
	import {
		useDetailStore
	} from '@/store/detail'

	const {
		specList
	} = useSpecListStore()
	const {
		detail
	} = useDetailStore()

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

	apiGetSpecList()
</script>

<style lang="scss" scoped>
	.swiper {
		height: 450rpx;
	}

	.swiper-item {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.name {
		margin: 0 10rpx;
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