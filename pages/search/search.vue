<template>
	<view class="searchLayout">
		<uni-search-bar class="uni-search-bar" @confirm="onSearch" @cancel="onClear" @clear="onClear" focus
			placeholder="搜索" v-model="queryParams.keyword">
		</uni-search-bar>

		<!-- 没有搜索结果时 -->
		<view v-if="!dataList.length || noSearch">
			<!-- 最近搜索 -->
			<view class="history" v-if="historySearch.length">
				<view class="topTitle">
					<view class="text">最近搜索</view>
					<view class="icon" @click="removeHistory">
						<uni-icons type="trash" size="25"></uni-icons>
					</view>
				</view>
				<view class="tabs">
					<view class="tab" v-for="tab in historySearch" :key="tab" @click="clickTab(tab)">{{tab}}</view>
				</view>
			</view>

			<!-- 热门搜索 -->
			<view class="recommend">
				<view class="topTitle">
					<view class="text">热门分类</view>
				</view>
				<view class="tabs">
					<view class="tab" v-for="tab in recommendList" :key="tab.name" @click="clickTab(tab.name)">
						{{tab.name}}
					</view>
				</view>
			</view>
		</view>

		<!-- 搜索结果为空时展示图片 -->
		<view class="noSearch" v-if="noSearch">
			<uv-empty mode="search" icon="http://cdn.uviewui.com/uview/empty/search.png"></uv-empty>
		</view>

		<!-- 有搜索结果时 -->
		<view class="content" v-else>
			<gridContent :arrs="dataList"></gridContent>

			<!-- 触底加载 -->
			<view class="loadingLayout" v-if="noData || dataList.length">
				<uni-load-more :status="noData?'noMore':'loading'" />
			</view>
		</view>

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
		onUnload,
		onReachBottom
	} from "@dcloudio/uni-app";
	import {
		apiSearch,
		apiCategories
	} from "@/api/api.js"
	//查询参数
	const queryParams = ref({
		page: 1,
		pageSize: 10,
		keyword: ""
	})

	//搜索历史词
	const historySearch = ref(uni.getStorageSync("historySearch") || []);

	//热门搜索词
	const recommendList = ref([]);

	//没有更多
	const noData = ref(false);
	//没有搜索结果
	const noSearch = ref(false);

	//搜索结果列表
	const dataList = ref([]);

	async function getHotCategories() {
		let res = await apiCategories()
		console.log("res:", res)
		recommendList.value = res.data
	}

	//点击搜索
	const onSearch = () => {
		// 全是空格也要过滤，否则会在最近搜索里显示一条空白记录
		if (queryParams.value.keyword == "" || queryParams.value.keyword.match(/^\s+$/)) {
			console.log("搜索输入为空")
			return
		}
		uni.showLoading()
		historySearch.value = [...new Set([queryParams.value.keyword, ...historySearch.value])].slice(0, 10);

		uni.setStorageSync("historySearch", historySearch.value);
		initParams(queryParams.value.keyword);
		searchData();
	}

	//点击清除按钮
	const onClear = () => {
		initParams();
	}

	//点击标签进行搜索
	const clickTab = (value) => {
		initParams(value);

		onSearch();
	}

	//点击清空搜索记录
	const removeHistory = () => {
		uni.showModal({
			title: "是否清空历史搜索？",
			success: res => {
				if (res.confirm) {
					uni.removeStorageSync("historySearch");
					historySearch.value = []
				}
			}
		})
	}

	const searchData = async () => {
		try {
			console.log("search param:", queryParams.value);
			let res = await apiSearch(queryParams.value);
			dataList.value = [...dataList.value, ...res.data];
			uni.setStorageSync("storgdataList", dataList.value);
			if (queryParams.value.pageSize > res.data.length) noData.value = true;
			if (res.data.length == 0 && dataList.value.length == 0) noSearch.value = true;
			console.log(res);
		} finally {
			uni.hideLoading()
		}
	}

	const initParams = (value = '') => {
		dataList.value = [];
		noData.value = false;
		noSearch.value = false;
		queryParams.value = {
			page: 1,
			pageSize: 12,
			keyword: value || ""
		}
	}

	//触底加载更多
	onReachBottom(() => {
		// 判断dataList.value.length是防止在搜索页面不搜索，直接上划时触发加载
		if (noData.value || dataList.value.length == 0) return;
		queryParams.value.page++
		searchData();
	})

	//关闭有页面
	onUnload(() => {
		uni.removeStorageSync("storgdataList", dataList.value);
	})

	getHotCategories()
</script>

<style lang="scss" scoped>
	.searchLayout {
		.uni-search-bar {}

		.topTitle {
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 32rpx;
			color: #999;
		}

		.history {
			padding: 30rpx;
		}

		.recommend {
			padding: 30rpx;
		}
		
		.text{
			color: black;
		}

		.tabs {
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			padding-top: 20rpx;

			.tab {
				background: #F4F4F4;
				font-size: 28rpx;
				color: #333;
				padding: 10rpx 28rpx;
				border-radius: 50rpx;
				margin-right: 20rpx;
				margin-top: 20rpx;
			}
		}
	}

	.content {
		padding: 0 15rpx;
	}
</style>