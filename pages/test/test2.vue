<template>
	<view class="layout">
		<scroll-view class="scroll" scroll-y="true" style="height:calc(100vh)">
			<view v-for="i in 100">hhhhhhhhh</view>
		</scroll-view>

		<scroll-view class="scroll" scroll-y="true" style="height:calc(100vh)">
			<view v-for="i in 100">hhhhhhhhh</view>
		</scroll-view>
	</view>
</template>

<script setup>

</script>

<style lang="scss" scoped>
	.layout {
		display: flex;
	}

	.scroll {}
</style>