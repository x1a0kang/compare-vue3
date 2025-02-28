<template>
	<view class="layout">
		<view class="head">
			<view class="title">热门跑鞋</view>
			<view class="update">{{updateTimeStr}}更新</view>
		</view>

		<view class="box shadow" v-for="(item,index) in hotRankList" @click="jump(item)">
			<view class="num">{{index+ 1}} </view>

			<image class="image" mode="aspectFill" :src="item.imageList[0]">
			</image>

			<brand-name class="brand-name" :item="item"></brand-name>

			<view class="add-button">
				<addToCompareButton :item="item"></addToCompareButton>
			</view>
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

	function jump(item) {
		uni.navigateTo({
			url: '/pages/product/productDetail?id=' + item.productId + '&name=' + item.name
		});
		console.log("跳转到详情页", item.name)
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
		if (param.page == 3) {
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
		margin-top: 1rpx;
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
		margin: 10rpx 15rpx 0 15rpx;
		border-radius: 20rpx;
		height: 180rpx;
		padding: 0 30rpx;
	}

	.num {
		// background: red;
		font-size: 20px;
		font-weight: bold;
		font-style: italic;
		width: 50rpx;
		text-align: center;
	}

	.image {
		margin-left: 20rpx;
		height: 100%;
		width: 180rpx;
	}

	.brand-name {
		padding: 0 20rpx;
		width: 380rpx;
		// background: red;
	}

	.add-button {
		position: absolute;
		right: 20rpx;
		height: 100%;
	}
</style>