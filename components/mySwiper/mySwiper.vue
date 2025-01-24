<template>
	<view class="box">
		<swiper class="swiper" :current="currentIndex" circular @change="swiperChange" :autoplay="autoplay">
			<swiper-item class="swiper-item" v-for="url in imageList">
				<image class="image" :src="url" mode="aspectFit"></image>
			</swiper-item>
		</swiper>

		<view class="count">{{currentIndex+1}} / {{imageList.length}}</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'

	defineProps({
		imageList: {
			type: Array,
			default: []
		},
		autoplay: {
			type: Boolean,
			default: false
		}
	})

	const currentIndex = ref(0)
	const imageCount = ref(0)

	// imageCount.value = imageList.length

	function swiperChange(e) {
		currentIndex.value = e.detail.current;
	}
</script>

<style lang="scss" scoped>
	.box {
		padding-top: 10rpx;
		height: 100%;
		position: relative;
		background: white;
		border-radius: 20rpx;
	}

	.swiper {
		height: 100%;
	}

	.swiper-item {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.image {
		height: 100%;
	}

	.count {
		position: absolute;
		bottom: 10rpx;
		right: 10rpx;
		width: fit-content;
		background: rgba(0, 0, 0, 0.1);
		font-size: 12px;
		border-radius: 40rpx;
		padding: 8rpx 20rpx;
		backdrop-filter: blur(10rpx);
	}
</style>