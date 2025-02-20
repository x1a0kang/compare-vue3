<template>
	<view class="content">
		<view class="box shadow" @click="jump(item)" v-for="item in arrs" :key="item.name">
			<image class="image" :src="item.coverUrl" mode="aspectFill"></image>
			<view class="text">{{item.name}}</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from "vue"
	import {
		apiCategories
	} from "@/api/api.js"

	const arrs = ref([])

	async function getCategories() {
		let res = await apiCategories()
		arrs.value = res.data
	}

	function jump(item) {
		uni.setStorageSync('filterKey', item.key)
		uni.setStorageSync('filterKeyText', item.keyText)
		uni.setStorageSync('filterValue', item.value)
		uni.setStorageSync('filterValueText', item.valueText)
		uni.switchTab({
			url: '/pages/product/product'
		});
	}

	getCategories()
</script>

<style lang="scss" scoped>
	.content {
		display: grid;
		gap: 10rpx;
		grid-template-columns: repeat(2, 1fr);
		// margin: 10rpx 15rpx 10rpx 15rpx;
		padding: 10rpx 15rpx 10rpx 15rpx;

		.box {
			background-color: white;
			border-radius: 20rpx;
			padding-bottom: 10rpx;
		}

		.text {
			text-align: center;
			font-weight: bold;
		}

		.image {
			width: 100%;
			height: 350rpx;
			// background-color: red;
		}
	}
</style>