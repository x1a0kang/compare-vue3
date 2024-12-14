import {
	defineStore
} from 'pinia'
import {
	ref
} from 'vue'

export const useDetailStore = defineStore('detail', () => {
	const detail = ref({})

	return {
		detail
	}
})