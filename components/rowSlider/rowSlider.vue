<template>
	<view class="layout">
		<view class="head">
			<view class="title">新品上市</view>
			<view class="more" @click="more">更多</view>
		</view>

		<view class="content">
			<view class="box shadow" v-for="item in arrs" @click="jump(item)">
				<image class="image" mode="aspectFit" :src="item.imageList[0]">
				</image>

				<view class="text">{{item.brand}}</view>
				<view class="text">{{item.name}}</view>
			</view>
		</view>

	</view>
</template>

<script setup>
	import {
		ref
	} from "vue"
	import {
		apiSearchByFilter
	} from "@/api/api.js"

	// 产品列表
	const arrs = ref([])

	// 选择的过滤条件
	let param = {
		page: 1,
		pageSize: 5,
		orderKey: "publishDate",
		order: "-1"
	}

	async function searchByFilter() {
		let res = await apiSearchByFilter(param)
		arrs.value = res.data
	}
	
	function jump(item) {
		uni.navigateTo({
			url: '/pages/product/productDetail?id=' + item.productId + '&name=' + item.name
		});
		console.log("跳转到详情页", item.name)
	}

	function more() {
		uni.setStorageSync('orderKey', 'publishDate')
		uni.setStorageSync('order', '-1')
		uni.switchTab({
			url: '/pages/product/product'
		})
	}

	searchByFilter()
</script>

<style lang="scss" scoped>
	.layout {
		margin: 15rpx 15rpx 0 15rpx;
		border-radius: 20rpx;
		overflow: hidden;
		// background: red;
	}

	.head {
		background-color: $theme-color;
		color: white;
		padding: 15rpx 10rpx 15rpx 30rpx;
		// font-size: 20px;
		border-radius: 20rpx 20rpx 0 0;
		display: flex;
		align-items: center;
		position: relative;
	}

	.title {
		font-size: 20px;
	}

	.more {
		margin-left: 30rpx;
		font-size: 14px;
		position: absolute;
		right: 30rpx;
	}

	.content::-webkit-scrollbar {
		display: none;
	}

	.content {
		display: flex;
		background: white;
		gap: 10rpx;
		overflow-x: scroll;
	}

	.box {
		display: flex;
		flex-direction: column;
		margin-top: 10rpx;
		border-radius: 20rpx;
		padding-bottom: 10rpx;
	}

	.image {
		width: 200rpx;
		// width: 100%;
		height: 200rpx;
		border-radius: 20rpx;
	}

	.text {
		text-align: center;
	}
</style>