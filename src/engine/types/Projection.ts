export default class Projection {
	min:number
	max:number

	constructor(min = 0, max = 0) {
		this.min = min
		this.max = max
	}

	overlaps(projection:Projection):boolean {
		return !(this.max < projection.min || this.min > projection.max)
	}

	contains(projection:Projection):boolean {
		return this.min < projection.min && this.max > projection.max
	}

	getOverlap(projection:Projection):number {
		return Math.max(0, Math.min(this.max, projection.max) - Math.max(this.min, projection.min))
	}
}