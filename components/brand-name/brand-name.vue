<template>
	<view class="layout">
		<view class="line">
			<view class="text">{{item.brand}}</view>
			<view class="text-right">{{item.position}}</view>
		</view>

		<view class="text">{{item.name}}</view>
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

	.text-right {
		padding: 5rpx 0; 
		margin-left: 1em;
		width: fit-content;
		text-align: end;
		text-wrap: nowrap;
		font-weight: bold;
		// font-size: 14px;
		// background: blue;
	}
</style>