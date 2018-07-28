import Shape from 'engine/types/Shape'
import Vector from 'engine/types/Vector'
import Physics from 'engine/physics/physics'
import * as CanvasRender from 'engine/render/CanvasRender'
import * as GameLoop from 'engine/GameLoop'

enum KeyboardCodes {
	LEFT_ARROW = 37,
	UP_ARROW = 38,
	RIGHT_ARROW = 39,
	DOWN_ARROW = 40
}

interface IKeyboardEvent {
	key:number
	repeat:boolean
	ctrlKey:boolean
	altKey:boolean
	shiftKey:boolean
	metaKey:boolean // TODO(kuliapin): remove? combine with ctrl key depending on OS (Win/Mac)
}

class GameObject {
	constructor(
		private color:string,
		private name:string,
		public shape:Shape) {
	}

	// TODO (kuliapin): separate function for input handling?
	update(events:IKeyboardEvent[]) {
		let dx = 0
		let dy = 0

		function getStep(event:IKeyboardEvent) {
			return event.repeat ? 15 : 2 // just to move faster for demo purposes
		}

		// TODO (kuliapin): use state machine
		events.forEach(event => {
			if (event.key === KeyboardCodes.LEFT_ARROW) {
				if (event.repeat) {
				}
				dx -= getStep(event)
			}
			if (event.key === KeyboardCodes.UP_ARROW) {
				dy -= getStep(event)
			}
			if (event.key === KeyboardCodes.RIGHT_ARROW) {
				dx += getStep(event)
			}
			if (event.key === KeyboardCodes.DOWN_ARROW) {
				dy += getStep(event)
			}
		})

		if (!dx && !dy) {
			return
		}

		let vertices:Vector[] = []

		this.shape.vertices.forEach(v => {
			let newX = v.x + dx
			let newY = v.y + dy
			if (newX > 0 && newX < WIDTH && newY > 0 && newY < HEIGHT) {
				vertices.push(new Vector(newX, newY))
			}
		})

		if (vertices.length === this.shape.vertices.length) {
			this.shape.vertices = vertices
		}
	}

	// TODO(kuliapin): abstraction somehow
	render(ctx:CanvasRenderingContext2D) {
		let vertices = this.shape.vertices
		vertices.slice(1).forEach((v, vidx) => {
			drawLine(ctx, vertices[vidx], v, this.color, 1)
		})
		drawLine(ctx, vertices[0], vertices[vertices.length - 1], this.color, 1)
	}
}

const WIDTH = 400
const HEIGHT = 400

export function render(container:HTMLElement) {
	let objects = [
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

	let {canvas, ctx} = CanvasRender.createCanvasRender(WIDTH, HEIGHT, WIDTH, HEIGHT)
	container.appendChild(canvas)

	let render = () => {
		ctx.clearRect(0, 0, WIDTH, HEIGHT)

		objects.forEach(object => object.render(ctx))

		// TODO(kuliapin): physics, lol, should be before?
		for (let i = 0; i < objects.length; i++) {
			let obj1 = objects[i]
			for (let j = i + 1; j < objects.length; j++) {
				let obj2 = objects[j]

				let mtv = Physics.SAT.getMinTranslationVector(obj1.shape, obj2.shape)
				ctx.font = "10px Arial"
				ctx.fillText(`${!!mtv}`,WIDTH - 30,HEIGHT - 30)
			}
		}
	}

	let keyboardEvents:IKeyboardEvent[] = []

	document.addEventListener('keydown', (event) => {
		// TODO(kuliapin): prevent only handled events?
		event.preventDefault()
		event.stopPropagation()
		event.stopImmediatePropagation()

		let key = event.keyCode || event.which
		keyboardEvents.push({
			key: key,
			repeat: event.repeat,
			altKey: event.altKey,
			ctrlKey: event.ctrlKey,
			shiftKey: event.shiftKey,
			metaKey: event.metaKey
		})
	}, true)

	let tick = GameLoop.createTickFunction({
		start: () => {
			let obj = objects[0]
			obj.update(keyboardEvents.slice())
		},
		end: (fps) => {
			ctx.font = "10px Arial"
			ctx.fillText(`FPS: ${fps}`,WIDTH - 50,HEIGHT - 50)
			keyboardEvents.length = 0
		},
		update: () => {},
		render: () => render()
	})

	let animate = (elapsed:number) => {
		tick(elapsed)
		requestAnimationFrame(animate)
	}

	requestAnimationFrame(animate)
}

function drawLine(ctx:CanvasRenderingContext2D, v1:Vector, v2:Vector, c:string, w:number) {
	ctx.beginPath()
	ctx.lineWidth = w
	ctx.strokeStyle = c
	ctx.moveTo(v1.x, v1.y)
	ctx.lineTo(v2.x, v2.y)
	ctx.stroke()
}
