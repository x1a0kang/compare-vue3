import {
	useCompareListStore
} from '@/store/compareList'

const {
	compareList
} = useCompareListStore()

export function addToCompare(item) {
	const index = compareList.findIndex(
		function(temp) {
			return temp.productId === item.productId
		}
	)
	if (index != -1) {
		console.log(item.name, "已存在")
		uni.showToast({
			title: '产品已存在',
			icon: "error"
		})
	} else {
		compareList.push(item)
		console.log("加入对比", item.name)
		uni.showToast({
			title: "加入成功"
		})
	}
}

export function goToHome() {
	uni.showModal({
		title: "提示",
		content: "页面有误将返回首页",
		showCancel: false,
		success: (res) => {
			if (res.confirm) {
				uni.reLaunch({
					url: "/pages/home/home"
				})
			}
		}
	})
}