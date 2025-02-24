<template>
	<view class="layout">
		<custom-nav-bar title="对比"></custom-nav-bar>

		<!-- 待对比内容列表 -->
		<checkbox-group @change="change">
			<view class="line shadow" v-for="item in compareList" :key="item.productId">
				<checkbox class="checkbox" :value="item.productId" iconColor="$theme-color" style="transform:scale(0.9)"
					:checked="item.checked">
				</checkbox>

				<image class="image" mode="aspectFill" :src="item.imageList[0]" @click="jump(item)">
				</image>

				<view class="text" @click="jump(item)">{{item.brand}} {{item.name}}</view>

				<view class="delete" @click.stop="deleteOne(item)">
					<uni-icons custom-prefix="iconfont" type="icon-delete" size="22"></uni-icons>
				</view>
			</view>
		</checkbox-group>

		<!-- 加载更多 -->
		<view class="loadingLayout" v-show="!compareList.length">
			<uni-load-more status="noMore"></uni-load-more>
		</view>

		<!-- 作为底部填充，否则bottom的按钮会遮挡内容 -->
		<view class="fill"></view>

		<!-- 底部功能区 -->
		<view class="bottom">
			<view class="selectAll">
				<checkbox-group @change="changeAll">
					<checkbox value="all" iconColor="$theme-color" style="transform:scale(0.9)"
						:checked="allSelected.checked">
					</checkbox>
				</checkbox-group>
				全选
			</view>

			<button class="compareAll" @click="compareAll()">开始对比</button>

			<view class="deleteAll" @click="deleteAll()">
				<uni-icons custom-prefix="iconfont" type="icon-deletefill" size="20"></uni-icons>
				清空
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		reactive
	} from 'vue'
	import {
		useCompareListStore
	} from '@/store/compareList'
	import {
		apiPkCount
	} from '@/api/api.js'
	import {
		onShow
	} from '@dcloudio/uni-app'
	import {
		deleteOneFromArray
	} from '@/utils/function.js'

	const compareListStore = useCompareListStore()
	// 对比列表
	const {
		compareList
	} = compareListStore

	// 是否全选
	const allSelected = reactive({
		checked: true
	})
	// 被选中产品的ID列表
	const selectedList = []

	function jump(item) {
		uni.navigateTo({
			url: '/pages/product/productDetail?id=' + item.productId + '&name=' + item.name
		});
		console.log("跳转到详情页", item.name)
	}

	function deleteOne(item) {
		compareListStore.remove(item)
		deleteOneFromArray(selectedList, item.productId)
		console.log("compareList数量", compareList.length)
		console.log("selectedList数量", selectedList.length)
	}

	function deleteAll() {
		compareListStore.removeAll()
		selectedList.length = 0
	}

	function compareAll() {
		console.log("selectedList", selectedList)
		if (selectedList.length < 2) {
			uni.showToast({
				title: "对比小于两件",
				icon: "error"

			})
		} else if (selectedList.length > 5) {
			uni.showToast({
				title: "对比大于五件",
				icon: "error"
			})
		} else {
			// 对比计数
			let param = {}
			param.idList = selectedList
			apiPkCount(param)

			uni.navigateTo({
				url: "/pages/compare/compare?idListStr=" + selectedList.toString()
			})
		}
	}

	// 进入对比页面默认全选
	function init() {
		// 每次都要把已选列表清空，否则每次加载会double
		selectedList.length = 0;
		compareList.forEach((item) => {
			item.checked = true
			selectedList.push(item.productId)
		})
		allSelected.checked = true
		console.log("selectedList数量", selectedList.length)
	}

	function change(e) {
		const values = e.detail.value
		selectedList.length = 0
		selectedList.push(...e.detail.value)

		// 如果compareListList和selected长度相同,就是全选了
		allSelected.checked = selectedList.length === compareList.length

		// 从数组中查找选中的id，选中的checked设成true，没有的设成false
		compareList.forEach((item) => {
			if (values.includes(item.productId)) {
				item.checked = true
			} else {
				item.checked = false
			}
		})
	}

	function changeAll(e) {
		const values = e.detail.value
		selectedList.length = 0
		if (values.length > 0) {
			compareList.forEach((item) => {
				item.checked = true
				selectedList.push(item.productId)
			})
			allSelected.checked = true
		} else {
			compareList.forEach((item) => {
				item.checked = false
			})
			allSelected.checked = false
		}
		console.log("全选", allSelected.checked)
	}

	onShow(() => {
		init()
	})
</script>

<style lang="scss" scoped>
	.fill {
		height: 100rpx;
	}

	.line {
		display: flex;
		align-items: center;
		position: relative;
		background: white;
		margin: 10rpx 15rpx 0 15rpx;
		border-radius: 20rpx;
		height: 180rpx;

		.image {
			margin-left: 30rpx;
			height: 100%;
			width: 180rpx;
		}

		.text {
			margin-left: 30rpx;
			text-align: center;
			// font-weight: bold;
			min-width: 40%;
			overflow: hidden;
			text-overflow: ellipsis;
			text-wrap: nowrap;
			// background: blue;
		}

		.checkbox {
			margin-left: 20rpx;
		}

		.delete {
			position: absolute;
			display: flex;
			flex-direction: column;
			align-items: center;
			height: 100%;
			right: 20rpx;
			justify-content: center;
			// background-color: red;
		}
	}

	.bottom {
		display: flex;
		position: fixed;
		left: 0;
		right: 0;
		bottom: var(--window-bottom);
		align-items: center;
		background-color: white;
		height: 90rpx;

		.compareAll {
			display: flex;
			width: 300rpx;
			background: $theme-color;
			border-radius: 15rpx;
			color: $theme-font-color;
			position: absolute;
			right: 0;
			left: 0;
			bottom: 2rpx;
			text-align: center;
			align-items: center;
			justify-content: center;
			// margin-bottom: 5rpx;
		}

		.selectAll {
			margin-left: 20rpx;
			display: flex;
			align-items: center;
		}

		.deleteAll {
			display: flex;
			height: 100%;
			position: absolute;
			text-align: center;
			width: fit-content;
			align-items: center;
			right: 20rpx;
			gap: 8rpx;
			// background-color: red;
		}
	}
</style>