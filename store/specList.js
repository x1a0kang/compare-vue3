import {
	defineStore
} from 'pinia'
import {
	ref
} from 'vue'

export const useSpecListStore = defineStore('specList', () => {
	const specList = ref([])

	return {
		specList
	}
})