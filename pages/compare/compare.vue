<template>
	<uni-table>
		<uni-tr>
			<uni-th align="center" v-for="item in compareList" :key="item.productId">
				{{item.name}}
			</uni-th>
		</uni-tr>

		<uni-tr v-for="spec in specList.value">
			<uni-td align="center" v-for="item in compareList" :key="item.productId">
				<view class="key">{{spec.chinese}}</view>
				<view class="value">{{item[spec.english]}}</view>
			</uni-td>
		</uni-tr>
	</uni-table>
</template>

<script setup>
	import {
		useCompareListStore
	} from '@/store/compareList'
	import {
		useSpecListStore
	} from '@/store/specList'

	const {
		specList
	} = useSpecListStore()
	const {
		compareList
	} = useCompareListStore()
</script>

<style lang="scss" scoped>
	.key {
		font-size: 28rpx;
		font-weight: bold;
		margin-bottom: 10rpx;
	}
</style>