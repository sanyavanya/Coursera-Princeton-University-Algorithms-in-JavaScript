class LinkedListNode {
	constructor(data) {		
		this.data = data;
		this.next = null;
	}
}

const head = Symbol("head");
class LinkedList {
	constructor() {
		this[head] = null;
	}

	add(data) {
		const NewNode = new LinkedListNode(data);
		if (this[head] === null) this[head] = NewNode;
		else {
			let current = this[head];
			while (current.next != null) current = current.next;
			current.next = NewNode;
		}
	}

	get(index) {
		if (index > -1) {
			let current = this[head];
			let i = 0;
			while (i < index && current != null) {
				current = current.next;
				i++;
			}
			return current != null ? current.data : undefined;
		}
		return undefined;
	}

	remove(index) {
		if (index < 0 || this[head] === null) return "error";

		if (index === 0) {
			const data = this[head].data;
			this[head] = this[head].next;
			return data;
		}
		let current = this[head];
		let i = 0;
		let previous = null;
		while (i < index && current != null) {
			previous = current;
			current = current.next;
			i++;
		}

		if (current !== null) {
			previous.next = current.next;
			return current.data;
		}
		return "not found";
	}
}