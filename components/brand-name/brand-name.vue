<template>
	<view class="layout">
		<view class="line">
			<view class="text">{{item.brand}}—{{item.position}}</view>
			<!-- <view class="text-right">{{item.position}}</view> -->
		</view>

		<view class="text">{{item.name}}</view>
		
		<view class="scenarioList">
			<view class="scenario" v-for="scenario in item.scenarioList" :key="scenario">
				{{scenario}}
			</view>
		</view>
	</view>
</template>

<script setup>
	defineProps({
		item: {
			type: Object,
			default: null
		}
	})
</script>

<style lang="scss" scoped>
	.line {
		display: flex;
		width: 100%;
		position: relative;
		// background: red;
	}

	.text {
		padding: 5rpx 0;
		width: fit-content;
		overflow: hidden;
		text-overflow: ellipsis;
		text-wrap: nowrap;
		// background: red;
	}

	// .text-right {
	// 	padding: 5rpx 0; 
	// 	// margin-left: 1em;
	// 	width: fit-content;
	// 	text-align: end;
	// 	text-wrap: nowrap;
	// 	font-weight: bold;
	// 	position: absolute;
	// 	right: 0;
	// 	// background: red;
	// }
	
	.scenarioList::-webkit-scrollbar {
		display: none;
	}
	
	.scenarioList {
		display: flex;
		gap: 5rpx;
		height: 50rpx;
		align-items: center;
		overflow: hidden;
		flex-wrap: nowrap;
		white-space: nowrap;
		overflow-x: scroll;
		// background: red;
	}
	
	.scenario {
		width: fit-content;
		height: fit-content;
		background: $theme-color;
		color: $theme-font-color;
		border-radius: 10rpx;
		font-size: 12px;
		padding: 3rpx 8rpx;
	}
</style>