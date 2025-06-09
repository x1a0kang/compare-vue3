<template>
	<view class="icon" @click.stop="add(item)">
		<uni-icons custom-prefix="iconfont" type="icon-roundadd" size="24"></uni-icons>
	</view>
</template>

<script setup>
	import {
		useCompareListStore
	} from '@/store/compareList'

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
	.icon {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		// background-color: red;
	}
</style>