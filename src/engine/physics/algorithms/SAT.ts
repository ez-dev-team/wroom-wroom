/**
 * Separating axis theorem.
 * More info: http://www.dyn4j.org/2010/01/sat/
 */

import Shape from 'engine/types/Shape'
import Vector from 'engine/types/Vector'
import Projection from 'engine/types/Projection'

// TODO: Axes - separate type?
// TODO: depends on (0,0) position? or not?

export function getMinTranslationVector(shape1:Shape, shape2:Shape):{axis:Vector, overlap:number} | null {
	let minOverlap = Infinity
	let minAxis:Vector | null = null

	function processAxes(axes:Vector[]):boolean {
		for (let i = 0; i < axes.length; i++) {
			const axis:any = axes[i]
			const overlap = getOverlap(shape1, shape2, axis)
			if (!overlap) {
				return false
			}

			if (overlap < minOverlap) {
				minOverlap = overlap
				minAxis = axis
			}
		}

		return true
	}

	let overlap = processAxes(shape1.getEdgesNormals())
	if (!overlap) {
		return null
	}

	overlap = processAxes(shape2.getEdgesNormals())
	if (!overlap) {
		return null
	}

	/*// make sure the vector is pointing from shape1 to shape2
	Vector2 c1 = transform1.getTransformed(convex1.getCenter());
	Vector2 c2 = transform2.getTransformed(convex2.getCenter());
	Vector2 cToc = c1.to(c2);
	if (cToc.dot(n) < 0) {
		// negate the normal if its not
		n.negate();
	}*/

	if (minAxis) {
		return {axis:minAxis, overlap:minOverlap}
	} else {
		return null
	}
}

function fixOverlapIfOneShapeContainsAnother(p1:Projection, p2:Projection, overlap:number, axis:Vector):number {
	if (p1.contains(p2) || p2.contains(p1)) {
		// get the overlap plus the distance from the minimum end points
		const mins = Math.abs(p1.min - p2.min)
		const maxs = Math.abs(p1.max - p2.max)
		if (mins < maxs) {
			// TODO: negate method
			axis.x = -axis.x
			axis.y = -axis.y
			overlap += mins
		} else {
			overlap += maxs
		}
	}

	return overlap
}

function getOverlap(shape1:Shape, shape2:Shape, axis:Vector):number {
	const projection1 = shape1.getProjection(axis)
	const projection2 = shape2.getProjection(axis)
	let overlap = projection1.getOverlap(projection2)
	overlap = fixOverlapIfOneShapeContainsAnother(projection1, projection2, overlap, axis)
	return overlap
}
