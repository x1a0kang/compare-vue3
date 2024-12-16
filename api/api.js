import {
	request
} from "@/utils/request.js"

export function apiGetBrand() {
	return request({
		url: "/getBrand"
	})
}

export function apiGetSpecs() {
	return request({
		url: "/getCameraSpec"
	})
}

export function apiGetAll(data = {}) {
	return request({
		url: "/getAll",
		data
	})
}

export function apiSearchData(data = {}) {
	return request({
		url: "/search",
		data
	})
}

export function apiHotCategories(data = {}) {
	return request({
		url: "/getHotCategories",
		data
	})
}