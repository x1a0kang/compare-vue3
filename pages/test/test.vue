<template>
	<custom-nav-bar title="产品"></custom-nav-bar>
	<view class="loadingLayout" v-if="!arrs.length && !noData">
		<uni-load-more status="loading"></uni-load-more>
	</view>
	<view class="content">
		<view class="box" v-for="item in arrs" :key="item.productId">
			<button class="jump-button" @click="jump(item)">
				<image class="image"
					src="https://www.nikon.com.cn/tmp/CN/4016499630/3760176746/3015334490/1708048789/1863000998/1666314630/3477152822.png"
					mode="aspectFill"></image>
				<br />
				<view class="mask">{{item.name}}</view>
			</button>
			<button class="add-button" @click="addToCompare(item)">
				<uni-icons type="plus"></uni-icons>
			</button>
		</view>
	</view>

	<view class="loadingLayout" v-if="arrs.length || noData">
		<uni-load-more :status="noData?'noMore':'loading'"></uni-load-more>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import {
		useCompareListStore
	} from '@/store/compareList'
	import {
		useDetailStore
	} from '@/store/detail'
	import {
		apiGetAll
	} from "@/api/api.js"
	import {
		onReachBottom
	} from '@dcloudio/uni-app';

	const arrs = ref([])
	const noData = ref(false)

	const {
		compareList
	} = useCompareListStore()
	const {
		detail
	} = useDetailStore()

	const body = {
		page: 1,
		pageSize: 10
	}

	async function getAll() {
		let res = await apiGetAll(body)
		arrs.value = [...arrs.value, ...res.data]
		if (body.pageSize > res.data.length) {
			noData.value = true
		}
	}

	function jump(item) {
		detail.value = item
		uni.navigateTo({
			url: '/pages/product/productDetail'
		});
		console.log("跳转到详情页", item.name)
	}

	function addToCompare(item) {
		const index = compareList.findIndex(
			function(temp) {
				return temp.productId === item.productId
			}
		)
		if (index != -1) {
			console.log(item.name, "已存在")
		} else {
			compareList.push(item)
			console.log("加入对比", item.name)
		}
	}

	onReachBottom(() => {
		console.log("触底了")
		if (noData.value) {
			return
		}
		body.page++
		getAll()
	})

	getAll()
</script>

<style lang="scss" scoped>
	.content {
		margin-top: 15rpx;
		padding: 0 15rpx;
		display: grid;
		gap: 15rpx;
		grid-template-columns: repeat(2, 1fr);

		.box {
			height: 400rpx;
			border-radius: 10rpx;
			overflow: hidden;
			position: relative;
			background-color: blue;

			.jump-button {
				height: 100%;
				position: relative;
			}

			.image {
				width: 100%;
				height: 300rpx;
			}

			.mask {
				width: 100%;
				height: 50rpx;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.add-button {
				width: 50rpx;
				height: 50rpx;
				position: absolute;
				bottom: 23rpx;
				right: 5rpx;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
</style>