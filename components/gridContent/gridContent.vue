<template>
	<!-- 产品内容 -->
	<view class="content">
		<view class="box shadow" v-for="item in arrs" :key="item.productId">
			<view class="jump-button" @click="jump(item)">
				<image class="image" :src="item.imageList[0]" mode="aspectFill"></image>

				<view class="text">{{item.brand}} {{item.name}}</view>
				<view class="position">{{item.position}}</view>

				<view class="scenarioList">
					<view class="scenario" v-for="scenario in item.scenarioList" :key="scenario">
						{{scenario}}
					</view>
				</view>
			</view>

			<view class="add-button">
				<addToCompareButton :item="item"></addToCompareButton>
			</view>
		</view>
	</view>
</template>

<script setup>
	defineProps({
		arrs: {
			type: Array,
			default: []
		}
	})

	import {
		useCompareListStore
	} from '@/store/compareList'

	const compareListStore = useCompareListStore()

	function jump(item) {
		uni.navigateTo({
			url: '/pages/product/productDetail?id=' + item.productId + '&name=' + item.name
		});
		console.log("跳转到详情页", item.name, item.productId)
	}

	function add(item) {
		compareListStore.add(item)
	}
</script>

<style lang="scss" scoped>
	.content {
		display: grid;
		gap: 10rpx;
		grid-template-columns: repeat(2, 1fr);
		// background-color: red;

		.box {
			border-radius: 20rpx;
			overflow: hidden;
			position: relative;
			padding-bottom: 5rpx;
			background-color: white;
		}

		.jump-button {
			height: 100%;
		}

		.image {
			width: 100%;
			height: 350rpx;
		}

		.text {
			padding: 5rpx 10rpx 5rpx 20rpx;
			width: 100%;
			overflow: hidden;
			text-overflow: ellipsis;
			text-wrap: nowrap;
		}

		.scenarioList {
			padding: 5rpx 10rpx 5rpx 10rpx;
			width: 90%;
			display: flex;
			gap: 5rpx;
			flex-wrap: wrap;
			// background: red;
		}

		.scenario {
			width: fit-content;
			background: $theme-color;
			color: white;
			border-radius: 50rpx;
			font-size: 14px;
			padding: 5rpx 15rpx;
		}

		.position {
			position: absolute;
			top: 8rpx;
			right: 10rpx;
			background: $theme-color;
			color: white;
			border-radius: 50rpx;
			padding: 5rpx 20rpx;
			text-align: center;
		}

		.add-button {
			position: absolute;
			bottom: 5rpx;
			right: 5rpx;
		}
	}
</style>