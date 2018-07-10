interface IParams {
	fps?:number
	start():void
	update(elapsed:number):void
	render(interpolation:number):void
	end(actualFps:number):void
}

const MAX_LAG_FIX_STEPS_COUNT = 240
const UPDATE_FPS_TIMEOUT = 1000
const UPDATE_FPS_EXPONENTIAL_MOVING_DECAY = 0.25

export function createTickFunction(params:IParams) {
	const DESIRED_FPS = params.fps || 60
	const MS_PER_UPDATE = 1000 / DESIRED_FPS

	let prevTime = 0
	let lag = 0
	let actualFps = DESIRED_FPS
	let lastFpsUpdate = 0
	let framesThisSecond = 0

	function panic() {
		// TODO: use logger
		console.log('panic')
		// discard the unsimulated time
		lag = 0
		// ... snap the player to the authoritative state (from server or smth)
	}

	function updateActualFps(elapsed:number) {
		// update every UPDATE_FPS_TIMEOUT
		if (elapsed > lastFpsUpdate + UPDATE_FPS_TIMEOUT) {
			// compute the new actual FPS
			actualFps = UPDATE_FPS_EXPONENTIAL_MOVING_DECAY * framesThisSecond + (1 - UPDATE_FPS_EXPONENTIAL_MOVING_DECAY) * actualFps

			lastFpsUpdate = elapsed
			framesThisSecond = 0
		}
		framesThisSecond++
	}

	return (elapsed:number) => {
		// Throttle the frame rate
		if (elapsed < prevTime + MS_PER_UPDATE) {
			return
		}

		updateActualFps(elapsed)

		lag += elapsed - prevTime
		prevTime = elapsed

		// for processing inputs or smth
		params.start()

		let steps = 0
		while (lag >= MS_PER_UPDATE) {
			params.update(elapsed)
			lag -= MS_PER_UPDATE

			// Sanity check
			if (++steps >= MAX_LAG_FIX_STEPS_COUNT) {
				panic() // fix things
				break // bail out
			}
		}

		params.render(lag / elapsed)
		params.end(actualFps)
	}
}
