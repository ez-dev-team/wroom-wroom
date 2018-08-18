import * as Audio from 'engine/audio/Audio'
import * as GameLoop from 'engine/GameLoop'
import * as Game from 'game/Game'
import * as CanvasRender from 'engine/render/CanvasRender'
import {updateButtonState, updateGameInputButtonsState, GAME_INPUT, IGameButtonsEnum} from 'game/GameInput'

enum KeyboardCodes {
	A = 65,
	W = 87,
	S = 83,
	D = 68,
	LEFT_ARROW = 37,
	UP_ARROW = 38,
	RIGHT_ARROW = 39,
	DOWN_ARROW = 40,

	// may be will be needed later
	ENTER = 13,
	CTRL = 17,
	SHIFT = 16,
	SPACE = 32,
	ESCAPE = 27
}

const KEYBOARD_INPUT_TO_GAME_BUTTON_MAP = {
	[KeyboardCodes.A]: IGameButtonsEnum.LEFT,
	[KeyboardCodes.LEFT_ARROW]: IGameButtonsEnum.LEFT,
	[KeyboardCodes.W]: IGameButtonsEnum.UP,
	[KeyboardCodes.UP_ARROW]: IGameButtonsEnum.UP,
	[KeyboardCodes.D]: IGameButtonsEnum.RIGHT,
	[KeyboardCodes.RIGHT_ARROW]: IGameButtonsEnum.RIGHT,
	[KeyboardCodes.S]: IGameButtonsEnum.DOWN,
	[KeyboardCodes.DOWN_ARROW]: IGameButtonsEnum.DOWN
}

function listenToKeyboard() {
	function trySetKeyState(key:number, pressed:boolean) {
		let gameButton = KEYBOARD_INPUT_TO_GAME_BUTTON_MAP[key]
		if (gameButton) {
			updateButtonState(gameButton, pressed)
		}
	}

	document.addEventListener('keydown', (event) => {
		// TODO(kuliapin): prevent only handled events?
		event.preventDefault()
		event.stopPropagation()
		event.stopImmediatePropagation()

		let key = event.keyCode || event.which
		trySetKeyState(key, true)
		updateGameInputButtonsState() // save pressed state to be used in game tick
	}, true)

	document.addEventListener('keyup', (event) => {
		let key = event.keyCode || event.which
		trySetKeyState(key, false)
	}, true)
}

const WIDTH = 800
const HEIGHT = 600

let {canvas, ctx, resize} = CanvasRender.createCanvasRender(WIDTH, HEIGHT, window.innerWidth, window.innerHeight)
document.body.appendChild(canvas)

window.addEventListener('resize', () => {
	resize(WIDTH, HEIGHT, window.innerWidth, window.innerHeight)
})

// TODO: loading queue:
// 1. let the game push tasks to queue <=== load sounds (bg, effects), sprites, smth else
// 2. show the loading progress in the loading screen
// 3. make some logo on the loading screen?
// 4.

// may be this is overhead, may be not
let tick = GameLoop.createTickFunction({
	start: () => {
		Game.processInput(GAME_INPUT)
	},
	end: (fps) => {
		updateGameInputButtonsState() // update state, some buttons could be unpressed already
		ctx.font = "10px Arial"
		ctx.fillText(`FPS: ${fps}`,WIDTH - 50,HEIGHT - 50)
	},
	update: () => {},
	render: () => {
		ctx.clearRect(0, 0, WIDTH, HEIGHT)

		Game.render(ctx, WIDTH, HEIGHT)
	}
})

let animate = (elapsed:number) => {
	tick(elapsed)
	requestAnimationFrame(animate)
}

requestAnimationFrame(animate)
Audio.init()
listenToKeyboard()
