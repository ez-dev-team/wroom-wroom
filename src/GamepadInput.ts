const GAMEPADS_COUNT = (navigator.getGamepads
	? navigator.getGamepads()
	: (navigator['webkitGetGamepads'] ? navigator['webkitGetGamepads'] : [])).length
let GAMEPADS:(Gamepad|null)[] = new Array(GAMEPADS_COUNT).fill(null)

export function startListen() {
	window.addEventListener("gamepadconnected", event => gamepadHandler(event, true))
	window.addEventListener("gamepaddisconnected", event => gamepadHandler(event, false))
}

function gamepadHandler(event:any, connecting:boolean) {
	const gamepad = event.gamepad

	if (gamepad.index > GAMEPADS.length - 1) {
		throw new Error('Initial gamepads count is invalid')
	}
	GAMEPADS[gamepad.index] = gamepad
}

export function getGamepads():(Gamepad|null)[] {
	return GAMEPADS
}
