const pixelRatio = window.devicePixelRatio || 1

export function createCanvasRender(width:number, height:number, outputWidth:number, outputHeight:number) {
	let canvas = document.createElement('canvas')
	let ctx = canvas.getContext('2d')!

	// for sprites scaled up to retina resolution
	ctx.mozImageSmoothingEnabled = false
	ctx.imageSmoothingEnabled = false

	resize(canvas, ctx, width, height, outputWidth, outputHeight)

	return {
		resize: (w:number, h:number, ow:number, oh:number) => resize(canvas, ctx, w, h, ow, oh),
		canvas,
		ctx
	}
}

function resize(canvas:HTMLCanvasElement,
				ctx:CanvasRenderingContext2D,
				width:number,
				height:number,
				outputWidth:number,
				outputHeight:number) {
	let scaleX = outputWidth / width
	let scaleY = outputHeight / height

	canvas.width = scaleX * width * pixelRatio
	canvas.height = scaleY * height * pixelRatio
	canvas.style.width = `${scaleX * width}px`
	canvas.style.height = `${scaleY * height}px`
	ctx.scale(scaleX * pixelRatio, scaleY * pixelRatio)
}
