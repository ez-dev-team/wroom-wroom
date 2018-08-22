import {
	IGameButton,
	IGameController,
	IGameInput,
	IGameMemory
} from './GameTypes'

class GameButton implements IGameButton {
	pressed = false
}

class GameController implements IGameController {
	moveUp = new GameButton()
	moveDown = new GameButton()
	moveLeft = new GameButton()
	moveRight = new GameButton()
	actionDown = new GameButton()
	actionUp = new GameButton()
	actionLeft = new GameButton()
	actionRight = new GameButton()
	leftShoulder = new GameButton()
	rightShoulder = new GameButton()
	start = new GameButton()
	back = new GameButton()
}

export function createController():IGameController {
	return new GameController()
}

export function gameUpdate(memory:IGameMemory, input:IGameInput) {
	if (!memory.isInitialized) {
		memory.isInitialized = true

		memory.playerX = 30
		memory.playerY = 30
	}

	let dx = 0
	let dy = 0

	function getStep() {
		return 4 //event.repeat ? 15 : 2 // just to move faster for demo purposes
	}

	input.controllers.forEach(controller => {
		if (controller.moveUp.pressed) {
			dy -= getStep()
		}
		if (controller.moveDown.pressed) {
			dy += getStep()
		}
		if (controller.moveRight.pressed) {
			dx += getStep()
		}
		if (controller.moveLeft.pressed) {
			dx -= getStep()
		}
	})

	memory.playerX += dx
	memory.playerY += dy
}

export function gameRender(memory:IGameMemory, ctx:CanvasRenderingContext2D, width:number, height:number) {
	ctx.fillStyle = '#FF0000'
	ctx.fillRect(0, 0, width, height)

	ctx.fillStyle = '#000000'
	ctx.fillRect(memory.playerX - 10, memory.playerY - 10, 20, 20)
}

