const readlineSync = require("readline-sync");

class LinkedListNode {
	constructor(data) {		
		this.data = data;
		this.next = null;
	}
}

const head = Symbol("head");
const S1 = Symbol("S1");
const S2 = Symbol("S2");
class QueueWithTwoStacks {
	constructor() {
		this[S1] = new StackOfStrings();
		this[S2] = new StackOfStrings();
	}

	queue(data) { // works but not sure if 100% correct implementation
		this[S1].push(data);
	}

	dequeue(){
		let output = null;
		while (!this[S1].isEmpty()) this[S2].push(this[S1].pop());
		if (!this[S2].isEmpty()) {
			output = this[S2].pop();
			while (!this[S2].isEmpty) this[S1].push(this[S2].pop());
			return output;
		}
		return "queue is empty"
		
	}

	isEmpty(){
		if (this[S2][head] == null) return true;
		return false;
	}
}

class StackOfStrings {
	constructor() {
		this[head] = null;
	}

	push(data) { // works but not sure if 100% correct implementation
		const NewNode = new LinkedListNode(data);
		NewNode.next = this[head];
		this[head] = NewNode;
	}

	pop(){
		if (this.isEmpty()) return "stack is empty";
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
	MyQueue = new QueueWithTwoStacks();
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
	console.log("S1", MyQueue[S1].display());
	console.log("S2", MyQueue[S2].display());
}

testClient();