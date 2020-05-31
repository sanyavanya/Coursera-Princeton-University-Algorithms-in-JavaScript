const readlineSync = require("readline-sync");

class LinkedListNode {
	constructor(data) {		
		this.data = data;
		this.next = null;
	}
}

const head = Symbol("head");
const tail = Symbol("tail");
class QueueOfStrings {
	constructor() {
		this[head] = null;
		this[tail] = null;
	}

	queue(data) { // works but not sure if 100% correct implementation
		const NewNode = new LinkedListNode(data);
		// NewNode.next = th
		if (this.isEmpty()) this[head] = NewNode;
		else this[tail].next = NewNode;
		this[tail] = NewNode;
	}

	dequeue(){
		if (this.isEmpty()) return "queue is empty";
		const OutputNode = this[head];
		this[head] = this[head].next;
		return OutputNode.data;
	}

	isEmpty(){
		if (this[head] == null) return true;
		return false;
	}

	display(){
		let current = this[head];
		let outputString = '';
		while (current !== null) {
			outputString += current.data + " ";
			current = current.next;
		}
		return outputString;
	}
}

const testClient = () => {
	MyQueue = new QueueOfStrings();
	// MyQueue.queue(1);
	// MyQueue.queue(2);
	// MyQueue.queue(3);
	// console.log(MyQueue[head].data, MyQueue[tail].data);

	let s = "input string";
	while (s != "") {
		s = readlineSync.question("");
		if (s === "-") console.log(MyQueue.dequeue());
		else if (s !="") MyQueue.queue(s);
	}	
}

testClient();