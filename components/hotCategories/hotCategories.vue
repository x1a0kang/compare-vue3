<template>
	<view class="content">
		<view class="box" v-for="i in 8">
			<image class="image"
				src="https://www.nikon.com.cn/tmp/CN/4016499630/3760176746/3015334490/1708048789/808533053/1666314630/3477152822.png"
				mode="aspectFill"></image>
			<view class="mask">全画幅</view>
		</view>
	</view>
</template>

<script setup>

</script>

<style lang="scss" scoped>
	.content {
		display: grid;
		gap: 10rpx;
		grid-template-columns: repeat(2, 1fr);

		.box {
			width: 100%;

			.image {
				width: 100%;
				height: 260rpx;
			}

			.mask {
				margin-left: 150rpx;
			}
		}
	}
</style>