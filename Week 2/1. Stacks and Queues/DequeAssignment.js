const readlineSync = require("readline-sync");

class LinkedListNode {
	constructor(data) {		
		this.data = data;
		this.next = null;
		this.prev = null;
	}
}

const first = Symbol("first");
const last = Symbol("last");
class Deque {
	constructor() {
		this[first] = null;
		this[last] = null;
		this.size = 0;
	}

	addFirst(data) {
		const NewNode = new LinkedListNode(data);
		NewNode.next = this[first];
		this[first] = NewNode;
		if (this.size === 0) this[last] = NewNode;
		this.size ++;
	}

	addLast(data) {
		const NewNode = new LinkedListNode(data);
		NewNode.prev = this[last];
		this[last].next = NewNode;
		this[last] = NewNode;
		if (this.size === 0) this[first] = NewNode;
		this.size ++;
	}

	removeFirst(data) {
		if (this.size === 0) return "deque is empty";
		let output = this[first].data;
		this[first] = this[first].next;
		this[first].prev = null;
		this.size --;
		return output;
	}

	removeLast(data) {
		if (this.size === 0) return "deque is empty";
		let output = this[last].data;
		this[last] = this[last].prev;
		this[last].next = null;
		this.size --;
		return output;
	}

	isEmpty(){
		if (this.size === 0) return true;
		return false;
	}

	display(){
		let current = this[first];
		let outputString = '';
		while (current !== null) {
			outputString += current.data + " ";
			//console.log(current.data);
			current = current.next;

		}
		return outputString;
	}
}

const testClient = () => {
	MyDeque = new Deque();
	// console.log(MyDeque.removeFirst());
	MyDeque.addFirst(1);
	MyDeque.addFirst(2);
	MyDeque.addFirst(3);
	MyDeque.addLast(0);
	MyDeque.addFirst(4);
	MyDeque.addLast(-1);
	console.log(MyDeque.display());
	MyDeque.removeFirst();
	console.log(MyDeque.display());
	MyDeque.removeLast();
	console.log(MyDeque.display());

	console.log(MyDeque.size);
	
	//console.log(MyDeque[first].data, MyDeque[last].data);

	// let s = "input string";
	// while (s != "") {
	// 	s = readlineSync.question("");
	// 	if (s === "-") console.log(MyDeque.dequeue());
	// 	else if (s !="") MyDeque.queue(s);
	// }	
}

testClient();