export function goToHome() {
	uni.showModal({
		title: "提示",
		content: "页面有误将返回首页",
		showCancel: false,
		success: (res) => {
			if (res.confirm) {
				uni.reLaunch({
					url: "/pages/home/home"
				})
			}
		}
	})
}

export function deleteOneFromArray(arr, id) {
	const index = arr.findIndex(
		function(temp) {
			return temp === id
		}
	)
	if (index != -1) {
		arr.splice(index, 1)
	}
}