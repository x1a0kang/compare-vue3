<template>
	<view class="layout pageBg">
		<!-- 图片 -->
		<view class="image shadow">
			<mySwiper :imageList="detail.imageList"></mySwiper>
		</view>

		<view class="tab">
			<view class="text">详细参数</view>
		</view>

		<!-- 参数内容区 -->
		<view class="content">
			<view class="line" v-for="spec in specList.value">
				<view class="key"> {{spec.text}} ：</view>
				<view class="value">
					{{detail[spec.value]}}
				</view>
			</view>
		</view>

		<!-- 底部功能栏 -->
		<view class="bottom-bar">
			<view class="toFunction" @click="toProduct()">
				<Commodity theme="outline" size="20" fill="#000" :strokeWidth="3" />
				产品库
			</view>
			<view class="toFunction" @click="toCompare()">
				<uni-icons custom-prefix="iconfont" type="icon-versus" size="20"></uni-icons>
				对比列表
			</view>
			<button class="addButton" @click="add()">
				加入对比
			</button>
			<view class="safe-area-inset-bottom"></view>
		</view>
	</view>
</template>

<script setup>
	import {
		useSpecListStore
	} from '@/store/specList'
	import {
		apiGetSpecList,
		apiGetOne
	} from '@/api/api.js'
	import {
		goToHome
	} from '@/utils/function.js'
	import {
		ref
	} from 'vue'
	import {
		onLoad
	} from "@dcloudio/uni-app"
	import {
		useCompareListStore
	} from '@/store/compareList'
	import {
		Commodity
	} from '@icon-park/vue-next'

	const compareListStore = useCompareListStore()

	const {
		specList
	} = useSpecListStore()
	const detail = ref({})

	const currentIndex = ref(0)

	const param = {}

	function add() {
		compareListStore.add(detail.value)
	}

	function toCompare() {
		uni.switchTab({
			url: '/pages/compare/compareList'
		})
	}

	function toProduct() {
		uni.switchTab({
			url: '/pages/product/product'
		})
	}

	function swiperChange(e) {
		currentIndex.value = e.detail.current;
	}

	apiGetSpecList()

	onLoad((e) => {
		let {
			id = null, name = null
		} = e
		// id不存在时返回首页
		if (!id) {
			goToHome()
			return
		}
		param.id = id
		getOne()
		uni.setNavigationBarTitle({
			title: name
		})
	})

	async function getOne() {
		let res = await apiGetOne(param)
		detail.value = res.data
	}
</script>

<style lang="scss" scoped>
	.layout {
		position: relative;
		padding: 5rpx 15rpx 0 15rpx;
	}

	.image {
		height: 350rpx;
		background: white;
		// padding-top: 5rpx;
		border-radius: 20rpx;
	}

	.tab {
		background: $theme-color;
		font-size: 22px;
		display: flex;
		color: black;
		margin-top: 20rpx;
		border-radius: 20rpx 20rpx 0 0;
		overflow: hidden;
		align-items: center;
		// padding-left: 20rpx;

		// width: 50vw;
		.text {
			background: white;
			border-radius: 20rpx 20rpx 0 0;
			padding: 10rpx 20rpx;
			box-shadow: 20rpx 20rpx 0 0 #fff, -20rpx 20rpx 0 0 #fff;
			position: relative;
			// border: 2px solid black;
			text-decoration: underline;
			text-decoration-color: $theme-color;
			text-underline-offset: 15rpx;
		}

		.text::before {
			content: '';
			position: absolute;
			left: -20rpx;
			bottom: 0;
			width: 20rpx;
			height: 100rpx;
			background: $theme-color; // 修改
			border-radius: 0 0 20rpx 0;
		}

		.text::after {
			content: '';
			position: absolute;
			right: -20rpx;
			bottom: 0;
			width: 20rpx;
			height: 100%;
			background: $theme-color; // 修改
			border-radius: 0 0 0 20rpx;
		}
	}

	.content {
		// margin: 20rpx;
		background: white;
		border-radius: 0 0 20rpx 20rpx;
		// padding: 1rpx 0;
		overflow: hidden;
	}

	.line {
		margin: 30rpx 0;
		padding: 10rpx 0;
		display: flex;

		.key {
			width: 40%;
			height: 100%;
			word-wrap: break-word;
			text-align: center;
		}

		.value {
			width: 60%;
			height: 100%;
			margin: 0 20rpx;
			word-wrap: break-word;
			text-align: center;
		}
	}

	.bottom-bar {
		position: fixed;
		left: 0;
		right: 0;
		bottom: env(safe-area-inset-bottom);
		display: flex;
		padding: 5rpx 20rpx;
		align-items: center;
		background: rgb(255, 255, 255);

		.toFunction {
			width: 80rpx;
			height: 80rpx;
			display: flex;
			flex-direction: column;
			font-size: 20rpx;
			align-items: center;
			justify-content: center;
			margin: 0 15rpx;
		}

		.addButton {
			width: 460rpx;
			// background: linear-gradient(90deg, #ebb8e9, #bbebea, #d1ebaa);
			background: $theme-color;
			color: $theme-font-color;
			border-radius: 50rpx;
			margin-right: 0;
		}
	}
</style>