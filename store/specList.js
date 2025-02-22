import {
	defineStore
} from 'pinia'
import {
	reactive
} from 'vue'

export const useSpecListStore = defineStore('specList', () => {
	const specList = reactive([])

	const headSpecName = ["brand", "position", "price"]
	const contentSpecList = reactive([])
	const headSpecList = reactive([])

	function init(data) {
		specList.length = 0
		specList.push(...data)

		contentSpecList.length = 0
		headSpecList.length = 0
		specList.forEach((item) => {
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