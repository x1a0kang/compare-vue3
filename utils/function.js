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