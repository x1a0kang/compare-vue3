<template>
	<view class="layout pageBg">
		<!-- 头部标题 -->
		<view class="head">
			<view v-for="item in compareTempList" :key="item.productId">
				<view class="title">
					<view>{{item.name}}</view>
					<view class="icon" @click="deleteTemp(item.productId)">
						<uni-icons type="closeempty" color="#fff"></uni-icons>
					</view>
				</view>
			</view>
		</view>

		<view class="image">
			<view class="imageBox" v-for="item in compareTempList" :key="item.productId">
				<view class="swiper shadow">
					<mySwiper :imageList="item.imageList"></mySwiper>
				</view>
			</view>
		</view>

		<view class="content">
			<tabList :arrs="tabs"></tabList>

			<view class="row" v-for="spec in specList">
				<view v-for="item in compareTempList" :key="item.productId">
					<view class="pair">
						<view class="key">
							{{spec.text}}
							<uni-icons v-if="spec.description" custom-prefix="iconfont" type="icon-question-circle"
								size="16" @click="openPop(spec.description)">
							</uni-icons>
						</view>
						<view class="value">{{item[spec.value]}}{{spec.unit}}</view>
					</view>
				</view>
			</view>

		</view>


		<uni-popup ref="pop" type="bottom" background-color="white" border-radius="10px 10px 0 0">
			<view class="content-text">{{ popupContent }}</view>
		</uni-popup>
	</view>
</template>

<script setup>
	import {
		useSpecListStore
	} from '@/store/specList'
	import {
		apiGetSpecList,
		apiGetDetailList
	} from '@/api/api.js'
	import {
		ref,
		reactive
	} from 'vue'
	import {
		onLoad,
		onShareAppMessage,
		onShareTimeline
	} from '@dcloudio/uni-app'

	const tabs = [{
		"name": "详细参数"
	}]
	const {
		specList
	} = useSpecListStore()

	let idList = []
	const compareTempList = reactive([])

	apiGetSpecList()

	async function getList() {
		let data = {}
		data.idList = idList
		let res = await apiGetDetailList(data)
		compareTempList.push(...res.data)
	}

	function deleteTemp(id) {
		const index = compareTempList.findIndex(
			function(temp) {
				return temp.productId === id
			}
		)
		if (index != -1) {
			compareTempList.splice(index, 1)
		}
		console.log("compareTempList.length", compareTempList.length)
		if (compareTempList.length < 2) {
			uni.switchTab({
				url: "/pages/compare/compareList"
			})
		}
	}

	const pop = ref()
	const popupContent = ref('')

	function openPop(text) {
		popupContent.value = text
		pop.value.open()
	}

	onLoad((e) => {
		let {
			idListStr = null
		} = e
		// id不存在时返回首页
		if (!idListStr) {
			goToHome()
			return
		}
		idList = idListStr.split(',')
		getList()
	})

	// 分享给好友
	onShareAppMessage(() => {
		return {
			title: "我正在对比跑鞋，快来看看吧",
			path: "/pages/compare/compare?idListStr=" + idList.toString()
		}
	})

	// 分享到朋友圈
	onShareTimeline(() => {
		return {
			title: "我正在对比跑鞋，快来看看吧",
			query: "idListStr=" + idList.toString()
		}
	})
</script>

<style lang="scss" scoped>
	.layout {
		display: flex;
		flex-direction: column;
		overflow-x: auto;
		padding: 0 10rpx 15rpx 10rpx;
		min-height: 100vh;
	}

	.head {
		display: flex;
		// background-color: red;
	}

	.title {
		height: 100%;
		width: 48vw;
		text-align: center;
		font-size: 22px;
		font-weight: bold;
		color: $theme-font-color;
		border-radius: 20rpx;
		background: $theme-color;
		padding: 20rpx 30rpx;
		position: relative;
		margin-top: 1rpx;
		margin-right: 10rpx;
		display: flex;
		align-items: center;
		justify-content: center;

		.icon {
			position: absolute;
			top: -10rpx;
			right: 10rpx;
		}
	}

	.image {
		display: flex;
		margin-top: 15rpx;
	}

	.swiper {
		width: 48vw;
		height: 350rpx;
		background: #fff;
		border-radius: 20rpx;
		margin-right: 10rpx;
	}

	.content {
		width: fit-content;
		display: flex;
		flex-direction: column;
		border-radius: 20rpx;
		overflow: hidden;
		// background-color: red;
	}

	.row {
		display: flex;
		// background-color: red;
		gap: 10rpx;
	}

	.pair {
		display: flex;
		flex-direction: column;
		align-items: center;
		// margin-right: 10rpx;
		width: 48vw;
		height: 100%;
		// background-color: blue;
		text-align: center;
		padding: 20rpx 10rpx;
		background: #fff;
		// border-radius: 20rpx;
	}

	.key {
		margin-bottom: 10rpx;
	}

	.value {
		font-weight: bold;
	}

	.content-text {
		padding: 10rpx 30rpx;
		text-indent: 2em;
		line-height: 2;
	}
</style>