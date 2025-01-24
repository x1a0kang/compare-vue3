<template>
	<view class="tabList">
		<view class="tab" v-for="(item,index) in arrs" :class="activeTab === index ? 'tab-selected' : 'tab'"
			@click="onTab(index)">
			{{item.name}}
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';

	defineProps({
		arrs: {
			type: Array,
			default: {}
		}
	})

	let activeTab = ref(0)

	function onTab(index) {
		activeTab.value = index
	}
</script>

<style lang="scss" scoped>
	.tabList {
		display: flex;
		margin-top: 30rpx;
		background: $theme-color;
		color: white;
		border-radius: 20rpx 20rpx 0 0;
		font-size: 20px;
		overflow: hidden;
		// gap: 20rpx;

		.tab {
			padding: 10rpx 30rpx;
			// border-radius: 20rpx 20rpx 0 0;
			height: 80rpx;
			display: flex;
			align-items: center;
			position: relative;
			// background-color: blue;
		}

		.tab-selected {
			background: white;
			color: black;
			display: flex;
			border-radius: 20rpx 20rpx 0 0;
			box-shadow: 20rpx 20rpx 0 0 #fff, -20rpx 20rpx 0 0 #fff;
			text-decoration: underline;
			text-decoration-color: $theme-color;
			text-underline-offset: 15rpx;
		}

		.tab-selected::before {
			content: '';
			position: absolute;
			left: -20rpx;
			bottom: 0;
			width: 20rpx;
			height: 100%;
			background: $theme-color; // 修改
			border-radius: 0 0 20rpx 0;
		}

		.tab-selected::after {
			content: '';
			position: absolute;
			right: -20rpx;
			bottom: 0;
			width: 20rpx;
			height: 100%;
			background: $theme-color; // 修改
			border-radius: 0 0 0 20rpx;
		}
	}
</style>