const readlineSync = require("readline-sync");

class LinkedListNode {
	constructor(data) {		
		this.data = data;
		this.next = null;
	}
}

const head = Symbol("head");
const max = Symbol("max");
class StackOfMaxes {
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

class StackOfNumbers {
	constructor() {
		this[head] = null;
		this[max] = null;
		this.Maxes = new StackOfMaxes();
	}

	push(data) { // works but not sure if 100% correct implementation
		const NewNode = new LinkedListNode(data);
		NewNode.next = this[head];
		this[head] = NewNode;
		if (this.Maxes[head] == null) {
			console.log("first max");
			this.Maxes.push(NewNode.data);
		}
		else if (NewNode.data >= this.Maxes[head].data) {
			console.log("new max");
			this.Maxes.push(NewNode.data);
		}
	} 

	pop(){
		if (this.isEmpty()) return "stack is empty";
		const OutputNode = this[head];
		this[head] = this[head].next;
		if (OutputNode.data === this.Maxes[head].data) this.Maxes.pop();
		return OutputNode.data;
	}

	isEmpty(){
		if (this[head] == null) return true;
		return false;
	}

	maximum(){
		if (this.Maxes[head] == null) return "no maximum yet";
		else return this.Maxes[head].data;
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
	MyStack = new StackOfNumbers();

	let s = "input string";
	while (s != "") {
		s = readlineSync.question("");
		if (s === "-") console.log(MyStack.pop());
		else if (s !="") MyStack.push(s);
	}	
	console.log(MyStack.maximum());
}

testClient();