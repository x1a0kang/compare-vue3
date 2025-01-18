import {
	defineStore
} from 'pinia'
import {
	reactive
} from 'vue'

export const useSelectedCompareListStore = defineStore('selectedCompareList', () => {
	const selectedCompareList = reactive([])

	return {
		selectedCompareList
	}
})