<template>
	<custom-nav-bar title="产品"></custom-nav-bar>

	<view class="filter">
		<view class="conditionList">
			<view class="condition" v-for="(keyText,index) in conditionList.keyText" :key="index">
				<view>{{keyText}} : {{conditionList.valueText.at(index)}}</view>
				<button class="deleteButton" @click="deleteCondition(index)" plain="true" size="mini">
					<uni-icons class="icon" type="closeempty" size="15"></uni-icons>
				</button>
			</view>
		</view>
		<button class="addCondition" @click="openPop()">添加过滤器</button>
	</view>


	<uni-popup ref="pop">
		<view class="popBox">
			<uni-data-select class="select" placeholder="请选择条件" v-model="chosenKey" :localdata="specList.value"
				@change="change"></uni-data-select>
			<uni-data-select class="select" placeholder="请选择值" v-model="chosenValue"
				:localdata="optionList"></uni-data-select>
		</view>
		<button @click="confirm()">确认</button>
	</uni-popup>

	<view class="loadingLayout" v-if="!arrs.length && !noData">
		<uni-load-more status="loading"></uni-load-more>
	</view>

	<view class="content">
		<view class="box" v-for="item in arrs" :key="item.productId">
			<button class="jump-button" @click="jump(item)">
				<image class="image"
					src="https://www.nikon.com.cn/tmp/CN/4016499630/3760176746/3015334490/1708048789/1863000998/1666314630/3477152822.png"
					mode="aspectFill"></image>
				<br />
				<view class="mask">{{item.name}}</view>
			</button>
			<button class="add-button" @click="addToCompare(item)">
				<uni-icons type="plus"></uni-icons>
			</button>
		</view>
	</view>

	<view class="loadingLayout" v-if="arrs.length || noData">
		<uni-load-more :status="noData?'noMore':'loading'"></uni-load-more>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive
	} from 'vue';
	import {
		useCompareListStore
	} from '@/store/compareList'
	import {
		useDetailStore
	} from '@/store/detail'
	import {
		useSpecListStore
	} from '@/store/specList'
	import {
		apiGetSpecList,
		apiSearchByFilter
	} from "@/api/api.js"
	import {
		onReachBottom
	} from '@dcloudio/uni-app';

	const arrs = ref([])
	const noData = ref(false)

	const {
		compareList
	} = useCompareListStore()
	const {
		detail
	} = useDetailStore()

	let conditionList = reactive({
		page: 1,
		pageSize: 10,
		key: [],
		keyText: [],
		value: [],
		valueText: []
	})

	async function searchByFilter() {
		let res = await apiSearchByFilter(conditionList)
		arrs.value = [...arrs.value, ...res.data]
		if (conditionList.pageSize > res.data.length) {
			noData.value = true
		}
	}

	function jump(item) {
		detail.value = item
		uni.navigateTo({
			url: '/pages/product/productDetail'
		});
		console.log("跳转到详情页", item.name)
	}

	function addToCompare(item) {
		const index = compareList.findIndex(
			function(temp) {
				return temp.productId === item.productId
			}
		)
		if (index != -1) {
			console.log(item.name, "已存在")
		} else {
			compareList.push(item)
			console.log("加入对比", item.name)
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

	searchByFilter()

	apiGetSpecList()

	const {
		specList
	} = useSpecListStore()
	const optionList = reactive([])

	let chosenKey = ref("")
	let chosenValue = ref("")

	function change(e) {
		let temp = specList.value.find(item => item.value == e)
		optionList.length = 0
		chosenValue.value = ""
		if (temp != null && temp.optionList != null) {
			optionList.push(...temp.optionList)
		}
	}

	const pop = ref()

	function openPop() {
		pop.value.open()
	}

	function confirm() {
		if (chosenKey.value === "" || chosenValue.value === "") {
			return
		}
		let index = conditionList.key.findIndex(item => item == chosenKey.value)
		if (index > -1) {
			console.log("条件已存在")
			return
		}

		let tempKey = specList.value.find(item => item.value == chosenKey.value)
		let tempValue = optionList.find(item => item.value == chosenValue.value)
		conditionList.key.push(chosenKey.value)
		conditionList.keyText.push(tempKey.text)
		conditionList.value.push(chosenValue.value)
		conditionList.valueText.push(tempValue.text)

		pop.value.close()
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
</script>

<style lang="scss" scoped>
	.filter {
		.conditionList {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
		}

		.condition {
			display: flex;
			align-items: center;
			background: #F4F4F4;
			font-size: 32rpx;
			color: #333;
			padding: 10rpx 28rpx;
			border-radius: 50rpx;
			margin-right: 20rpx;
			margin-top: 20rpx;
			gap: 10rpx;

			.deleteButton {
				border: none;

				.icon {
					width: 100%;
				}
			}
		}

		.addCondition {
			margin-top: 20rpx;
		}
	}

	.popBox {
		background-color: rgba(255, 255, 255, 0.9);
		width: 500rpx;
		display: flex;
		gap: 10rpx;

		.select {
			background-color: white;
		}
	}

	.content {
		margin-top: 15rpx;
		padding: 0 15rpx;
		display: grid;
		gap: 15rpx;
		grid-template-columns: repeat(2, 1fr);

		.box {
			height: 400rpx;
			border-radius: 10rpx;
			overflow: hidden;
			position: relative;
			background-color: blue;

			.jump-button {
				height: 100%;
				position: relative;
			}

			.image {
				width: 100%;
				height: 300rpx;
			}

			.mask {
				width: 100%;
				height: 50rpx;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.add-button {
				width: 50rpx;
				height: 50rpx;
				position: absolute;
				bottom: 23rpx;
				right: 5rpx;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
</style>