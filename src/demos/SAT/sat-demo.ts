import Shape from 'engine/types/Shape'
import Vector from 'engine/types/Vector'
import Physics from 'engine/physics/physics'

const WIDTH = 400
const HEIGHT = 400
const STEP_SIZE = 4 // px

export function render(container:HTMLElement) {
	let items = {
		colors: ['#ff0000', '#00ff00'],
		names: ['rect1', 'rect2'],
		shapes: [
			[new Shape([
				new Vector(0, 0),
				new Vector(30, 0),
				new Vector(30, 50),
				new Vector(0, 50)
			].reverse())],
			[new Shape([
				new Vector(0, 0),
				new Vector(30, 0),
				new Vector(30, 50),
				new Vector(0, 50)
			].reverse())]
		]
	}

	let canvas = document.createElement('canvas')
	canvas.width = WIDTH
	canvas.height = HEIGHT
	container.appendChild(canvas)

	let ctx = canvas.getContext('2d')!

	let animate = () => {
		ctx.clearRect(0, 0, WIDTH, HEIGHT)

		items.shapes.forEach((shapes, idx) => {
			stochasticCoordsUpdate(shapes)

			let color = items.colors[idx]
			shapes.forEach(shape => {
				shape.vertices.slice(1).forEach((v, vidx) => {
					drawLine(ctx, shape.vertices[vidx], v, color, 1)
				})
				drawLine(ctx, shape.vertices[0], shape.vertices[shape.vertices.length - 1], color, 1)
			})
		})

		for (let i = 0; i < items.shapes.length; i++) {
			let shapes1 = items.shapes[i]
			for (let j = i + 1; j < items.shapes.length; j++) {
				let shapes2 = items.shapes[j]

				let anyIntersections = false
				for (let s1 = 0; s1 < shapes1.length; s1++) {
					let shape1 = shapes1[s1]
					for (let s2 = 0; s2 < shapes2.length; s2++) {
						let shape2 = shapes2[s2]
						let mtv = Physics.SAT.getMinTranslationVector(shape1, shape2)
						if (mtv) {
							anyIntersections = true
							break
						}
					}
					if (anyIntersections) {
						break
					}
				}

				ctx.font = "10px Arial"
				ctx.fillText(`${anyIntersections}`,WIDTH - 30,HEIGHT - 30)
			}
		}

		requestAnimationFrame(animate)
	}

	animate()
}

let stepsCount = 0
let negative = false

function stochasticCoordsUpdate(shapes:Shape[]) {
	let dx = Math.round(Math.random() * STEP_SIZE)
	let dy = Math.round(Math.random() * STEP_SIZE)

	stepsCount += negative ? -1 : 1
	if (stepsCount > 10) {
		negative = true
		stepsCount = 9
	}
	if (stepsCount < 0) {
		negative = false
		stepsCount = 1
	}
	if (negative) {
		dx *= -1
		dy *= -1
	}

	shapes.forEach(shape => {
		let vertices:Vector[] = []

		shape.vertices.forEach(v => {
			let newX = v.x + dx
			let newY = v.y + dy
			if (newX > 0 && newX < WIDTH && newY > 0 && newY < HEIGHT) {
				vertices.push(new Vector(newX, newY))
			}
		})

		if (vertices.length === shape.vertices.length) {
			shape.vertices = vertices
		}
	})
}

function drawLine(ctx:CanvasRenderingContext2D, v1:Vector, v2:Vector, c:string, w:number) {
	ctx.beginPath()
	ctx.lineWidth = w
	ctx.strokeStyle = c
	ctx.moveTo(v1.x, v1.y)
	ctx.lineTo(v2.x, v2.y)
	ctx.stroke()
}
