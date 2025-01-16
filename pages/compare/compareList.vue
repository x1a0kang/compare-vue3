<template>
	<view class="layout pageBg">
		<custom-nav-bar title="对比"></custom-nav-bar>
		<view class="line" v-for="item in compareList" :key="item.productId">
			<productPreview :item="item"></productPreview>
			<button class="delete" @click="deleteOne(item)">删除</button>
		</view>

		<view class="bottom">
			<button class="deleteAll" @click="deleteAll()">清空</button>
			<button class="compareAll" @click="compareAll()">对比</button>
		</view>
	</view>
</template>

<script setup>
	import {
		storeToRefs
	} from 'pinia'
	import {
		useCompareListStore
	} from '@/store/compareList'

	const compareListStore = useCompareListStore()

	const {
		compareList
	} = compareListStore

	function deleteOne(item) {
		compareListStore.remove(item)
	}

	function deleteAll() {
		compareListStore.removeAll()
	}

	function compareAll() {
		if (compareList.length > 1) {
			uni.navigateTo({
				url: "/pages/compare/compare"
			})
		} else {
			uni.showToast({
				title: "小于两件产品"
			})
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
		position: fixed;
		bottom: var(--window-bottom);

		.deleteAll {}

		.compareAll {}
	}
</style>