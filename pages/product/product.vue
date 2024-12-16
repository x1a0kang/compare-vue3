<template>
	<custom-nav-bar title="产品"></custom-nav-bar>
	<view class="layout">
		<!-- 左边导航栏 -->
		<view class="tab">
			<uni-collapse class="collapse" accordion>
				<uni-collapse-item @click="getData(['brand'], [brand.chinese])" class="box" v-for="brand in brandList"
					:key="brand.english" :title="brand.chinese">
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

			<productPreview v-for="item in dataList" :key="item.productId" :item="item"></productPreview>
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

	const noData = ref(false)
	const noSearchData = ref(false)
	const brandList = reactive([])
	const dataList = reactive([])
	let body = reactive({
		page: 1,
		pageSize: 8,
		key: [],
		value: []
	})

	async function getBrand() {
		let res = await apiGetBrand()
		brandList.push(...res.data)
	}

	async function getData(key, value) {
		initBody()
		body.key = key
		body.value = value
		getSearchByFilter()
	}

	async function getSearchByFilter() {
		console.log(body)
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

	//触底加载更多
	onReachBottom(() => {
		if (noData.value) return;
		body.page++
		getSearchByFilter();
	})

	getBrand()
	getData([], [])
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
		}
	}
</style>