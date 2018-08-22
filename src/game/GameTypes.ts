export interface IGameButton {
	pressed:boolean
}

export interface IGameController {
	moveUp:IGameButton
	moveDown:IGameButton
	moveLeft:IGameButton
	moveRight:IGameButton
	actionDown:IGameButton
	actionUp:IGameButton
	actionLeft:IGameButton
	actionRight:IGameButton
	leftShoulder:IGameButton
	rightShoulder:IGameButton
	start:IGameButton
	back:IGameButton
}

export interface IGameInput {
	controllers:IGameController[]
}

export interface IGameMemory {
	isInitialized:boolean
	playerX:number
	playerY:number
}

export interface IGameCode {
	createController():IGameController
	gameUpdate(memory:IGameMemory, input:IGameInput):void
	gameRender(memory:IGameMemory, ctx:CanvasRenderingContext2D, width:number, height:number):void
}

