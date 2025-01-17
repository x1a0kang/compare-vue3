<template>
	<view class="layout">
		<view class="column" v-for="item in compareList" :key="item.productId">
			<view class="head">{{item.brand}} {{item.name}}</view>

			<view class="swiper">
				<mySwiper :imageList="item.imageList"></mySwiper>
			</view>

			<view class="spec" v-for="spec in specList.value">
				<view class="key">{{spec.text}}</view>
				<view class="value">{{item[spec.value]}}</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		useSpecListStore
	} from '@/store/specList'
	import {
		useCompareListStore
	} from '@/store/compareList'
	import {
		apiGetSpecList
	} from '@/api/api.js'

	const {
		compareList
	} = useCompareListStore()
	const {
		specList
	} = useSpecListStore()

	apiGetSpecList()
</script>

<style lang="scss" scoped>
	.layout {
		display: flex;
	}

	.column {
		display: flex;
		flex-direction: column;
		margin: 0 10rpx;
	}

	.head {
		text-align: center;
		font-size: 22px;
		font-weight: bold;
		margin-top: 20rpx;
		// background-color: red;
	}

	.swiper {
		height: 240rpx;
		width: 300rpx;
	}

	.spec {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 20rpx 0;
	}

	.key {
		margin-bottom: 20rpx;
	}

	.value {
		font-weight: bold;
	}
</style>