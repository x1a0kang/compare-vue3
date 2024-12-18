<template>
	<view class="home">
		<custom-nav-bar title="主页"></custom-nav-bar>
		<view class="banner">
			<swiper indicator-dots indicator-color="rgba(255,255,255,0.5)" indicator-active-color="#fff" autoplay
				circular>
				<swiper-item>
					<image
						src="https://www.nikon.com.cn/tmp/CN/4016499630/3760176746/3015334490/1708048789/1863000998/1666314630/3477152822.png"
						mode="aspectFill"></image>
				</swiper-item>
				<swiper-item>
					<image
						src="https://www.nikon.com.cn/tmp/CN/4016499630/3760176746/3015334490/1708048789/2040840204/1666314630/3477152822.png"
						mode="aspectFill"></image>
				</swiper-item>
				<swiper-item>
					<image
						src="https://www.nikon.com.cn/tmp/CN/4016499630/3760176746/3015334490/1708048789/602730056/2271516755/3477152822.png"
						mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</view>

		<uni-section title="品牌" type="circle"></uni-section>

		<view class="brand">
			<brand></brand>
		</view>

		<uni-section title="热门分类" type="circle"></uni-section>

		<hotCategories></hotCategories>

	</view>

</template>

<script setup>

</script>

<style lang="scss" scoped>
	.home {
		.banner {
			width: 750rpx;
			padding: 15rpx 0;

			swiper {
				width: 750rpx;
				height: 400rpx;

				swiper-item {
					width: 100%;
					height: 100%;
					padding: 0 30rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}
			}
		}
	}
</style>