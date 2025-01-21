<template>
	<view class="layout pageBg">
		<view class="head">
			<view v-for="item in compareTempList" :key="item.productId">
				<view class="title">
					<view>{{item.brand}} {{item.name}}</view>
					<view class="icon" @click="deleteTemp(item.productId)">
						<uni-icons type="closeempty" color="#fff"></uni-icons>
					</view>
				</view>
			</view>
		</view>

		<view class="image">
			<view v-for="item in compareTempList" :key="item.productId">
				<view class="swiper shadow">
					<mySwiper :imageList="item.imageList"></mySwiper>
				</view>
			</view>
		</view>

		<view class="content">
			<view class="row" v-for="spec in specList.value">
				<view v-for="item in compareTempList" :key="item.productId">
					<view class="pair">
						<view class="key">{{spec.text}}</view>
						<view class="value">{{item[spec.value]}}</view>
					</view>
				</view>
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
		apiGetSpecList,
		apiGetList
	} from '@/api/api.js'
	import {
		reactive
	} from 'vue'

	const {
		compareList
	} = useCompareListStore()
	const {
		specList
	} = useSpecListStore()
	const compareTempList = reactive([])

	async function getList() {
		let idList = []
		compareList.forEach((item) => {
			idList.push(item.productId)
		})

		let data = {}
		data.idList = idList
		let res = await apiGetList(data)
		compareTempList.push(...res.data)
	}

	function deleteTemp(id) {
		const index = compareTempList.findIndex(
			function(temp) {
				return temp.productId === id
			}
		)
		if (index != -1) {
			compareTempList.splice(index, 1)
		}
		console.log("compareTempList.length", compareTempList.length)
		if (compareTempList.length < 1) {
			uni.switchTab({
				url: "/pages/compare/compareList"
			})
		}
	}

	apiGetSpecList()
	getList()
</script>

<style lang="scss" scoped>
	.layout {
		display: flex;
		flex-direction: column;
		overflow-y: auto;
		padding: 10rpx 0 10rpx 10rpx;
		min-height: 100vh;
	}

	.head {
		display: flex;
		// background-color: red;
	}

	.title {
		height: 100%;
		width: 48vw;
		text-align: center;
		font-size: 22px;
		font-weight: bold;
		color: $theme-font-color;
		border-radius: 20rpx;
		background: $theme-color;
		padding: 20rpx 30rpx;
		position: relative;
		margin-right: 10rpx;
		display: flex;
		align-items: center;
		justify-content: center;

		.icon {
			position: absolute;
			top: -10rpx;
			right: 10rpx;
		}
	}

	.image {
		display: flex;
	}

	.swiper {
		width: 48vw;
		height: 200rpx;
		background: #fff;
		border-radius: 20rpx;
		margin-top: 20rpx;
		margin-right: 10rpx;
	}

	.content {
		margin-top: 10rpx;
	}

	.row {
		display: flex;
		margin-top: 30rpx;
		// background-color: red;
	}

	.pair {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-right: 10rpx;
		width: 48vw;
		height: 100%;
		// background-color: blue;
		text-align: center;
		padding: 20rpx 10rpx;
		background: #fff;
		border-radius: 20rpx;
	}

	.key {
		margin-bottom: 10rpx;
	}

	.value {
		font-weight: bold;
	}
</style>