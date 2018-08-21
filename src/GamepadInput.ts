export function getGamepads():any {
	return navigator.getGamepads
		? navigator.getGamepads()
		: (navigator['webkitGetGamepads'] ? navigator['webkitGetGamepads'] : [])
}

