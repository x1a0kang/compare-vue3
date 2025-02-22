import {
	defineStore
} from 'pinia'
import {
	ref,
	reactive
} from 'vue'

export const useSpecListStore = defineStore('specList', () => {
	const specList = ref([])

	const headSpecName = ["brand", "position", "price", "publishDateStr"]
	const contentSpecList = reactive([])
	const headSpecList = reactive([])

	function init(data) {
		specList.value = data
		
		contentSpecList.length = 0
		headSpecList.length = 0
		specList.value.forEach((item) => {
			if (headSpecName.findIndex(name => name == item.value) === -1) {
				contentSpecList.push(item)
			} else {
				headSpecList.push(item)
			}
		})
	}

	return {
		specList,
		contentSpecList,
		headSpecList,
		init
	}
})