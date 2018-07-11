export default class RingBuffer<T> {

	private queue:T[]
	private head:number
	private tail:number

	constructor(size:number) {
		this.queue = new Array(size)
		this.head = 0
		this.tail = 0
	}

	isEmpty():boolean {
		return this.head === this.tail
	}

	enqueue(item:T):void {
		let newTail = (this.tail + 1) % this.queue.length
		if (newTail === this.head) {
			throw new Error('Maximum queue size exceeded')
		}

		this.queue[this.tail] = item
		this.tail = newTail
	}

	dequeue():T {
		let item = this.queue[this.head]
		this.head = (this.head + 1) % this.queue.length
		return item
	}
}