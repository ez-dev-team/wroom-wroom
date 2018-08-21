export class GameButton {
	pressed = false
}

export class GameController {
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

export interface IGameInput {
	controllers:GameController[]
}

const PLAYER = { x: 30, y: 30 }

export function gameUpdate(input:IGameInput) {
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

	PLAYER.x += dx
	PLAYER.y += dy
}

export function gameRender(ctx:CanvasRenderingContext2D, width:number, height:number) {
	ctx.fillStyle = '#EEEEEE'
	ctx.fillRect(0, 0, width, height)

	ctx.fillStyle = '#000000'
	ctx.fillRect(PLAYER.x - 10, PLAYER.y - 10, 20, 20)
}

