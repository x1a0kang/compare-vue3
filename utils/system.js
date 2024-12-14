const systemInfo = uni.getSystemInfoSync()
export const getStatusBarHeight = () => systemInfo.statusBarHeight || 10


export const getTitleBarHeight = () => {
	if (uni.getMenuButtonBoundingClientRect) {
		let {
			top,
			height
		} = uni.getMenuButtonBoundingClientRect()
		return height + (top - getStatusBarHeight()) * 2
	} else {
		return 60
	}
}

export const getNavBarHeight = () => getStatusBarHeight() + getTitleBarHeight()