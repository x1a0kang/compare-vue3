<template>
	<view class="content" @click="jump(item)">
		<image class="image"
			src="https://www.nikon.com.cn/tmp/CN/4016499630/3760176746/3015334490/1708048789/2040840204/1666314630/3477152822.png">
		</image>
		<view class="col">
			<view class="text">{{item.brand}}</view>
			<view class="text">{{item.name}}</view>
			<view class="text">{{item.publishDate}}</view>
		</view>
	</view>
</template>

<script setup>
	import {
		useDetailStore
	} from '@/store/detail'

	const {
		detail
	} = useDetailStore()

	defineProps({
		item: {
			type: Object,
			default: {}
		}
	})

	function jump(item) {
		detail.value = item
		uni.navigateTo({
			url: '/pages/product/productDetail'
		});
		console.log("跳转到详情页", item.name)
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		height: 200rpx;
		align-items: center;

		.image {
			margin-left: 30rpx;
			height: 200rpx;
			width: 200rpx;
		}

		.text {
			margin-left: 50rpx;
		}
	}
</style>