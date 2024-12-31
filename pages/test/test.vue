

<template>
	<custom-nav-bar title="产品"></custom-nav-bar>

	<view class="layout">
		<!-- 左边导航栏 -->
		<view class="tab">
			<uni-collapse class="collapse" v-model="accordionVal" accordion>
				<uni-collapse-item @click="getData([], [], '0')" class="box" title="全部" :show-arrow="false"
					open></uni-collapse-item>
				<uni-collapse-item @click="getData(['brand'], [brand.chinese], index+1)" class="box"
					v-for="(brand,index) in brandList" :key="brand.english" :title="brand.chinese" :show-arrow="false">
					<view @click.stop="getData(['brand','sensorSize'], [brand.chinese, series])" class="series"
						v-for="series in brand.series">
						{{series}}
					</view>
				</uni-collapse-item>
			</uni-collapse>

		</view>

		<!-- 右边内容-->
		<view class="content">
			<view class="noSearchData" v-if="noSearchData">
				<uv-empty mode="search" icon="http://cdn.uviewui.com/uview/empty/search.png"></uv-empty>
			</view>

			<view class="product" v-for="item in dataList" :key="item.productId">
				<productPreview :item="item"></productPreview>
				<addToCompareButton :item="item"></addToCompareButton>
			</view>

		</view>
	</view>

</template>

<script setup>
	import {
		reactive,
		ref
	} from 'vue';
	import {
		onShow,
		onLoad,
		onReachBottom
	} from "@dcloudio/uni-app";
	import {
		apiGetBrand,
		apiSearchByFilter,
		apiGetAll
	} from "@/api/api.js"

	let accordionVal = ref("0")
	const noData = ref(false)
	const noSearchData = ref(false)
	const isChosen = ref(false)
	const brandList = reactive([])
	const dataList = reactive([])
	let body = reactive({
		page: 1,
		pageSize: 8,
		key: ["brand"],
		value: ["all"]
	})

	async function getBrand() {
		let res = await apiGetBrand()
		brandList.push(...res.data)
	}

	async function getData(key, value, index) {
		isChosen.value = true
		if (isRepeatClick(value)) {
			return
		}
		initBody()
		body.key = key
		body.value = value
		getSearchByFilter()
	}

	async function getSearchByFilter() {
		let res = await apiSearchByFilter(body)
		dataList.push(...res.data)
		if (res.data.length == 0 && dataList == 0) noSearchData.value = true;
	}

	function initBody() {
		body.page = 1
		body.pageSize = 8
		body.key.length = 0
		body.value.length = 0
		dataList.length = 0
		noSearchData.value = false
	}

	function isRepeatClick(value) {
		let flag = body.value.every(e => value.includes(e)) && value.every(e => body.value.includes(e))
		if (flag) {
			console.log("重复点击")
			return true
		}
		return false
	}

	//触底加载更多
	onReachBottom(() => {
		if (noData.value) return;
		body.page++
		getSearchByFilter();
	})

	getBrand()
	getData([], [], "0")
</script>

<style lang="scss" scoped>
	.layout {
		display: flex;

		.tab {

			.collapse {
				align-items: center;
			}

			.box {
				display: flex;
				flex-direction: column;
				align-items: center;
				padding: 10rpx 0;

				.series {
					padding: 10rpx 0;
				}
			}
		}

		.content {
			width: 100%;

			.product {
				display: flex;
				align-items: center;
			}
		}
	}

	.title-bold {
		font-weight: bold;
	}
</style>