<template>
	<view class="searchLayout">
		<view class="search">
			<uni-search-bar @confirm="onSearch" @cancel="onClear" @clear="onClear" focus placeholder="搜索"
				v-model="queryParams.keyword">
			</uni-search-bar>

			<view class="filter">
				<view class="conditionList">
					<view class="condition" v-for="(keyText,index) in conditionList.keyText" :key="index">
						<view>{{keyText}} : {{conditionList.valueText.at(index)}}</view>
						<button class="deleteButton" @click="deleteCondition(index)" plain="true" size="mini">
							<uni-icons class="icon" type="closeempty" size="15"></uni-icons>
						</button>
					</view>
				</view>
				<button class="addCondition" @click="openPop()">添加过滤器</button>
			</view>


			<uni-popup ref="pop">
				<view class="box">
					<uni-data-select class="select" placeholder="请选择条件" v-model="chosenKey" :localdata="specList.value"
						@change="change"></uni-data-select>
					<uni-data-select class="select" placeholder="请选择值" v-model="chosenValue"
						:localdata="optionList"></uni-data-select>
				</view>
				<button @click="confirm()">确认</button>
			</uni-popup>
		</view>


		<view v-if="!dataList.length || noSearch">
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

			<view class="recommend">
				<view class="topTitle">
					<view class="text">热门搜索</view>
				</view>
				<view class="tabs">
					<view class="tab" v-for="tab in recommendList" :key="tab.name" @click="clickTab(tab.name)">
						{{tab.name}}
					</view>
				</view>
			</view>
		</view>


		<view class="noSearch" v-if="noSearch">
			<uv-empty mode="search" icon="http://cdn.uviewui.com/uview/empty/search.png"></uv-empty>
		</view>


		<view v-else>
			<view class="list">
				<productPreview v-for="item in dataList" :key="item.productId" :item="item"></productPreview>
			</view>
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
		apiHotCategories,
		apiGetSpecList
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
		let res = await apiHotCategories()
		console.log("res:", res)
		recommendList.value = res.data
	}

	//点击搜索
	const onSearch = () => {
		if (queryParams.value.keyword == "") {
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

	apiGetSpecList()

	const {
		specList
	} = useSpecListStore()
	const optionList = reactive([])

	let conditionList = reactive({
		key: [],
		keyText: [],
		value: [],
		valueText: []
	})

	let chosenKey = ref("")
	let chosenValue = ref("")

	function change(e) {
		let temp = specList.value.find(item => item.value == e)
		optionList.length = 0
		chosenValue.value = ""
		if (temp != null && temp.optionList != null) {
			optionList.push(...temp.optionList)
		}
	}

	const pop = ref()

	function openPop() {
		pop.value.open()
	}

	function confirm() {
		if (chosenKey.value === "" || chosenValue.value === "") {
			return
		}
		let index = conditionList.key.findIndex(item => item == chosenKey.value)
		if (index > -1) {
			console.log("条件已存在")
			return
		}

		let tempKey = specList.value.find(item => item.value == chosenKey.value)
		let tempValue = optionList.find(item => item.value == chosenValue.value)
		conditionList.key.push(chosenKey.value)
		conditionList.keyText.push(tempKey.text)
		conditionList.value.push(chosenValue.value)
		conditionList.valueText.push(tempValue.text)

		pop.value.close()
		chosenKey.value = ""
		chosenValue.value = ""
		optionList.length = 0
	}

	function deleteCondition(index) {
		conditionList.key.splice(index, 1)
		conditionList.keyText.splice(index, 1)
		conditionList.value.splice(index, 1)
		conditionList.valueText.splice(index, 1)
	}

	//触底加载更多
	onReachBottom(() => {
		if (noData.value) return;
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
		.search {
			padding: 0 10rpx;
		}

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

		.filter {
			.conditionList {
				display: flex;
				flex-wrap: wrap;
				align-items: center;
			}

			.condition {
				display: flex;
				align-items: center;
				background: #F4F4F4;
				font-size: 32rpx;
				color: #333;
				padding: 10rpx 28rpx;
				border-radius: 50rpx;
				margin-right: 20rpx;
				margin-top: 20rpx;
				gap: 10rpx;

				.deleteButton {
					border: none;

					.icon {
						width: 100%;
					}
				}
			}

			.addCondition {
				margin-top: 20rpx;
			}
		}

		.box {
			background-color: rgba(255, 255, 255, 0.9);
			width: 500rpx;
			display: flex;
			gap: 10rpx;

			.select {
				background-color: white;
			}
		}

		// .list {
		// 	display: grid;
		// 	grid-template-columns: repeat(3, 1fr);
		// 	gap: 5rpx;
		// 	padding: 20rpx 5rpx;

		// 	.item {
		// 		height: 440rpx;

		// 		image {
		// 			width: 100%;
		// 			height: 100%;
		// 			display: block;
		// 		}
		// 	}
		// }
	}
</style>