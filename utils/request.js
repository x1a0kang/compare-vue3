const BASE_URL = 'http://localhost:80/shoe';

export function request(config = {}) {
	let {
		url,
		data = {},
		method = "POST",
		header = {}
	} = config

	url = BASE_URL + url
	header['content-type'] = "application/json"

	return new Promise((resolve, reject) => {
		uni.request({
			url,
			data,
			method,
			header,
			success: res => {
				if (res.data.code === 0) {
					resolve(res.data)
				} else {
					uni.showToast({
						title: res.data.errMsg,
						icon: "none"
					})
					reject(res.data)
				}
			},
			fail: err => {
				reject(err)
			}
		})
	})
}