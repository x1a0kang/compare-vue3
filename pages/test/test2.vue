<template>
	<view class="layout">
		<uni-data-select label="参数" placeholder="test" v-model="value" :localdata="specList.value"
			@change="change"></uni-data-select>
		<uni-data-select placeholder="test" v-model="option" :localdata="optionList"></uni-data-select>
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

	let value = ref("")
	let option = ref("")

	function change(e) {
		let temp = specList.value.find(item => item.value == e)
		optionList.length = 0
		option.value = ""
		if (temp.optionList != null) {
			optionList.push(...temp.optionList)
		}
	}
</script>

<style lang="scss" scoped>
	.layout {
		display: flex;
	}

	.scroll {}
</style>