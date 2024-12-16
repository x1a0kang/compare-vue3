import {
	request
} from "@/utils/request.js"

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