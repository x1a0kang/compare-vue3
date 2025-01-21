<template>
	<view class="layout pageBg">
		<custom-nav-bar title="对比"></custom-nav-bar>

		<!-- 待对比内容列表 -->
		<checkbox-group @change="change">
			<view class="line shadow" v-for="item in compareList" :key="item.productId">
				<checkbox class="checkbox" :value="item.productId" iconColor="$theme-color" style="transform:scale(0.9)"
					:checked="item.checked">
				</checkbox>

				<productPreview :item="item"></productPreview>

				<view class="delete" @click="deleteOne(item)">
					<uni-icons type="trash" size="20"></uni-icons>
				</view>
			</view>
		</checkbox-group>

		<!-- 作为底部填充，否则bottom的按钮会遮挡内容 -->
		<view class="fill"></view>

		<!-- 底部功能区 -->
		<view class="bottom">
			<checkbox-group @change="changeAll">
				<checkbox class="selectAll" value="all" iconColor="$theme-color" :checked="allSelected.checked">
					全选
				</checkbox>

			</checkbox-group>

			<button class="compareAll" @click="compareAll()">开始对比</button>

			<view class="deleteAll" @click="deleteAll()">
				<uni-icons type="trash-filled" size="20"></uni-icons>
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
		useSelectedCompareListStore
	} from '@/store/selectedCompareList'

	const compareListStore = useCompareListStore()
	// 对比列表
	const {
		compareList
	} = compareListStore

	// 被选中产品的ID列表
	const {
		selectedCompareList
	} = useSelectedCompareListStore()

	// 是否全选
	const allSelected = reactive({
		checked: true
	})

	function deleteOne(item) {
		compareListStore.remove(item)
	}

	function deleteAll() {
		compareListStore.removeAll()
	}

	function compareAll() {
		if (compareList.length > 1) {
			uni.navigateTo({
				url: "/pages/compare/compare"
			})
		} else {
			uni.showToast({
				title: "小于两件产品"
			})
		}
	}

	// 进入对比页面默认全选
	function init() {
		compareList.forEach((item) => {
			item.checked = true
			selectedCompareList.push(item.productId)
		})
		allSelected.checked = true
	}

	function change(e) {
		const values = e.detail.value
		selectedCompareList.length = 0
		selectedCompareList.push(...e.detail.value)

		// 如果selectedCompareList和selected长度相同,就是全选了
		allSelected.checked = selectedCompareList.length === compareList.length

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
		selectedCompareList.length = 0
		if (values.length > 0) {
			compareList.forEach((item) => {
				item.checked = true
				selectedCompareList.push(item.productId)
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

	init()
</script>

<style lang="scss" scoped>
	.fill {
		height: 120rpx;
	}

	.line {
		display: flex;
		align-items: center;
		position: relative;
		background: white;
		margin: 15rpx 15rpx 0 15rpx;
		border-radius: 20rpx;

		.checkbox {
			margin-left: 10rpx;
		}

		.delete {
			position: absolute;
			display: flex;
			flex-direction: column;
			align-items: center;
			height: 50rpx;
			width: 50rpx;
			right: 20rpx;
			bottom: 20rpx;
			justify-content: center;
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
			text-align: center;
			align-items: center;
			justify-content: center;
		}

		.selectAll {
			margin-left: 20rpx;
			width: fit-content;
		}

		.deleteAll {
			display: flex;
			height: 100%;
			position: absolute;
			text-align: center;
			width: fit-content;
			align-items: center;
			right: 20rpx;
		}
	}
</style>