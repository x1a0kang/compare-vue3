<template>
	<view class="content" @click="jump(item)">
		<view class="box">
			<image class="image" mode="aspectFit"
				src="https://www.nikon.com.cn/tmp/CN/4016499630/3760176746/3015334490/1708048789/2040840204/1666314630/3477152822.png">
			</image>
		</view>

		<view class="col">
			<view class="text">{{item.brand}}</view>
			<view class="text">{{item.name}}</view>
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
		width: 100%;
		align-items: center;
		// background: red;

		.box {
			display: flex;
			height: 100%;
			width: 30%;
			margin-left: 10rpx;
			// background-color: red;
		}

		.image {
			height: 100%;
		}

		.text {
			margin: 5rpx 0 5rpx 40rpx;
		}
	}
</style>