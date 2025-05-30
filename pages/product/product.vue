<template>
	<view class="layout pageBg">
		<custom-nav-bar title="产品"></custom-nav-bar>

		<!-- 过滤器 -->
		<view class="headBar">
			<picker class="orderPicker" mode="selector" :range="orderSpecList" range-key="text"
				@change="orderPickerChange">
				<uni-icons custom-prefix="iconfont" type="icon-paixu" size="20"></uni-icons>
				排序：{{orderText}}
			</picker>
			
			<picker class="filterPicker" mode="multiSelector" :range="specListForPicker" range-key="text"
				@columnchange="filterPickerColumnChange" @change="filterPickerChange">
				<uni-icons custom-prefix="iconfont" type="icon-filter1" size="22"></uni-icons>
				筛选
			</picker>
		</view>

		<view class="conditionList">
			<view class="condition" v-for="(keyText,index) in conditionList.keyText" :key="index">
				<view>{{keyText}} : {{conditionList.valueText.at(index)}}</view>
				<view class="deleteButton" @click="deleteCondition(index)" plain="true" size="mini">
					<uni-icons class="icon" type="closeempty" size="15" color="#fff"></uni-icons>
				</view>
			</view>
		</view>

		<view class="product">
			<!-- 进入页面加载图标 -->
			<view class="loadingLayout" v-show="!arrs.length && !noData">
				<uni-load-more status="loading"></uni-load-more>
			</view>

			<!-- 产品内容 -->
			<gridContent :arrs="arrs"></gridContent>

			<!-- 加载更多 -->
			<view class="loadingLayout" v-show="arrs.length || noData">
				<uni-load-more :status="noData?'noMore':'loading'"></uni-load-more>
			</view>
		</view>

	</view>
</template>

