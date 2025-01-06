<template>
	<swiper class="swiper" indicator-dots indicator-color='#000' indicator-active-color="#f00" circular>
		<swiper-item class="swiper-item" v-for="ss in detail.value.imageList">
			<image :src="ss" mode="aspectFill"></image>
		</swiper-item>
	</swiper>

	<view class="name">{{detail.value.name}}</view>
	<view class="line" v-for="spec in specList.value">
		<view> {{spec.text}} </view>
		<view>
			{{detail.value[spec.value]}}
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
		font-size: 40rpx;
		font-weight: bold;
	}

	.line {
		margin-top: 20rpx;
		display: flex;
		gap: 20rpx;

	}
</style>