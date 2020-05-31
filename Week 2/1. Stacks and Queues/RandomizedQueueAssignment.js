const readlineSync = require("readline-sync");

class LinkedListNode {
	constructor(data) {		
		this.data = data;
		this.next = null;
	}
}

const head = Symbol("head");
class RandomizedQueue {
	constructor() {
		this[head] = null;
		this.size = 0;
	}

	enqueue(data) { // works but not sure if 100% correct implementation
		const NewNode = new LinkedListNode(data);
		NewNode.next = this[head];
		this[head] = NewNode;
		this.size ++;
	}

	dequeue(){
		if (this.isEmpty()) return "randomized queue is empty";
		let rand = Math.floor(Math.random()*(this.size));
		//console.log("rand index", rand);

		let i = 0;
		let current = this[head];
		let previous = null;
		while (i < rand) {
			previous = current;
			current = current.next;		
			i++;
		}
		if (previous == null) this[head] = current.next;
		else previous.next = current.next;
		this.size--;
		return current.data;
	}

	sample(){
		if (this.isEmpty()) return "randomized queue is empty";
		let rand = Math.floor(Math.random()*(this.size));
		//console.log("sample rand index", rand);

		let i = 0;
		let current = this[head];
		let previous = null;
		while (i < rand) {
			previous = current;
			current = current.next;		
			i++;
		}
		return current.data;
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
	MyRandomizedQueue = new RandomizedQueue();
	MyRandomizedQueue.enqueue(5);
	MyRandomizedQueue.enqueue(4);
	MyRandomizedQueue.enqueue(3);
	MyRandomizedQueue.enqueue(2);
	MyRandomizedQueue.enqueue(1);
	MyRandomizedQueue.enqueue(0);
	console.log(MyRandomizedQueue.display());
	console.log(MyRandomizedQueue.dequeue());
	console.log(MyRandomizedQueue.display());
	console.log(MyRandomizedQueue.dequeue());
	console.log(MyRandomizedQueue.display());
	console.log(MyRandomizedQueue.sample());
	console.log(MyRandomizedQueue.display());

	// let s = "input string";
	// while (s != "") {
	// 	s = readlineSync.question("");
	// 	if (s === "-") console.log(MyRandomizedQueue.dequeue());
	// 	else if (s !="") MyRandomizedQueue.enqueue(s);
	// }	
}

testClient();