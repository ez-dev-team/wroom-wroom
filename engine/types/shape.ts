import Vector from 'engine/types/vector'
import Projection from 'engine/types/projection'

export default class Shape {

	private vertices:Vector[] = []

	getEdgesNormals():Vector[] {
		let axes:Vector[] = []
		for (let i = 0; i < this.vertices.length; i++) {
			// get the current vertex
			let p1 = this.vertices[i]
			// get the next vertex
			let p2 = this.vertices[i + 1 == this.vertices.length ? 0 : i + 1]
			// subtract the two to get the edge vector
			let edge = p1.subtract(p2)
			// get either perpendicular vector
			let normal = edge.perp()
			// the perp method is just (x, y) => (-y, x) or (y, -x)
			axes[i] = normal
		}

		return axes
	}

	getProjection(axis:Vector):Projection {
		let normalized = axis.asNormalized()
		let min = normalized.dot(this.vertices[0])
		let max = min

		for (let i = 1; i < this.vertices.length; i++)
		{
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