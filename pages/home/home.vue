<template>
	<view class="home pageBg">
		<custom-nav-bar title="主页"></custom-nav-bar>

		<!-- 滚动页面，广告位 -->
		<view class="banner">
			<swiper class="swiper" circular :autoplay="true" indicator-dots indicator-color="rgba(0, 0, 0, 0.3)"
				indicator-active-color="#000">
				<swiper-item class="swiper-item" v-for="item in bannerList" @click="toProductDetail(item)">
					<image class="image" :src="item.url" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</view>

		<view class="brand">
			<brand></brand>
		</view>

		<hotRank></hotRank>
		
		<rowSlider></rowSlider>

		<tabList class="tabList" :arrs="categories" :change="change" :more="moreCategories"></tabList>

		<gridContent :arrs="categoryProductList"></gridContent>
		<!-- 加载更多 -->
		<view class="loadingLayout" v-show="categoryProductList.length || noData">
			<uni-load-more :status="noData?'noMore':'loading'"></uni-load-more>
		</view>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref
	} from "vue";
	import {
		apiGetSpecList,
		apiSearchByFilter,
		apiCategories,
		apiGetBanner
	} from "@/api/api.js"
	import {
		onReachBottom
	} from '@dcloudio/uni-app'

	// 分类列表
	const categories = reactive([])
	// 分类下的产品列表
	const categoryProductList = ref([])
	// tab当前的下标
	let tabIndex = 0
	const noData = ref(false)

	const bannerList = reactive([])

	// 选择的过滤条件
	let param = {
		page: 1,
		pageSize: 10,
		key: [],
		value: [],
	}

	const initParams = (value = '') => {
		categoryProductList.value = [];
		noData.value = false;
		param.page = 1
		param.pageSize = 10
	}

	onReachBottom(() => {
		// console.log("触底了")
		if (noData.value) {
			return
		}
		param.page++
		getCategoryProductList()
	})

	async function getBanner() {
		let res = await apiGetBanner()
		bannerList.push(...res.data)
	}

	async function getCategories() {
		const data = {
			"page": 1,
			"pageSize": 5
		}
		let res = await apiCategories(data)
		categories.push(...res.data)
		// categories.push({
		// 	"name": "全部分类"
		// })

		initParams()
		getCategoryProductList(0)
		// console.log("categories", categories)
	}

	async function getCategoryProductList() {
		let category = categories[tabIndex]
		param.key = [category.key]
		param.value = [category.value]
		let res = await apiSearchByFilter(param)
		categoryProductList.value = [...categoryProductList.value, ...res.data]
		if (param.pageSize > res.data.length) {
			noData.value = true
		}
	}

	// 切换tab时调用的函数
	function change(index) {
		tabIndex = index
		initParams()
		getCategoryProductList()
		// console.log("调用了")
	}

	function moreHotProduct() {
		uni.setStorageSync('filterKey', 'brand')
		uni.setStorageSync('filterKeyText', '品牌')
		uni.setStorageSync('filterValue', '佳能')
		uni.setStorageSync('filterValueText', '佳能')
		uni.switchTab({
			url: '/pages/product/product'
		});
	}

	function moreNewProduct() {
		uni.setStorageSync('filterKey', 'brand')
		uni.setStorageSync('filterKeyText', '品牌')
		uni.setStorageSync('filterValue', '索尼')
		uni.setStorageSync('filterValueText', '索尼')
		uni.switchTab({
			url: '/pages/product/product'
		});
	}

	function moreCategories() {
		uni.navigateTo({
			url: "/pages/categories/categories"
		})
		// console.log("moreCategories")
	}

	function toProductDetail(item) {
		uni.navigateTo({
			url: '/pages/product/productDetail?id=' + item.productId + '&name=' + item.name
		});
		console.log("跳转到详情页", item.name)
	}

	apiGetSpecList()
	getCategories()
	getBanner()
</script>

<style lang="scss" scoped>
	.banner {
		height: 400rpx;
		background: white;
		border-radius: 20rpx;
	}

	.swiper {
		height: 100%;
		// background-color: red;
	}

	.swiper-item {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.image {
		height: 100%;
	}

	.brand {
		border-radius: 20rpx;
		// background: $theme-color;
		// color: white;
	}

	.text {
		font-size: 20px;
		width: 80%;
	}

	.tabbar {
		display: flex;
		overflow-x: scroll;
	}

	.more {
		font-size: 14px;
	}
</style>