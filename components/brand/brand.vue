<template>
	<view class="content">
		<swiper class="swiper" indicator-dots indicator-color="#007aff" indicator-active-color="#000" circular>
			<swiper-item class="grid-content" v-for="list in arrs">
				<view class="box" v-for="brand in list">
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
		apiGetBrand
	} from "@/api/api.js"

	let arrs = ref([])

	async function getBrand() {
		let res = await apiGetBrand()
		arrs.value = res.data
	}

	getBrand()
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