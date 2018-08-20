import * as PointerInput from './PointerInput'
import * as KeyboardInput from './KeyboardInput'
import * as GamepadInput from './GamepadInput'
import * as GameLoop from 'engine/GameLoop'
import {GameController, IGameInput, gameUpdate, gameRender} from 'game/Game'

const PIXEL_RATIO = window.devicePixelRatio || 1
const TARGET_MS_PER_FRAME = 1000 / 60
const WIDTH = 800
const HEIGHT = 600

const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')!
document.body.appendChild(canvas)

// for sprites scaled up to retina resolution
ctx.mozImageSmoothingEnabled = false
ctx.imageSmoothingEnabled = false

function resizeCanvas(width:number,
				height:number,
				outputWidth:number,
				outputHeight:number) {
	const scaleX = outputWidth / width
	const scaleY = outputHeight / height

	canvas.width = scaleX * width * PIXEL_RATIO
	canvas.height = scaleY * height * PIXEL_RATIO
	canvas.style.width = `${scaleX * width}px`
	canvas.style.height = `${scaleY * height}px`
	ctx.scale(scaleX * PIXEL_RATIO, scaleY * PIXEL_RATIO)
}

// resize to fit window
resizeCanvas(WIDTH, HEIGHT, window.innerWidth, window.innerHeight)
window.addEventListener('resize', () => {
	resizeCanvas(WIDTH, HEIGHT, window.innerWidth, window.innerHeight)
})

// TODO: loading queue:
// 1. let the game push tasks to queue <=== load sounds (bg, effects), sprites, smth else
// 2. show the loading progress in the loading screen
// 3. make some logo on the loading screen?
// 4.

// TODO: Game memory struct
// TODO: Hot reloading for game code (websockets?)
const GAME_INPUT:IGameInput = {
	controllers: [
		new GameController()
	]
}

function processKeyboardInputs() {
	const keyboardController = GAME_INPUT.controllers[0]
	keyboardController.moveLeft.pressed = KeyboardInput.isKeyPressed(KeyboardInput.KeyboardCodes.A)
		|| KeyboardInput.isKeyPressed(KeyboardInput.KeyboardCodes.LEFT_ARROW)
	keyboardController.moveRight.pressed = (KeyboardInput.isKeyPressed(KeyboardInput.KeyboardCodes.D)
		|| KeyboardInput.isKeyPressed(KeyboardInput.KeyboardCodes.RIGHT_ARROW))
	keyboardController.moveUp.pressed = (KeyboardInput.isKeyPressed(KeyboardInput.KeyboardCodes.W)
		|| KeyboardInput.isKeyPressed(KeyboardInput.KeyboardCodes.UP_ARROW))
	keyboardController.moveDown.pressed = (KeyboardInput.isKeyPressed(KeyboardInput.KeyboardCodes.S)
		|| KeyboardInput.isKeyPressed(KeyboardInput.KeyboardCodes.DOWN_ARROW))
	keyboardController.leftShoulder.pressed = (KeyboardInput.isKeyPressed(KeyboardInput.KeyboardCodes.Q))
	keyboardController.rightShoulder.pressed = (KeyboardInput.isKeyPressed(KeyboardInput.KeyboardCodes.E))
	keyboardController.actionLeft.pressed = (KeyboardInput.isKeyPressed(KeyboardInput.KeyboardCodes.U))
	keyboardController.actionDown.pressed = (KeyboardInput.isKeyPressed(KeyboardInput.KeyboardCodes.I))
	keyboardController.actionUp.pressed = (KeyboardInput.isKeyPressed(KeyboardInput.KeyboardCodes.O))
	keyboardController.actionRight.pressed = (KeyboardInput.isKeyPressed(KeyboardInput.KeyboardCodes.P))
	keyboardController.start.pressed = (KeyboardInput.isKeyPressed(KeyboardInput.KeyboardCodes.SPACE))
	keyboardController.back.pressed = (KeyboardInput.isKeyPressed(KeyboardInput.KeyboardCodes.ESCAPE))
	KeyboardInput.gameTickDone()
}

function processGamepadInput() {
	GamepadInput.getGamepads().forEach((gamepad, gamepadIndex) => {
		const controllerIndex = gamepadIndex + 1
		let gamepadController = GAME_INPUT.controllers[controllerIndex] // NOTE: +1 because zero is for controller
		if (!gamepadController) {
			gamepadController = new GameController()
			GAME_INPUT.controllers[controllerIndex] = gamepadController
		}
		// ases = number[4]
		// axes[0] => -y
		// axes[1] => +x
		// axes[2] => +y
		// axes[3] => -x
		// buttons = {pressed:boolean, value:number}[17]. TODO: how to figure out what are they? :D Are they static? Or i need to calibrate it every time?

		const axes = gamepad && gamepad.connected ? gamepad.axes : new Array(4).fill(0)
		const stick_threshold = 0.1
		gamepadController.moveLeft.pressed = axes[3] < - stick_threshold
		gamepadController.moveRight.pressed = axes[1] > stick_threshold
		gamepadController.moveUp.pressed = axes[0] < -stick_threshold
		gamepadController.moveDown.pressed = axes[2] > stick_threshold 
		gamepadController.leftShoulder.pressed = false
		gamepadController.rightShoulder.pressed = false
		gamepadController.actionLeft.pressed = false
		gamepadController.actionDown.pressed = false
		gamepadController.actionUp.pressed = false
		gamepadController.actionRight.pressed = false
		gamepadController.start.pressed = false
		gamepadController.back.pressed = false
	})
}

let tick = GameLoop.createTickFunction({
	start: () => {
		processKeyboardInputs()
		gameUpdate(GAME_INPUT)
	},
	update: () => {
	},
	// TODO: fix frame rate, join the update+render functions
	render: () => {
		ctx.clearRect(0, 0, WIDTH, HEIGHT)
		gameRender(ctx, WIDTH, HEIGHT)
	},
	end: (fps) => {
		ctx.font = "10px Arial"
		ctx.fillText(`FPS: ${fps}`,WIDTH - 50,HEIGHT - 50)
	}
})

let animate = (elapsed:number) => {
	tick(elapsed)
	requestAnimationFrame(animate)
}

requestAnimationFrame(animate)

KeyboardInput.startListen()
PointerInput.startListen()
GamepadInput.startListen()

