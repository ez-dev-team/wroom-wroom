const POINTER = {
	x: 0,
	y: 0
};

export function startListen() {
	document.addEventListener('mousemove', (event) => {
		POINTER.x = event.screenX;
		POINTER.y = event.screenY;
	}, true);
	document.addEventListener('touchmove', (event) => {
		const touch = event.touches[0];
		POINTER.x = touch.screenX;
		POINTER.y = touch.screenY;
	}, true);
}

