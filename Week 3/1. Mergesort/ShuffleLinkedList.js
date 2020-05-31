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
		this.size = 0;
	}

	push(data) { // works but not sure if 100% correct implementation
		const NewNode = new LinkedListNode(data);
		NewNode.next = this[head];
		this[head] = NewNode;
		this.size ++;
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

const merge = (List, Aux, lo, mid, hi) => {

	for (let k = lo; k <= hi; k++) aux[k] = a[k];
	let current = List[head];
	let index = 0;

	while (index < lo) current = current.next;
	let low = current;

	while (index < lo) current = current.next;
	let low = current;


	let i = lo, j = mid + 1;

	for (let k = lo; k <= hi; k++) {
		if (i > mid) a[k] = aux[j++];
		else if (j > hi) a[k] = aux[i++];
		else {
			let d2 = Math.floor(Math.random()*2);
			if (d2)	a[k] = aux[i++];
			else a[k] = aux[j++];
		}
	}
}

const mergeShuffle = (List) => {
	let N = List.size;
	Aux = new StackOfStrings();
	for (let sz = 1; sz < N; sz = sz+sz) 
		for (let lo = 0; lo < N-sz; lo += sz+sz) 
			merge(List, Aux, lo, lo+sz-1, Math.min(lo+sz+sz-1, N-1));
}

TheList = new StackOfStrings();
//AuxList = new StackOfStrings();
for (let i=20; i>=0; i--) TheList.push(i);
console.log(TheList.display());
mergeShuffle(TheList);

// let c = [];
// for (let i=0; i<20; i++) c.push(i);
// console.log(c);
// let aux = [];
// mergeShuffle(c);
// console.log(c);