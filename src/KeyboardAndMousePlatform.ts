import {GameInputButtons} from './PlatformTypes'
import * as Audio from 'engine/audio/Audio'
import * as GameLoop from 'engine/GameLoop'
import * as Game from 'game/Game'
import * as CanvasRender from 'engine/render/CanvasRender'

const WIDTH = 400
const HEIGHT = 400

enum KeyboardCodes {
	A = 65,
	W = 87,
	S = 83,
	D = 68,
	LEFT_ARROW = 37,
	UP_ARROW = 38,
	RIGHT_ARROW = 39,
	DOWN_ARROW = 40,

	ENTER = 13,
	CTRL = 17,
	SHIFT = 16,
	SPACE = 32,
	ESCAPE = 27
}

const KEYBOARD_TO_GAME_INPUT_MAP = {
	[KeyboardCodes.A]: GameInputButtons.LEFT,
	[KeyboardCodes.LEFT_ARROW]: GameInputButtons.LEFT,
	[KeyboardCodes.W]: GameInputButtons.UP,
	[KeyboardCodes.UP_ARROW]: GameInputButtons.UP,
	[KeyboardCodes.D]: GameInputButtons.RIGHT,
	[KeyboardCodes.RIGHT_ARROW]: GameInputButtons.RIGHT,
	[KeyboardCodes.S]: GameInputButtons.DOWN,
	[KeyboardCodes.DOWN_ARROW]: GameInputButtons.DOWN
}

const KEYBOARD_INPUT_MAP = new Map<GameInputButtons, boolean>()

function listenToKeyboard() {
	document.addEventListener('keydown', (event) => {
		// TODO(kuliapin): prevent only handled events?
		event.preventDefault()
		event.stopPropagation()
		event.stopImmediatePropagation()

		let key = event.keyCode || event.which
		let gameButton = KEYBOARD_TO_GAME_INPUT_MAP[key]
		if (gameButton) {
			KEYBOARD_INPUT_MAP.set(gameButton, true)
		}
	}, true)

	document.addEventListener('keyup', (event) => {
		let key = event.keyCode || event.which
		let gameButton = KEYBOARD_TO_GAME_INPUT_MAP[key]
		if (gameButton) {
			KEYBOARD_INPUT_MAP.delete(gameButton)
		}
	}, true)
}

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
		Game.processInput(KEYBOARD_INPUT_MAP)
	},
	end: (fps) => {
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
