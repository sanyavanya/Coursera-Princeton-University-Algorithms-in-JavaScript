const readlineSync = require("readline-sync");

class LinkedListNode {
	constructor(data) {		
		this.data = data;
		this.next = null;
	}
}

const head = Symbol("head");
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
	MyStack = new StackOfStrings();

	let s = "input string";
	while (s != "") {
		s = readlineSync.question("");
		if (s === "-") console.log(MyStack.pop());
		else if (s !="") MyStack.push(s);
	}	
}

testClient();