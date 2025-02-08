<template>
	<!-- 产品内容 -->
	<view class="content">
		<view class="box shadow" v-for="item in arrs" :key="item.productId">
			<view class="jump-button" @click="jump(item)">
				<image class="image"
					:src="item.imageList[0]"
					mode="aspectFill"></image>
				<br />
				<view class="mask">{{item.brand}} {{item.name}}</view>
				<view class="mask">{{item.price}}元</view>
			</view>
			<view class="add-button" @click="add(item)">
				<add-one theme="outline" size="20" fill="#fff" :strokeWidth="4" />
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
	import {
		AddOne,
	} from '@icon-park/vue-next'

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
			background-color: white;

			.jump-button {
				height: 100%;
			}

			.image {
				width: 100%;
				height: 350rpx;
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