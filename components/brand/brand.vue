<template>
	<view class="content">

		<!-- <swiper class="swiper" circular indicator-dots indicator-color="rgba(0, 0, 0, 0.3)"
			indicator-active-color="#000"> -->

		<swiper class="swiper">

			<swiper-item class="grid-content" v-for="(list,index) in arrs" :key="index">

				<view class="box" @click="jump(brand)" v-for="brand in list" :key="brand.chinese">

					<image class="image" mode="aspectFit" :src="brand.icon">
					</image>

					<view class="text">{{brand.chinese}}</view>

				</view>

			</swiper-item>

		</swiper>

	</view>

</template>

<script setup>
	import {
		ref
	} from 'vue';
	import {
		apiGetBrandSplit
	} from "@/api/api.js"
	let arrs = ref([])

	async function getBrandSplit() {
		let res = await apiGetBrandSplit()
		arrs.value = res.data
	}

	function jump(brand) {
		uni.setStorageSync('filterKey', 'brand')
		uni.setStorageSync('filterKeyText', '品牌')
		uni.setStorageSync('filterValue', brand.chinese)
		uni.setStorageSync('filterValueText', brand.chinese)
		uni.switchTab({
			url: '/pages/product/product'
		});
	}

	getBrandSplit()
</script>

<style lang="scss" scoped>
	.content {
		margin-top: 20rpx;
	}

	.swiper {
		height: 300rpx;
		// background-color: blue;
	}

	.grid-content {
		display: grid;
		gap: 10rpx;
		grid-template-columns: repeat(5, 1fr);
		// padding: 0 10rpx;
	}

	.box {
		display: flex;
		flex-direction: column;
		align-items: center;
		// justify-content: center;
		background: white;
		height: fit-content;
		color: black;
		padding: 10rpx 0;
		border-radius: 20rpx;
	}

	.image {
		height: 80rpx;
		width: 100%;
		// background-color: blue;
	}

	.text {
		margin-top: 5rpx;
		text-align: center;
	}
</style>