export default class Point {
	x:number
	y:number

	constructor(x = 0, y = 0) {
		this.x = x
		this.y = y
	}

	clone():Point {
		return new Point(this.x, this.y)
	}
}