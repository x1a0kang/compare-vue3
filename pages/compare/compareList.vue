<template>
	<view class="layout pageBg">
		<custom-nav-bar title="对比"></custom-nav-bar>
		<view class="line shadow" v-for="item in compareList" :key="item.productId">
			<productPreview :item="item"></productPreview>
			<view class="delete" @click="deleteOne(item)">
				<uni-icons type="trash"></uni-icons>
			</view>
		</view>

		<view class="bottom">
			<view class="deleteAll" @click="deleteAll()">
				<uni-icons type="trash-filled"></uni-icons>
				清空
			</view>
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
		position: relative;
		background-color: white;
		margin: 20rpx 20rpx 0 20rpx;
		border-radius: 20rpx;

		.delete {
			position: absolute;
			display: flex;
			flex-direction: column;
			align-items: center;
			height: 50rpx;
			width: 50rpx;
			right: 20rpx;
			bottom: 20rpx;
			justify-content: center;
		}
	}

	.bottom {
		display: flex;
		position: fixed;
		left: 0;
		right: 0;
		bottom: var(--window-bottom);
		align-items: center;
		justify-content: center;

		.deleteAll {
			display: flex;
			flex-direction: column;
			width: 80rpx;
			height: 80rpx;
			align-items: center;
			justify-content: center;
			margin: 0 10rpx;
			// background: red;
		}

		.compareAll {
			width: 150rpx;
			margin-right: 0;
			background: #010101;
			// background: linear-gradient(90deg, #ebb8e9, #bbebea, #d1ebaa);
			border-radius: 10rpx;
			color: white;
		}
	}
</style>