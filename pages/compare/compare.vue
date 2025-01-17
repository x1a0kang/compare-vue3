<template>
	<view class="layout">
		<view class="column" v-for="item in compareTempList" :key="item.productId">
			<view class="head">
				{{item.brand}} {{item.name}}
				<view class="icon" @click="deleteTemp(item.productId)">
					<uni-icons type="closeempty"></uni-icons>
				</view>
			</view>

			<view class="swiper">
				<mySwiper :imageList="item.imageList"></mySwiper>
			</view>

			<view class="spec" v-for="spec in specList.value">
				<view class="key">{{spec.text}}</view>
				<view class="value">{{item[spec.value]}}</view>
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
	}

	.column {
		display: flex;
		flex-direction: column;
		margin-right: 20rpx;
		background:
			linear-gradient(to bottom, transparent, #fff 60vh),
			linear-gradient(to bottom, #ebe0eb, #dcebe9, #e0ebd5);
	}

	.head {
		text-align: center;
		font-size: 22px;
		font-weight: bold;
		margin-top: 30rpx;
		position: relative;

		.icon {
			position: absolute;
			top: 0;
			bottom: 0;
			right: 5rpx;
			margin: auto 0;
		}
	}

	.swiper {
		height: 240rpx;
		width: 280rpx;
	}

	.spec {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 20rpx 0;
	}

	.key {
		margin-bottom: 20rpx;
	}

	.value {
		font-weight: bold;
	}
</style>