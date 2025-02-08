<template>
	<view class="content" @click="jump(item)">
		<view class="box">
			<image class="image" mode="aspectFit" :src="item.imageList[0]">
			</image>
		</view>

		<view class="col">
			<view class="text">{{item.brand}}</view>
			<view class="text">{{item.name}}</view>
			<view class="text">{{item.publishDate}}</view>
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

		.text {
			margin: 10rpx 0 10rpx 40rpx;
		}
	}
</style>