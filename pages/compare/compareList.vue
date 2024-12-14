<template>
	<custom-nav-bar title="对比"></custom-nav-bar>
	<view class="line" v-for="item in compareList" :key="item.productId">
		<image class="image"
			src="https://www.nikon.com.cn/tmp/CN/4016499630/3760176746/3015334490/1708048789/2040840204/1666314630/3477152822.png">
		</image>
		<view class="text">{{item.brand}} {{item.name}}</view>
		<button class="delete" @click="deleteOne(item)">删除</button>
	</view>
	<view class="bottom">
		<button class="deleteAll" @click="deleteAll()">清空</button>
		<button class="compareAll" @click="compareAll()">对比</button>
	</view>
</template>

<script setup>
	import {
		useCompareListStore
	} from '@/store/compareList'

	const {
		compareList
	} = useCompareListStore()

	function deleteOne(item) {
		console.log("删除", item.name)
		const index = compareList.findIndex(
			function(temp) {
				return temp.productId === item.productId
			}
		)
		if (index != -1) {
			compareList.splice(index, 1)
		}
	}

	function deleteAll() {
		compareList.length = 0
		console.log("清空本地缓存")
	}

	function compareAll() {
		if (compareList.length > 1) {
			uni.navigateTo({
				url: "/pages/compare/compare"
			})
		} else {
			console.log("小于一件无法对比")
		}
	}
</script>

<style lang="scss" scoped>
	.line {
		display: flex;
		height: 200rpx;
		align-items: center;

		.image {
			margin-left: 30rpx;
			height: 200rpx;
			width: 200rpx;
		}

		.text {
			margin-left: 50rpx;
		}

		.delete {
			margin-right: 20rpx;
		}
	}

	.bottom {
		display: flex;

		.deleteAll {}

		.compareAll {}
	}
</style>