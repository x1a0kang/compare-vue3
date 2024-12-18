<template>
	<view class="layout">
		<uni-data-select placeholder="test" v-model="value" :localdata="range" @change="change"></uni-data-select>

	</view>
</template>

<script setup>
	import {
		reactive,
		ref
	} from 'vue';

	let value = ref()
	const range = reactive([{
			value: 0,
			text: "篮球"
		},
		{
			value: 1,
			text: "足球"
		},
		{
			value: 2,
			text: "游泳"
		}
	])

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