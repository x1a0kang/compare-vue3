<template>
	<view class="tabList">
		<view class="tab" v-for="(tab,index) in tabList" :class="activeTab === index ? 'tab-selected' : 'tab'"
			@click="onTab(index)">
			{{tab}}
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';

	const tabList = ["测试1", "测试2", "测试3"]

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
			height: 100rpx;
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
		}

		.tab-selected::before {
			content: '';
			position: absolute;
			left: -20rpx;
			bottom: 0;
			width: 20rpx;
			height: 100rpx;
			background: $theme-color; // 修改
			border-radius: 0 0 20rpx 0;
		}

		.tab-selected::after {
			content: '';
			position: absolute;
			right: -20rpx;
			bottom: 0;
			width: 20rpx;
			height: 100rpx;
			background: $theme-color; // 修改
			border-radius: 0 0 0 20rpx;
		}
	}
</style>