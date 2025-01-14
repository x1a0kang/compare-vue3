<template>
	<view>
		<button class="add-button" @click="addToCompare(item)"></button>
	</view>
</template>

<script setup>
	import {
		useCompareListStore
	} from '@/store/compareList'

	const {
		compareList
	} = useCompareListStore()

	defineProps({
		item: {
			type: Object,
			default: {}
		}
	})

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
</script>

<style lang="scss" scoped>

</style>