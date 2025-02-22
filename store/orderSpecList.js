import {
	defineStore
} from 'pinia'
import {
	ref
} from 'vue'

export const useOrderSpecListStore = defineStore('orderSpecList', () => {
	const orderSpecList = [{
		text: '默认',
		value: "",
		order: ""
	}]

	return {
		orderSpecList
	}
})