export interface IGameButton {
	pressed:boolean
}

export enum IGameButtonsEnum {
	LEFT = 1,
	RIGHT,
	UP,
	DOWN,
	A,
	B,
	X,
	Y
}

export interface IGameButtons {
	LEFT:IGameButton
	RIGHT:IGameButton
	UP:IGameButton
	DOWN:IGameButton
	A:IGameButton
	B:IGameButton
	X:IGameButton
	Y:IGameButton
}

export interface IGameInput {
	buttons:IGameButtons
}

export const GAME_INPUT:IGameInput = {
	buttons: {
		UP: { pressed: false },
		RIGHT: { pressed: false },
		LEFT: { pressed: false },
		DOWN: { pressed: false },
		A: { pressed: false },
		B: { pressed: false },
		Y: { pressed: false },
		X: { pressed: false }
	}
}

const BUTTONS_STATE = new Map<IGameButtonsEnum, boolean>()

export function updateButtonState(button:IGameButtonsEnum, pressed:boolean) {
	BUTTONS_STATE.set(button, pressed)
}

export function updateGameInputButtonsState() {
	function updateButtonState(gameButton:IGameButton, gameButtonEnum:IGameButtonsEnum) {
		gameButton.pressed = !!BUTTONS_STATE.get(gameButtonEnum)
	}

	updateButtonState(GAME_INPUT.buttons.UP, IGameButtonsEnum.UP)
	updateButtonState(GAME_INPUT.buttons.DOWN, IGameButtonsEnum.DOWN)
	updateButtonState(GAME_INPUT.buttons.LEFT, IGameButtonsEnum.LEFT)
	updateButtonState(GAME_INPUT.buttons.RIGHT, IGameButtonsEnum.RIGHT)
	updateButtonState(GAME_INPUT.buttons.A, IGameButtonsEnum.A)
	updateButtonState(GAME_INPUT.buttons.B, IGameButtonsEnum.B)
	updateButtonState(GAME_INPUT.buttons.X, IGameButtonsEnum.X)
	updateButtonState(GAME_INPUT.buttons.Y, IGameButtonsEnum.Y)
}