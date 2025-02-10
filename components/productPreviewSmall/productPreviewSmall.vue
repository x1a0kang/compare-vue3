<template>
	<view class="content" @click="jump(item)">
		<image class="image" mode="aspectFill" :src="item.imageList[0]">
		</image>

		<view class="text">{{item.brand}} {{item.name}}</view>
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
		width: 100%;
		align-items: center;
		background: red;

		.image {
			height: 100%;
			width: 100rpx;
			
		}

		.text {
			margin: 5rpx 0 5rpx 40rpx;
			background-color: blue;
		}
	}
</style>