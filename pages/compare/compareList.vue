<template>
	<!-- <custom-nav-bar title="对比"></custom-nav-bar> -->
	<view class="line" v-for="item in compareList" :key="item.productId">
		<productPreview :item="item"></productPreview>
		<button class="delete" @click="deleteOne(item)">删除</button>
	</view>

	<view class="bottom">
		<button class="deleteAll" @click="deleteAll()">清空</button>
		<button class="compareAll" @click="compareAll()">对比</button>
	</view>
</template>

<script setup>
	import {
		useCompareListStore
	} from '@/store/compareList'

	const {
		compareList
	} = useCompareListStore()

	function deleteOne(item) {
		console.log("删除", item.name)
		const index = compareList.findIndex(
			function(temp) {
				return temp.productId === item.productId
			}
		)
		if (index != -1) {
			compareList.splice(index, 1)
		}
	}

	function deleteAll() {
		compareList.length = 0
		console.log("清空本地缓存")
	}

	function compareAll() {
		if (compareList.length > 1) {
			uni.navigateTo({
				url: "/pages/compare/compare"
			})
		} else {
			console.log("小于一件无法对比")
		}
	}
</script>

<style lang="scss" scoped>
	.line {
		display: flex;
		align-items: center;
		justify-content: center;

		.delete {
			display: flex;
			align-items: center;
			height: 80rpx;
		}
	}

	.bottom {
		display: flex;
		margin-top: 100rpx;

		.deleteAll {}

		.compareAll {}
	}
</style>