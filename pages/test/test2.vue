<template>
	<view class="layout">
		<uni-data-select placeholder="test" v-model="value" :localdata="specList.value"
			@change="change"></uni-data-select>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'
	import {
		useSpecListStore
	} from '@/store/specList'
	import {
		apiGetSpecList
	} from '@/api/api.js'
	
	const {
		specList
	} = useSpecListStore()

	let value = ref("")
	
	apiGetSpecList()

	function change(e) {
		console.log("change", e)
	}
</script>

<style lang="scss" scoped>
	.layout {
		display: flex;
	}

	.scroll {}
</style>