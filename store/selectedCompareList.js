import {
	defineStore
} from 'pinia'
import {
	reactive
} from 'vue'

export const useSelectedCompareListStore = defineStore('selectedCompareList', () => {
	const selectedCompareList = reactive([])

	function remove(productId) {
		const index = selectedCompareList.findIndex(
			function(temp) {
				return temp === productId
			}
		)
		if (index != -1) {
			selectedCompareList.splice(index, 1)
			uni.setStorageSync("selectedCompareList", selectedCompareList)
		}
	}
	
	function removeAll() {
		selectedCompareList.length = 0
		uni.setStorageSync("selectedCompareList", selectedCompareList)
	}

	return {
		selectedCompareList,
		remove,
		removeAll
	}
})