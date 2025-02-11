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
			url: "/getSpec"
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

export function apiCategories(data = {}) {
	return request({
		url: "/getCategories",
		data
	})
}

export function apiGetOne(data = {}) {
	return request({
		url: "/getOne",
		data
	})
}

export function apiGetOneDetail(data = {}) {
	return request({
		url: "/getOneDetail",
		data
	})
}

export function apiGetList(data = {}) {
	return request({
		url: "/getListById",
		data
	})
}

export function apiGetDetailList(data = {}) {
	return request({
		url: "/getDetailListById",
		data
	})
}

export function apiGetOrderSpec(data = {}) {
	return request({
		url: "/getOrderSpec",
		data
	})
}

export function apiGetBanner(data = {}) {
	return request({
		url: "/getBanner",
		data
	})
}

export function apiViewCount(data = {}) {
	return request({
		url: "/viewCount",
		data
	})
}

export function apiAddPkCount(data = {}) {
	return request({
		url: "/addPkCount",
		data
	})
}

export function apiPkCount(data = {}) {
	return request({
		url: "/pkCount",
		data
	})
}

export function apiGetHotRank(data = {}) {
	return request({
		url: "/getHotRank",
		data
	})
}