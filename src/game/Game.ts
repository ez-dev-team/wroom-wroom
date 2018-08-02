import Shape from 'engine/types/Shape'
import Vector from 'engine/types/Vector'
import Physics from 'engine/physics/physics'
import * as Audio from 'engine/audio/Audio'
import {GameInputButtons} from '../PlatformTypes'

class GameObject {
	constructor(
		private color:string,
		private name:string,
		public shape:Shape) {
	}

	update(input:Map<GameInputButtons, boolean>) {
		let dx = 0
		let dy = 0

		function getStep() {
			return 4 //event.repeat ? 15 : 2 // just to move faster for demo purposes
		}

		if (input.get(GameInputButtons.LEFT)) {
			dx -= getStep()
		}
		if (input.get(GameInputButtons.UP)) {
			dy -= getStep()
		}
		if (input.get(GameInputButtons.RIGHT)) {
			dx += getStep()
		}
		if (input.get(GameInputButtons.DOWN)) {
			dy += getStep()
		}

		this.shape.vertices.forEach(v => {
			v.x += dx
			v.y += dy
		})
	}

	// TODO(kuliapin): abstraction somehow
	render(ctx:CanvasRenderingContext2D) {
		let vertices = this.shape.vertices
		vertices.slice(1).forEach((v, vidx) => {
			this.drawLine(ctx, vertices[vidx], v, this.color, 1)
		})
		this.drawLine(ctx, vertices[0], vertices[vertices.length - 1], this.color, 1)
	}

	private drawLine(ctx:CanvasRenderingContext2D, v1:Vector, v2:Vector, c:string, w:number) {
		ctx.beginPath()
		ctx.lineWidth = w
		ctx.strokeStyle = c
		ctx.moveTo(v1.x, v1.y)
		ctx.lineTo(v2.x, v2.y)
		ctx.stroke()
	}
}

let OBJECTS = [
	new GameObject('#ff0000', '#rect1', new Shape([
		new Vector(10, 10),
		new Vector(40, 10),
		new Vector(40, 60),
		new Vector(10, 60)
	].reverse())),
	new GameObject('#00ff00', '#rect2', new Shape([
		new Vector(180, 170),
		new Vector(210, 170),
		new Vector(210, 220)
	].reverse()))
]

export function processInput(input:Map<GameInputButtons, boolean>) {
	let obj = OBJECTS[0]
	obj.update(input)
}

let prevCollision = false

export function render(ctx:CanvasRenderingContext2D, width:number, height:number) {
	OBJECTS.forEach(object => object.render(ctx))

	// TODO(kuliapin): physics, lol, should be before?
	for (let i = 0; i < OBJECTS.length; i++) {
		let obj1 = OBJECTS[i]
		for (let j = i + 1; j < OBJECTS.length; j++) {
			let obj2 = OBJECTS[j]

			let mtv = Physics.SAT.getMinTranslationVector(obj1.shape, obj2.shape)
			ctx.font = "10px Arial"
			ctx.fillText(`${!!mtv}`,width - 30,height - 30)

			// sound demo, playing Hit over BG music
			if (mtv) {
				if (!prevCollision) {
					Audio.playHit()
				}
				prevCollision = true
			} else {
				prevCollision = false
			}
		}
	}
}

// Implement promise queue:
// 1. loading phase - ... Loading
// 2. progress bar?
// 3. bg image
// 4. button "start" for macOS
// 5.