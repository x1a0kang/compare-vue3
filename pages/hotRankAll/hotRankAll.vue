<template>
	<view class="layout">
		<view class="head">
			<view class="title">热门跑鞋</view>
			<view class="update">{{updateTimeStr}}更新</view>
		</view>

		<view class="box shadow" v-for="(item,index) in hotRankList">
			<view class="num">{{index+ 1}} </view>

			<productPreview :item="item"></productPreview>

			<addToCompareButton :item="item"></addToCompareButton>
		</view>

		<!-- 加载更多 -->
		<view class="loadingLayout" v-show="hotRankList.length || noData">
			<uni-load-more :status="noData?'noMore':'loading'"></uni-load-more>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from "vue";
	import {
		apiGetHotRank
	} from "@/api/api.js"
	import {
		useCompareListStore
	} from '@/store/compareList'
	import {
		AddOne
	} from '@icon-park/vue-next'
	import {
		onReachBottom
	} from '@dcloudio/uni-app'

	const compareListStore = useCompareListStore()

	const hotRankList = ref([])
	const param = {
		"page": 1,
		"pageSize": 10
	}
	const noData = ref(false)
	let updateTimeStr = ref("")

	async function getHotRank() {
		let res = await apiGetHotRank(param)
		// console.log("hotrank:", res.data)
		hotRankList.value = [...hotRankList.value, ...res.data]
		updateTimeStr.value = hotRankList.value[0].hotUpdateTimeStr
		if (param.pageSize > res.data.length) {
			noData.value = true
		}
	}

	function add(item) {
		compareListStore.add(item)
	}

	onReachBottom(() => {
		// console.log("触底了")
		if (noData.value) {
			return
		}
		// 最多展示30个
		if(param.page == 3) {
			noData.value = true
			return
		}
		param.page++
		getHotRank()
	})

	getHotRank()
</script>

<style lang="scss" scoped>
	.head {
		display: flex;
		flex-direction: column;
		align-items: center;
		background: $theme-color;
		color: white;
		padding: 10rpx 0;
		border-radius: 20rpx 20rpx 0 0;
	}

	.title {
		font-size: 20px;
		font-weight: bold;
	}

	.update {
		font-size: 14px;
		margin-top: 10rpx;
	}

	.box {
		display: flex;
		align-items: center;
		position: relative;
		background: white;
		margin: 15rpx 15rpx 0 15rpx;
		border-radius: 20rpx;
		height: 150rpx;
		padding: 0 30rpx;
	}

	.num {
		// background: red;
		font-size: 20px;
		font-weight: bold;
		font-style: italic;
		width: 50rpx;
		text-align: center;
		margin-right: 30rpx;
	}

	.add-button {
		position: absolute;
		right: 20rpx;
	}
</style>