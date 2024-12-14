<template>
	<image
		src="https://www.nikon.com.cn/tmp/CN/4016499630/3760176746/3015334490/1708048789/1863000998/1666314630/3477152822.png"
		mode="aspectFill"></image>
	<view class="name">{{detail.value.name}}</view>
	<view class="line" v-for="spec in specList.value">
		<view> {{spec.chinese}} </view>
		<view>
			{{detail.value[spec.english]}}
		</view>
	</view>
</template>

<script setup>
	import {
		useSpecListStore
	} from '@/store/specList'
	import {
		useDetailStore
	} from '@/store/detail'

	const {
		specList
	} = useSpecListStore()
	const {
		detail
	} = useDetailStore()
</script>

<style lang="scss" scoped>
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