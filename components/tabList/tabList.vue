<template>
	<view class="tabList">
		<view class="tab" v-for="(item,index) in arrs" :key="item.name"
			:class="activeTab === index ? 'tab-selected' : 'tab'" @click="onTab(index)">
			{{item.name}}
		</view>

		<view v-if="showMore" class="more" @click="more">全部分类</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';

	const props = defineProps({
		arrs: {
			type: Array,
			default: {}
		},
		change: {
			type: Function
		},
		more: {
			type: Function
		},
		showMore: {
			type: Boolean,
			default: false
		}
	})

	let activeTab = ref(0)

	function onTab(index) {
		activeTab.value = index
		if(props.change === undefined) {
			return
		}
		props.change(index)
	}
</script>

<style lang="scss" scoped>
	.tabList::-webkit-scrollbar {
		display: none;
	}

	.tabList {
		display: flex;
		margin-top: 15rpx;
		height: 80rpx;
		background: $theme-color;
		color: white;
		border-radius: 20rpx 20rpx 0 0;
		font-size: 20px;
		overflow: hidden;
		overflow-x: scroll;

		.tab {
			padding: 10rpx 30rpx;
			height: 100%;
			display: flex;
			text-align: center;
			align-items: center;
			position: relative;
			text-wrap: nowrap;
			min-width: fit-content;
		}

		.tab-selected {
			background: white;
			color: black;
			display: flex;
			border-radius: 20rpx 20rpx 0 0;
			box-shadow: 20rpx 20rpx 0 0 #fff, -20rpx 20rpx 0 0 #fff;
			text-decoration: underline;
			text-decoration-color: $theme-color;
			text-underline-offset: 20rpx;
		}

		.tab-selected::before {
			content: '';
			position: absolute;
			left: -21rpx;
			bottom: 0;
			width: 21rpx;
			height: 100%;
			background: $theme-color; // 修改
			border-radius: 0 0 20rpx 0;
		}

		.tab-selected::after {
			content: '';
			position: absolute;
			right: -21rpx;
			bottom: 0;
			width: 21rpx;
			height: 100%;
			background: $theme-color; // 修改
			border-radius: 0 0 0 20rpx;
		}

		.more {
			height: 80rpx;
			min-width: fit-content;
			font-size: 16px;
			text-align: center;
			display: flex;
			align-items: center;
			padding: 0 20rpx;
			text-wrap: nowrap;
			// background-color: red;
		}
	}
</style>