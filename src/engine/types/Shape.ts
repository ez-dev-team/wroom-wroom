import Vector from 'engine/types/Vector'
import Projection from 'engine/types/Projection'

export default class Shape {

	vertices:Vector[] = []

	constructor(vertices:Vector[]) {
		this.vertices = vertices
	}

	getEdgesNormals():Vector[] {
		let axes:Vector[] = []
		for (let i = 0; i < this.vertices.length; i++) {
			// get the current vertex
			let p1 = this.vertices[i]
			// get the next vertex
			let p2 = this.vertices[i + 1 == this.vertices.length ? 0 : i + 1]
			// subtract the two to get the edge vector
			let edge = p2.subtract(p1)
			// get either perpendicular vector
			axes[i] = edge.left()
		}

		return axes
	}

	getProjection(axis:Vector):Projection {
		let normalized = axis.asNormalized()
		let min = Infinity
		let max = -Infinity

		for (let i = 0; i < this.vertices.length; i++) {
			let dot = normalized.dot(this.vertices[i])
			if (dot < min) {
				min = dot
			}
			if (dot > max) {
				max = dot
			}
		}

		return new Projection(min, max)
	}
}