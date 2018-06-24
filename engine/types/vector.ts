export default class Vector {
	x:number
	y:number

	constructor(x = 0, y = 0) {
		this.x = x
		this.y = y
	}

	clone():Vector {
		return new Vector(this.x, this.y)
	}

	add(vec:Vector):Vector {
		this.x += vec.x
		this.y += vec.y
		return this
	}

	dot(vec:Vector):number {
		return this.x * vec.x + this.y * vec.y
	}

	length():number {
		return Math.sqrt(this.x * this.x + this.y * this.y)
	}

	asNormalized():Vector {
		let l = this.length()
		let x = this.x / l
		let y = this.y / l

		return new Vector(x, y)
	}

	subtract(vec:Vector):Vector {
		this.x -= vec.x
		this.y -= vec.y
		return this
	}

	perp():Vector {
		return new Vector(this.y, -this.x)
	}
}