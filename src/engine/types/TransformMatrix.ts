// TODO (kuliapin): move to constants module
const DEGREE_TO_RADIAN = 0.017453292519943295
const EQUALITY_EPSILON = 1e-14

export default class TransformMatrix {

	private a:number
	private b:number
	private c:number
	private d:number
	private e:number
	private f:number

	constructor() {
		this.reset()
	}

	reset():TransformMatrix {
		return this.setTransform(1, 0, 0, 1, 0, 0)
	}

	rotate(angleRadians:number):TransformMatrix {
		const cos = Math.cos(angleRadians)
		const sin = Math.sin(angleRadians)
		return this.transform(cos, sin, -sin, cos, 0, 0)
	}

	rotateDeg(angle:number):TransformMatrix {
		return this.rotate(angle * DEGREE_TO_RADIAN)
	}

	scale(sx:number, sy:number):TransformMatrix {
		return this.transform(sx, 0, 0, sy, 0, 0)
	}

	skew(sx:number, sy:number):TransformMatrix {
		return this.transform(1, sy, sx, 1, 0, 0)
	}

	translate(tx:number, ty:number):TransformMatrix {
		return this.transform(1, 0, 0, 1, tx, ty)
	}

	getInverse():TransformMatrix {
		const dt = (this.a * this.d - this.b * this.c)

		return new TransformMatrix().setTransform(
			this.d / dt,
			-this.b / dt,
			-this.c / dt,
			this.a / dt,
			(this.c * this.f - this.d * this.e) / dt,
			-(this.a * this.f - this.b * this.e) / dt
		)
	}

	isIdentity():boolean {
		return (
			numbersAreEqual(this.a, 1) &&
			numbersAreEqual(this.b, 0) &&
			numbersAreEqual(this.c, 0) &&
			numbersAreEqual(this.d, 1) &&
			numbersAreEqual(this.e, 0) &&
			numbersAreEqual(this.f, 0))
	}

	isEqualTo(matrix:TransformMatrix):boolean {
		return (
			numbersAreEqual(this.a, matrix.a) &&
			numbersAreEqual(this.b, matrix.b) &&
			numbersAreEqual(this.c, matrix.c) &&
			numbersAreEqual(this.d, matrix.d) &&
			numbersAreEqual(this.e, matrix.e) &&
			numbersAreEqual(this.f, matrix.f)
		)
	}

	getInterpolated(matrix:TransformMatrix, t:number):TransformMatrix {
		return new TransformMatrix()
			.setTransform(
				interpolate(this.a, matrix.a, t),
				interpolate(this.b, matrix.b, t),
				interpolate(this.c, matrix.c, t),
				interpolate(this.d, matrix.d, t),
				interpolate(this.e, matrix.e, t),
				interpolate(this.f, matrix.f, t)
			)
	}

	// TODO (kuliapin): use Point type, or Vector?
	applyToPoint(p:{x:number, y:number}):void {
		p.x = p.x * this.a + p.y * this.c + this.e
		p.y = p.x * this.b + p.y * this.d + this.f
	}

	transform(a:number | TransformMatrix, b:number, c:number, d:number, e:number, f:number):TransformMatrix {
		if (a instanceof TransformMatrix) {
			const matrix = a
			this.transform(
				matrix.a,
				matrix.b,
				matrix.c,
				matrix.d,
				matrix.e,
				matrix.f
			)
		} else {
			this.a = this.a * a + this.c * b
			this.b = this.b * a + this.d * b
			this.c = this.a * c + this.c * d
			this.d = this.b * c + this.d * d
			this.e = this.a * e + this.c * f + this.e
			this.f = this.b * e + this.d * f + this.f
		}

		return this
	}

	setTransform(a:number, b:number, c:number, d:number, e:number, f:number):TransformMatrix {
		this.a = a
		this.b = b
		this.c = c
		this.d = d
		this.e = e
		this.f = f

		return this
	}
}

// TODO (kuliapin): move to math module
function interpolate(n1:number, n2:number, t:number) {
	return n1 + (n2 - n1) * t
}

function numbersAreEqual(n1:number, n2:number, epsilon = EQUALITY_EPSILON) {
	return Math.abs(n1 - n2) < epsilon
}
