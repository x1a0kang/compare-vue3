<template>
	<view class="layout">
		<view class="navbar">
			<view class="statusBar" :style="{height:getStatusBarHeight()+'px'}"> </view>
			<view class="title-bar" :style="{height:getTitleBarHeight()+'px'}">
				<view class="title">{{title}}</view>
				<navigator class="search" url="/pages/search/search">
					<uni-icons class="icon" type="search" color="#888" size="18"></uni-icons>
					<text class="text">搜索</text>
				</navigator>
			</view>
		</view>

		<view class="fill" :style="{height:getNavBarHeight()+'px'}"></view>
	</view>
</template>

<script setup>
	import {
		getNavBarHeight,
		getStatusBarHeight,
		getTitleBarHeight
	} from "@/utils/system"

	defineProps({
		title: {
			type: String,
			default: ""
		}
	})
</script>

<style lang="scss" scoped>
	.fill {
		background-color: $theme-color;
	}

	.navbar {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 10;
		background: $theme-color;

		.statusBar {}

		.title-bar {
			background: $theme-color;
			display: flex;
			align-items: center;
			padding: 0 30rpx;

			.title {
				font-size: 22px;
				font-weight: 700;
				color: $theme-font-color;
			}

			.search {
				width: 350rpx;
				height: 50rpx;
				border-radius: 60rpx;
				background: rgba(255, 255, 255, 0.9);
				border: 1px solid #000;
				margin-left: 40rpx;
				color: #888;
				font-size: 28rpx;
				display: flex;
				align-items: center;

				.icon {
					margin-left: 5rpx;
				}

				.text {
					padding-left: 10rpx;

				}
			}
		}
	}
</style>