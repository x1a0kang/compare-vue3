<template>
	<view class="content" @click="jump(item)">
		<view class="box">
			<image class="image" mode="aspectFit" :src="item.imageList[0]">
			</image>
		</view>

		<view class="col">
			<view class="text">{{item.brand}} {{item.name}}</view>
			<!-- <view class="text">{{item.publishDateStr}}上市</view> -->
		</view>
	</view>
</template>

<script setup>
	defineProps({
		item: {
			type: Object,
			default: {}
		}
	})

	function jump(item) {
		uni.navigateTo({
			url: '/pages/product/productDetail?id=' + item.productId + '&name=' + item.name
		});
		console.log("跳转到详情页", item.name)
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		height: 100%;
		align-items: center;
		// background-color: red;

		.box {
			display: flex;
			height: 100%;
			width: 25%;
			margin-left: 10rpx;
			// background-color: red;
		}

		.image {
			height: 100%;
		}

		.col {
			display: flex;
			flex-direction: column;
			gap: 10rpx
		}

		.text {
			margin-left: 30rpx;
		}
	}
</style>