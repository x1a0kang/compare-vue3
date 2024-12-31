<template>
	<view class="content">
		<swiper class="swiper" indicator-dots indicator-color="#007aff" indicator-active-color="#000" circular>
			<swiper-item class="grid-content" v-for="list in arrs">
				<view class="box" @click="jump(brand)" v-for="brand in list">
					<image class="image" src="../../static/pikachu.jpg"></image>
					<br />
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
		uni.setStorageSync('filterValue', brand.chinese)
		uni.switchTab({
			url: '/pages/product/product'
		});
	}

	getBrandSplit()
</script>

<style lang="scss" scoped>
	.grid-content {
		display: grid;
		gap: 15rpx;
		grid-template-columns: repeat(4, 1fr);
	}

	.image {
		width: 150rpx;
		height: 80rpx;
	}

	.text {
		text-align: center;
	}
</style>