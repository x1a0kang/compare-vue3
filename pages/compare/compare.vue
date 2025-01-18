<template>
	<view class="layout pageBg">
		<view class="column" v-for="item in compareTempList" :key="item.productId">
			<view class="head shadow">
				<view class="title">
					{{item.brand}} {{item.name}}
					<view class="icon" @click="deleteTemp(item.productId)">
						<uni-icons type="closeempty" color="#fff"></uni-icons>
					</view>
				</view>

				<view class="swiper">
					<mySwiper :imageList="item.imageList"></mySwiper>
				</view>
			</view>

			<view class="spec ">
				<view class="pair" v-for="spec in specList.value">
					<view class="key">{{spec.text}}</view>
					<view class="value">{{item[spec.value]}}</view>
				</view>

				<view class="pair" v-for="spec in specList.value">
					<view class="key">{{spec.text}}</view>
					<view class="value">{{item[spec.value]}}</view>
				</view>

				<view class="pair" v-for="spec in specList.value">
					<view class="key">{{spec.text}}</view>
					<view class="value">{{item[spec.value]}}</view>
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
		overflow-y: auto;
		padding: 10rpx 0 10rpx 0rpx;
		min-height: 100vh;
	}

	.column {
		display: flex;
		flex-direction: column;
		margin: 0 10rpx;
		max-height: max-content;
	}

	.head {
		border-radius: 20rpx;
		// padding: 10rpx 0;
	}

	.title {
		// text-align: center;
		font-size: 22px;
		font-weight: bold;
		color: white;
		border-radius: 20rpx;
		background: #010101;
		padding: 10rpx 30rpx;
		position: relative;

		.icon {
			position: absolute;
			top: 5rpx;
			right: 5rpx;
		}
	}

	.swiper {
		height: 240rpx;
		width: 280rpx;
		background: #fff;
		border-radius: 20rpx;
	}

	.spec {
		margin-top: 10rpx;
		background: #fff;
		border-radius: 20rpx;
		padding-top: 20rpx;
	}

	.pair {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 40rpx;
	}

	.key {
		margin-bottom: 10rpx;
	}

	.value {
		font-weight: bold;
	}
</style>