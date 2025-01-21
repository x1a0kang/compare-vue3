<template>
	<!-- 产品内容 -->
	<view class="content">
		<view class="box shadow" v-for="item in arrs" :key="item.productId">
			<view class="jump-button" @click="jump(item)">
				<image class="image"
					src="https://www.nikon.com.cn/tmp/CN/4016499630/3760176746/3015334490/1708048789/1863000998/1666314630/3477152822.png"
					mode="aspectFill"></image>
				<br />
				<view class="mask">{{item.brand}} {{item.name}}</view>
				<view class="mask">{{item.price}}元</view>
			</view>
			<view class="add-button" @click="add(item)">
				<uni-icons type="plus" color="#fff"></uni-icons>
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
		console.log("跳转到详情页", item.name)
	}

	function add(item) {
		compareListStore.add(item)
	}
</script>

<style lang="scss" scoped>
	.content {
		margin-top: 10rpx;
		padding: 0 15rpx;
		display: grid;
		gap: 15rpx;
		grid-template-columns: repeat(2, 1fr);
		// background-color: red;

		.box {
			border-radius: 10rpx;
			overflow: hidden;
			position: relative;
			padding: 5rpx;
			// background-color: yellow;

			.jump-button {
				height: 100%;
			}

			.image {
				width: 100%;
				height: 300rpx;
				// background-color: red;
			}

			.mask {
				padding: 5rpx 5rpx 5rpx 20rpx;
				width: 80%;
				// text-align: center;
				// background-color: blue;
			}

			.add-button {
				width: 50rpx;
				height: 50rpx;
				position: absolute;
				bottom: 5rpx;
				right: 5rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				background: $theme-color;
				border-radius: 10rpx;
			}
		}
	}
</style>