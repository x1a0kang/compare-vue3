import {
	defineStore
} from 'pinia'
import {
	reactive
} from 'vue'

export const useCompareListStore = defineStore('compareList', () => {
	const compareList = reactive([])

	return {
		compareList
	}
})