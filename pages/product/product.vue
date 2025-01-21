<template>
	<view class="layout pageBg">
		<custom-nav-bar title="产品"></custom-nav-bar>

		<!-- 过滤器 -->
		<view class="headBar">
			<view class="order" @click="openPop()">排序</view>
			<view class="addCondition" @click="openPop()">筛选</view>
		</view>

		<view class="conditionList">
			<view class="condition" v-for="(keyText,index) in conditionList.keyText" :key="index">
				<view>{{keyText}} : {{conditionList.valueText.at(index)}}</view>
				<view class="deleteButton" @click="deleteCondition(index)" plain="true" size="mini">
					<uni-icons class="icon" type="closeempty" size="15" color="#fff"></uni-icons>
				</view>
			</view>
		</view>

		<!-- 过滤器弹窗 -->
		<uni-popup ref="pop" class="pop">
			<view class="popBox">
				<uni-data-select class="select" placeholder="请选择条件" v-model="chosenKey" :localdata="specList.value"
					@change="change"></uni-data-select>
				<uni-data-select class="select" placeholder="请选择值" v-model="chosenValue"
					:localdata="optionList"></uni-data-select>
			</view>
			<view class="confirm" @click="confirm()">确认</view>
		</uni-popup>

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
		apiGetSpecList,
		apiSearchByFilter
	} from "@/api/api.js"
	import {
		onReachBottom,
		onShow
	} from '@dcloudio/uni-app'

	const arrs = ref([])
	const noData = ref(false)

	let conditionList = reactive({
		page: 1,
		pageSize: 10,
		key: [],
		keyText: [],
		value: [],
		valueText: []
	})

	async function searchByFilter() {
		console.log("调用接口参数", conditionList)
		let res = await apiSearchByFilter(conditionList)
		arrs.value = [...arrs.value, ...res.data]
		if (conditionList.pageSize > res.data.length) {
			noData.value = true
		}
	}

	const initParams = (value = '') => {
		arrs.value = [];
		noData.value = false;
		conditionList.page = 1
	}

	onReachBottom(() => {
		console.log("触底了")
		if (noData.value) {
			return
		}
		conditionList.page++
		searchByFilter()
	})

	apiGetSpecList()
	// searchByFilter()

	const {
		specList
	} = useSpecListStore()
	const optionList = reactive([])

	let chosenKey = ref("")
	let chosenValue = ref("")

	const pop = ref()

	function openPop() {
		pop.value.open()
	}

	function change(e) {
		let temp = specList.value.find(item => item.value == e)
		optionList.length = 0
		chosenValue.value = ""
		if (temp != null && temp.optionList != null) {
			optionList.push(...temp.optionList)
		}
	}

	function confirm() {
		if (chosenKey.value === "" || chosenValue.value === "") {
			return
		}

		let tempKey = specList.value.find(item => item.value == chosenKey.value)
		let tempValue = optionList.find(item => item.value == chosenValue.value)
		if (tempValue === undefined) {
			return
		}

		let index = conditionList.key.findIndex(item => item == chosenKey.value)
		if (index > -1) {
			// todo：找到已有的条件，删除后把新的加入
			conditionList.key.splice(index, 1, chosenKey.value)
			conditionList.keyText.splice(index, 1, tempKey.text)
			conditionList.value.splice(index, 1, chosenValue.value)
			conditionList.valueText.splice(index, 1, tempValue.text)
		} else {
			conditionList.key.push(chosenKey.value)
			conditionList.keyText.push(tempKey.text)
			conditionList.value.push(chosenValue.value)
			conditionList.valueText.push(tempValue.text)
		}

		pop.value.close()
		doSearch()
	}

	function doSearch() {
		chosenKey.value = ""
		chosenValue.value = ""
		optionList.length = 0

		initParams()
		searchByFilter()
	}

	function deleteCondition(index) {
		conditionList.key.splice(index, 1)
		conditionList.keyText.splice(index, 1)
		conditionList.value.splice(index, 1)
		conditionList.valueText.splice(index, 1)

		initParams()
		searchByFilter()
	}

	onShow(() => {
		let filterKey = uni.getStorageSync('filterKey')
		let filterValue = uni.getStorageSync('filterValue')

		// 如果缓存中的key不为空就是跳转过来的
		if (filterKey) {
			console.log("filterKey + filterValue", filterKey, filterValue)
			// 重置跳转条件
			uni.setStorageSync('filterKey', '')
			uni.setStorageSync('filterValue', '')
			// 在选项list加入value
			change(filterKey)

			chosenKey.value = filterKey
			chosenValue.value = filterValue
			// 清空原条件列表
			conditionList.key.length = 0
			conditionList.keyText.length = 0
			conditionList.value.length = 0
			conditionList.valueText.length = 0

			doSearch()
		} else {
			searchByFilter()
		}
	})
</script>

<style lang="scss" scoped>
	.headBar {
		display: flex;
		font-size: 18px;
		position: relative;
		margin: 10rpx 15rpx;
		border-bottom: 1px solid $theme-color;
		// background: #010101;

		.order {
			padding: 15rpx 10rpx;
			// background: red;
		}

		.addCondition {
			position: absolute;
			padding: 15rpx 10rpx;
			text-align: center;
			right: 0;
			border-radius: 15rpx;
			// background: #010101;
			// color: white;
		}
	}

	.conditionList {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		padding: 0 15rpx;
		gap: 15rpx;
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

	.pop {
		display: flex;
		flex-direction: column
	}

	.popBox {
		background: #fcfcfc;
		width: 60vw;
		display: flex;
		border-radius: 10rpx;

		.select {}

	}

	.confirm {
		background: #fcfcfc;
		border-radius: 5rpx;
		text-align: center;
		padding: 10rpx;
	}
</style>