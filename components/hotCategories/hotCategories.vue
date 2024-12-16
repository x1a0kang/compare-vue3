<template>
	<view class="content">
		<view class="box" @click="jump(item.filter)" v-for="item in arrs" :key="item.name">
			<image class="image" :src="item.coverUrl" mode="aspectFill"></image>
			<view class="mask">{{item.name}}</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from "vue"
	import {
		apiHotCategories
	} from "@/api/api.js"

	const arrs = ref([])

	async function getHotCategories() {
		let res = await apiHotCategories()
		console.log("res:", res)
		arrs.value = res.data
	}

	function jump(filter) {
		console.log("filter:", filter)
		// todo 字段过滤接口
	}

	getHotCategories()
</script>

<style lang="scss" scoped>
	.content {
		display: grid;
		gap: 10rpx;
		grid-template-columns: repeat(2, 1fr);

		.box {
			width: 100%;

			.image {
				width: 100%;
				height: 260rpx;
			}

			.mask {
				margin-left: 150rpx;
			}
		}
	}
</style>