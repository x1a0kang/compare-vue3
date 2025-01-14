<template>
	<swiper class="swiper" indicator-dots indicator-color='#000' indicator-active-color="#f00" circular>
		<swiper-item class="swiper-item" v-for="ss in detail.value.imageList">
			<image :src="ss" mode="aspectFill"></image>
		</swiper-item>
	</swiper>

	<view class="name">{{detail.value.name}}</view>
	<hr>
	<view class="line" v-for="spec in specList.value">
		<view class="key"> {{spec.text}} ：</view>
		<view class="value">
			{{detail.value[spec.value]}}dfaghfaddddddddddddddddddddddddddddddddddddddddddddddd
		</view>
	</view>

	<addToCompareButton :item="detail.value"></addToCompareButton>
</template>

<script setup>
	import {
		useSpecListStore
	} from '@/store/specList'
	import {
		apiGetSpecList
	} from '@/api/api.js'
	import {
		useDetailStore
	} from '@/store/detail'

	const {
		specList
	} = useSpecListStore()
	const {
		detail
	} = useDetailStore()

	apiGetSpecList()
	console.log("specList", specList)
</script>

<style lang="scss" scoped>
	.swiper {
		height: 450rpx;
	}

	.swiper-item {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.name {
		padding: 0 20rpx;
		font-size: 40rpx;
		font-weight: bold;
	}

	.line {
		padding: 0 20rpx;
		margin: 20rpx 0;
		display: flex;
		
		.key{
			width: 30%;
			height: 100%;
		}
		.value{
			width: 70%;
			height: 100%;
			margin: 0 20rpx;
		}
	}
</style>