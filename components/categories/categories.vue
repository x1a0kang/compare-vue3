<template>
	<view class="content">
		<view class="box" @click="jump(item)" v-for="item in arrs" :key="item.name">
			<view class="mask">{{item.name}}</view>
			<image class="image" :src="item.coverUrl" mode="aspectFill"></image>
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
		gap: 15rpx;
		grid-template-columns: repeat(2, 1fr);
		margin: 0 15rpx;

		.box {
			// background-color: red;
			border-radius: 20rpx;
		}

		.mask {
			padding-left: 30rpx;
			padding-top: 20rpx;
			font-weight: bold;
		}

		.image {
			width: 100%;
			height: 260rpx;
		}
	}
</style>