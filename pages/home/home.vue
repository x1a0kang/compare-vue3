<template>
	<view class="home pageBg">
		<custom-nav-bar title="主页"></custom-nav-bar>

		<!-- 滚动页面，广告位 -->
		<view class="banner">
			<mySwiper :imageList="imageList" :autoplay="true"></mySwiper>
		</view>

		<view class="brand">
			<brand></brand>
		</view>

		<view class="product">
			<view class="hotProduct shadow">
				<view class="title">
					<view class="text">热门单品</view>
					<view class="more">更多</view>
				</view>
				<view class="line" v-for="item in hotProductList" :key="item.productId">
					<productPreviewSmall :item="item"></productPreviewSmall>
				</view>
			</view>

			<view class="newProduct shadow">
				<view class="title">
					<view class="text">新品上市</view>
					<view class="more">更多</view>
				</view>
				<view class="line" v-for="item in newProductList" :key="item.productId">
					<productPreviewSmall :item="item"></productPreviewSmall>
				</view>
			</view>
		</view>

		<view class="categories">
			<tabList :arrs="categories"></tabList>
		</view>

	</view>
</template>

<script setup>
	import {
		reactive,
		ref
	} from "vue";
	import {
		apiGetSpecList,
		apiSearchByFilter,
		apiCategories
	} from "@/api/api.js"

	let categories = []

	async function getCategories() {
		let res = await apiCategories()
		categories = res.data
		console.log("categories", categories)
	}

	const imageList = reactive([
		"https://www.nikon.com.cn/tmp/CN/4016499630/3760176746/3015334490/1708048789/1863000998/1666314630/3477152822.png",
		"https://www.nikon.com.cn/tmp/CN/4016499630/3760176746/3015334490/1708048789/2040840204/1666314630/3477152822.png",
		"https://www.nikon.com.cn/tmp/CN/4016499630/3760176746/3015334490/1708048789/602730056/2271516755/3477152822.png"
	])

	// 选择的过滤条件
	let param = {
		page: 1,
		pageSize: 3,
		key: ["brand"],
		value: ["佳能"],
	}

	const hotProductList = ref([])
	const newProductList = ref([])

	async function searchByFilter() {
		// console.log("调用接口参数", conditionList)
		let res = await apiSearchByFilter(param)
		hotProductList.value = res.data

		param.value = ["索尼"]
		res = await apiSearchByFilter(param)
		newProductList.value = res.data
	}

	apiGetSpecList()
	searchByFilter()
	getCategories()
</script>

<style lang="scss" scoped>
	.banner {
		height: 400rpx;
		// background-color: red;
	}

	.brand {
		border-radius: 20rpx;
		// background: $theme-color;
		// color: white;
	}

	.product {
		margin-top: 15rpx;
		padding: 0 15rpx;
		display: flex;
		gap: 14rpx;
	}

	.hotProduct {
		border-radius: 20rpx;
		width: calc(50% - 7rpx);
		background: white;
	}

	.newProduct {
		border-radius: 20rpx;
		width: calc(50% - 7rpx);
		background: white;
	}

	.line {
		display: flex;
		height: 100rpx;
		margin: 5rpx 0;
		// background-color: red;
	}

	.title {
		background-color: $theme-color;
		color: white;
		padding: 10rpx 10rpx 10rpx 20rpx;
		// font-size: 20px;
		border-radius: 20rpx 20rpx 0 0;
		display: flex;
		align-items: center;
	}

	.text {
		font-size: 20px;
		width: 80%;
	}

	.more {
		font-size: 14px;
	}
</style>