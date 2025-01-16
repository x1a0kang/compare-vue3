import {
	defineStore
} from 'pinia'
import {
	reactive
} from 'vue'

export const useCompareListStore = defineStore('compareList', () => {
	const compareList = reactive(uni.getStorageSync("compareList") || [])

	function add(item) {
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
			uni.setStorageSync("compareList", compareList)
			console.log("加入对比", item.name)
			uni.showToast({
				title: "加入成功"
			})
		}
	}

	function remove(item) {
		const index = compareList.findIndex(
			function(temp) {
				return temp.productId === item.productId
			}
		)
		if (index != -1) {
			compareList.splice(index, 1)
			uni.setStorageSync("compareList", compareList)
			uni.showToast({
				title: "删除成功"
			})
		}
	}

	function removeAll() {
		compareList.length = 0
		uni.setStorageSync("compareList", compareList)
		uni.showToast({
			title: "删除成功"
		})
	}

	return {
		compareList,
		add,
		remove,
		removeAll
	}
})