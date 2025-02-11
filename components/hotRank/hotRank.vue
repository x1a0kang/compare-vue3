<template>
	<view class="layout">
		<view class="head">
			<view class="title">热门跑鞋</view>
			<view class="right">
				<view class="update">{{updateTimeStr}}更新</view>
				<view class="more" @click="moreHotRank">更多</view>
			</view>
		</view>

		<view class="content">
			<view class="line" v-for="(item,index) in hotRankList" :key="item.productId" @click="jump(item)">
				<view class="num">{{index+ 1}} </view>

				<image class="image" mode="aspectFill" :src="item.imageList[0]">
				</image>

				<view class="text">{{item.brand}} {{item.name}}</view>

				<addToCompareButton :item="item"></addToCompareButton>
			</view>
		</view>

	</view>
</template>

<script setup>
	import {
		ref
	} from "vue";
	import {
		apiGetHotRank
	} from "@/api/api.js"
	import {
		useCompareListStore
	} from '@/store/compareList'
	import {
		AddOne
	} from '@icon-park/vue-next'

	const compareListStore = useCompareListStore()

	const hotRankList = ref([])
	const param = {
		"page": 1,
		"pageSize": 5
	}
	let updateTimeStr = ref("")

	async function getHotRank() {
		let res = await apiGetHotRank(param)
		// console.log("hotrank:", res.data)
		hotRankList.value = res.data
		updateTimeStr.value = hotRankList.value[0].hotUpdateTimeStr
	}

	function jump(item) {
		uni.navigateTo({
			url: '/pages/product/productDetail?id=' + item.productId + '&name=' + item.name
		});
		console.log("跳转到详情页", item.name)
	}

	function moreHotRank() {
		uni.navigateTo({
			url: "/pages/hotRankAll/hotRankAll"
		})
	}

	function add(item) {
		compareListStore.add(item)
	}

	getHotRank()
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

	.right {
		position: absolute;
		right: 30rpx;
		display: flex;
		align-items: center;
	}

	.update {
		font-size: 14px;
	}

	.more {
		margin-left: 30rpx;
		font-size: 14px;
	}

	.content {}

	.line {
		display: flex;
		height: 100rpx;
		align-items: center;
		background: white;
		padding: 0 30rpx;
		position: relative;
	}

	.num {
		// background: red;
		font-size: 20px;
		font-weight: bold;
		font-style: italic;
		width: 50rpx;
		text-align: center;
	}

	.image {
		margin-left: 50rpx;
		height: 100%;
		width: 100rpx;
	}

	.text {
		margin-left: 30rpx;
		text-align: center;
		// font-weight: bold;
		max-width: 380rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		text-wrap: nowrap;
		// background: blue;
	}

	.add-button {
		position: absolute;
		right: 30rpx;
	}
</style>