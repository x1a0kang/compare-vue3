<template>
	<view>
		<button class="add-button" @click="addToCompare(item)"></button>
	</view>
</template>

<script setup>
	import {
		useCompareListStore
	} from '@/store/compareList'

	const compareListStore = useCompareListStore()

	defineProps({
		item: {
			type: Object,
			default: {}
		}
	})

	function addToCompare(item) {
		compareListStore.add(item)
	}
</script>

<style lang="scss" scoped>

</style>