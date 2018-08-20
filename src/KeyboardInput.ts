export enum KeyboardCodes {
	A = 65,
	W = 87,
	S = 83,
	D = 68,
	Q = 81,
	E = 69,
	U = 85,
	I = 73,
	O = 79,
	P = 80,
	LEFT_ARROW = 37,
	UP_ARROW = 38,
	RIGHT_ARROW = 39,
	DOWN_ARROW = 40,
	SPACE = 32,
	ESCAPE = 27
}

let GAME_KEYS_STATE = new Map<number, boolean>()
const ACTUAL_KEYS_STATE = new Map<number, boolean>()

export function startListen() {
	document.addEventListener('keydown', (event) => {
		const keyCode = event.keyCode || event.which
		GAME_KEYS_STATE.set(keyCode, true)
		ACTUAL_KEYS_STATE.set(keyCode, true)
	}, true)

	document.addEventListener('keyup', (event) => {
		const keyCode = event.keyCode || event.which
		// Do not reset game keys state here to be sure that we didn't miss user input. 
		// Resetting should be done on game tick end.
		ACTUAL_KEYS_STATE.set(keyCode, false)
	}, true)
}

export function isKeyPressed(code:KeyboardCodes):boolean {
	return !!GAME_KEYS_STATE.get(code)
}

export function gameTickDone() {
	// Update game keys state to actual state when tick is done
	GAME_KEYS_STATE = new Map<number, boolean>(ACTUAL_KEYS_STATE)
}

