<template>
	<view class="add-button" @click="add(item)">
		<add-one theme="outline" size="20" fill="#000" :strokeWidth="4" />
	</view>
</template>

<script setup>
	import {
		useCompareListStore
	} from '@/store/compareList'
	import {
		AddOne
	} from '@icon-park/vue-next'

	defineProps({
		item: {
			type: Object,
			default: {}
		}
	})

	const compareListStore = useCompareListStore()

	function add(item) {
		compareListStore.add(item)
	}
</script>

<style lang="scss" scoped>
	.add-button {
		width: 50rpx;
		height: 50rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>