<template>
	<view class="layout">
		<view class="filter">
			<view class="condition" v-for="(keyText,index) in conditionList.keyText" :key="index">
				<view>{{keyText}} : {{conditionList.valueText.at(index)}}</view>
				<button class="deleteButton" @click="deleteCondition(index)" plain="true" size="mini">
					<uni-icons class="icon" type="closeempty" size="15"></uni-icons>
				</button>
			</view>
			<button class="addCondition" @click="openPop()">添加过滤器</button>
		</view>


		<uni-popup ref="pop">
			<view class="box">
				<uni-data-select class="select" placeholder="请选择条件" v-model="chosenKey" :localdata="specList.value"
					@change="change"></uni-data-select>
				<uni-data-select class="select" placeholder="请选择值" v-model="chosenValue"
					:localdata="optionList"></uni-data-select>
			</view>
			<button @click="confirm()">确认</button>
		</uni-popup>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref
	} from 'vue'
	import {
		useSpecListStore
	} from '@/store/specList'
	import {
		apiGetSpecList
	} from '@/api/api.js'

	apiGetSpecList()

	const {
		specList
	} = useSpecListStore()
	const optionList = reactive([])

	let conditionList = reactive({
		key: [],
		keyText: [],
		value: [],
		valueText: []
	})

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
	}

	function deleteCondition(index) {
		conditionList.key.splice(index, 1)
		conditionList.keyText.splice(index, 1)
		conditionList.value.splice(index, 1)
		conditionList.valueText.splice(index, 1)
	}
</script>

<style lang="scss" scoped>
	.layout {
		.filter {
			display: flex;
			gap: 20rpx;
			align-items: center;

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
				margin-right: 0;
			}
		}

		.box {
			background-color: rgba(255, 255, 255, 0.9);
			width: 500rpx;
			display: flex;
			gap: 10rpx;

			.select {
				background-color: white;
			}
		}
	}
</style>