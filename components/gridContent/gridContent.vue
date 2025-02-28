<template>
	<!-- 产品内容 -->
	<view class="content">
		<view class="box shadow" v-for="item in arrs" :key="item.productId">
			<view class="jump-button" @click="jump(item)">
				<image class="image" :src="item.imageList[0]" mode="aspectFill"></image>

				<view class="brand-name">
					<brand-name :item="item"></brand-name>
				</view>
				<view class="text">{{item.price}}元</view>
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

		.brand-name {
			padding: 0 20rpx;
		}

		.scenarioList {
			padding: 5rpx 15rpx;
		}
		
		.text {
			padding: 0 20rpx;
		}

		.add-button {
			position: absolute;
			bottom: 5rpx;
			right: 5rpx;
		}
	}
</style>