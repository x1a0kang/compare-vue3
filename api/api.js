import {
	request
} from "@/utils/request.js"
import {
	useSpecListStore
} from '@/store/specList'

const {
	specList
} = useSpecListStore()

export function apiGetBrandSplit() {
	return request({
		url: "/getBrandSplit"
	})
}

export function apiGetBrand() {
	return request({
		url: "/getBrand"
	})
}

export async function apiGetSpecList() {
	if (undefined === specList.value) {
		let res = await request({
			url: "/getCameraSpec"
		})
		specList.value = res.data
		console.log("缓存内specList为空，请求接口")
	}
}

export function apiGetAll(data = {}) {
	return request({
		url: "/getAll",
		data
	})
}

export function apiSearch(data = {}) {
	return request({
		url: "/search",
		data
	})
}

export function apiSearchByFilter(data = {}) {
	return request({
		url: "/searchByFilter",
		data
	})
}

export function apiHotCategories(data = {}) {
	return request({
		url: "/getHotCategories",
		data
	})
}

export function apiGetOne(data = {}) {
	return request({
		url: "/getOne",
		data
	})
}

export function apiGetList(data = {}) {
	return request({
		url: "/getListById",
		data
	})
}