<script setup>
	import {
		ref,
		reactive
	} from 'vue'
	import {
		useSpecListStore
	} from '@/store/specList'
	import {
		useOrderSpecListStore
	} from '@/store/orderSpecList'
	import {
		apiGetSpecList,
		apiSearchByFilter,
		apiGetOrderSpec
	} from "@/api/api.js"
	import {
		onReachBottom,
		onShow,
		onLoad
	} from '@dcloudio/uni-app'

	// 筛选器picker的二维数组
	const specListForPicker = reactive([
		[],
		[]
	])

	// 产品列表
	const arrs = ref([])
	const noData = ref(false)

	// 所有参数列表
	const {
		specList
	} = useSpecListStore()
	// 所有可排序字段
	const {
		orderSpecList
	} = useOrderSpecListStore()

	// picker的下标
	let indexOrder = 0
	let indexFilter = [2, 2]

	let orderText = ref(orderSpecList[indexOrder].text)

	// 选择的过滤条件
	let conditionList = reactive({
		page: 1,
		pageSize: 10,
		key: [],
		keyText: [],
		value: [],
		valueText: [],
		orderKey: "",
		order: ""
	})

	async function getSpecList() {
		await apiGetSpecList()
		// 初始化多列picker的二维数组
		specList.forEach((item) => {
			// 有optionList的才加入picker
			if (item.optionList && item.optionList.length > 0) {
				specListForPicker[0].push(item)
			}
		})
		specListForPicker[1].push(...specListForPicker[0][0].optionList)
	}

	async function searchByFilter() {
		// console.log("调用接口参数", conditionList)
		let res = await apiSearchByFilter(conditionList)
		arrs.value = [...arrs.value, ...res.data]
		if (conditionList.pageSize > res.data.length) {
			noData.value = true
		}
	}

	onReachBottom(() => {
		// console.log("触底了")
		if (noData.value) {
			return
		}
		conditionList.page++
		searchByFilter()
	})

	const initParams = (value = '') => {
		arrs.value = [];
		noData.value = false;
		conditionList.page = 1
	}

	function filterPickerColumnChange(e) {
		let {
			column,
			value
		} = e.detail
		// 第一页变化，改变第二列
		if (column == 0) {
			specListForPicker[1] = specListForPicker[0][value].optionList
		}
		// console.log("detail", column, value)
		// console.log("specListForPicker", specListForPicker[1])
	}

	function filterPickerChange(e) {
		const indexList = e.detail.value
		let key = specListForPicker[0][indexList[0]]
		let value = key.optionList[indexList[1]]

		let index = conditionList.key.findIndex(item => item == key.value)
		if (index > -1) {
			// todo：找到已有的条件，删除后把新的加入
			conditionList.key.splice(index, 1, key.value)
			conditionList.keyText.splice(index, 1, key.text)
			conditionList.value.splice(index, 1, value.value)
			conditionList.valueText.splice(index, 1, value.text)
		} else {
			conditionList.key.push(key.value)
			conditionList.keyText.push(key.text)
			conditionList.value.push(value.value)
			conditionList.valueText.push(value.text)
		}

		initParams()
		searchByFilter()
	}

	function orderPickerChange(e) {
		indexOrder = e.detail.value
		let orderSpec = orderSpecList[indexOrder]
		conditionList.orderKey = orderSpec.value
		conditionList.order = orderSpec.order
		orderText.value = orderSpecList[indexOrder].text
		initParams()
		searchByFilter()
		// console.log("picker", e)
	}

	function deleteCondition(index) {
		conditionList.key.splice(index, 1)
		conditionList.keyText.splice(index, 1)
		conditionList.value.splice(index, 1)
		conditionList.valueText.splice(index, 1)

		initParams()
		searchByFilter()
	}

	onLoad(() => {
		getSpecList()
		apiGetOrderSpec()
	})

	onShow(() => {
		let orderKey = uni.getStorageSync('orderKey')
		let order = uni.getStorageSync('order')
		uni.setStorageSync('orderKey', '')
		uni.setStorageSync('order', '')
		// 如果缓存中的key不为空就是跳转过来的
		if (orderKey) {
			// 先清空所有筛选字段
			conditionList.key.length = 0
			conditionList.keyText.length = 0
			conditionList.value.length = 0
			conditionList.valueText.length = 0
			// 获取排序字段的下标
			indexOrder = orderSpecList.findIndex(item => item.value == orderKey && item.order ===
				order)
			orderText.value = orderSpecList[indexOrder].text
			conditionList.orderKey = orderKey
			conditionList.order = order
		}

		let filterKey = uni.getStorageSync('filterKey')
		let filterValue = uni.getStorageSync('filterValue')
		let filterKeyText = uni.getStorageSync('filterKeyText')
		let filterValueText = uni.getStorageSync('filterValueText')

		// 如果缓存中的key不为空就是跳转过来的
		if (filterKey) {
			console.log("filterKey + filterValue", filterKey, filterValue)
			// 重置跳转条件
			uni.setStorageSync('filterKey', '')
			uni.setStorageSync('filterValue', '')
			uni.setStorageSync('filterKeyText', '')
			uni.setStorageSync('filterValueText', '')

			// 清空原条件列表后加入
			conditionList.key = [filterKey]
			conditionList.keyText = [filterKeyText]
			conditionList.value = [filterValue]
			conditionList.valueText = [filterValueText]
		}

		initParams()
		searchByFilter()
	})
</script>

<style lang="scss" scoped>
	.headBar {
		display: flex;
		font-size: 18px;
		position: relative;
		padding: 0 20rpx;
		border-bottom: 1px solid $theme-color;
		align-items: center;
		background: white;

		.filterPicker {
			display: flex;
			width: 24%;
			padding: 15rpx 10rpx;
			text-align: center;
			align-items: center;
		}

		.orderPicker {
			display: flex;
			color: black;
			text-align: center;
			align-items: center;
			width: 100%;
			padding: 15rpx 10rpx;
		}
	}

	.conditionList {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		padding: 0 20rpx;
		gap: 15rpx;
		margin-top: 5rpx;
		margin-bottom: 10rpx;
		// background: red;
	}

	.condition {
		display: flex;
		align-items: center;
		background: $theme-color;
		font-size: 16px;
		color: $theme-font-color;
		padding: 10rpx 20rpx;
		border-radius: 50rpx;

		.deleteButton {
			margin-left: 10rpx;
		}
	}

	.product {
		padding: 0 15rpx;
		// display: flex;
	}
</style>