<template>
	<view class="content">
		<view class="box" @click="jump(item)" v-for="item in arrs" :key="item.name">
			<image class="image" :src="item.coverUrl" mode="aspectFill"></image>
			<view class="mask">{{item.name}}</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from "vue"
	import {
		apiHotCategories
	} from "@/api/api.js"

	const arrs = ref([])

	async function getHotCategories() {
		let res = await apiHotCategories()
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

	getHotCategories()
</script>

<style lang="scss" scoped>
	.content {
		display: grid;
		gap: 10rpx;
		grid-template-columns: repeat(2, 1fr);

		.box {
			width: 100%;

			.image {
				width: 100%;
				height: 260rpx;
			}

			.mask {
				margin-left: 150rpx;
			}
		}
	}
</style>