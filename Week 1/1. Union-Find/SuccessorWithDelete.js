class Set {
	constructor(numberOfObjects) {
		const parent = [];
		const treeSize = [];
		const max = [];
		for (let i = 0; i < numberOfObjects; i++) {
			parent.push(i);
			treeSize.push(1);
			max.push(i);
		}
		this.parent = parent;
		this.treeSize = treeSize;
		this.max = max; //stores biggest number in the component (works well only with root nodes)
	}

	root(i) {
		while (i !== this.parent[i]) {
			this.parent[i] = this.parent[this.parent[i]]; // this line compresses paths every time you look for the root
			i = this.parent[i];			
		}

		return i
	}

	remove(p) {
		let q = p+1;
		const firstRoot = this.root(p);
		const secondRoot = this.root(q);

		if (firstRoot === secondRoot) return;

		if (this.treeSize[firstRoot] >= this.treeSize[secondRoot]) {
			this.parent[secondRoot] = firstRoot;
			this.treeSize[firstRoot] += this.treeSize[secondRoot];
		} else {
			this.parent[firstRoot] = secondRoot;
			this.treeSize[secondRoot] += this.treeSize[firstRoot];
		}

		if (this.max[firstRoot] > this.max[secondRoot]) this.max[secondRoot] = this.max[firstRoot]; // these two lines check for the biggest number the roots of both nodes know about; then they update to this largest number
		else this.max[firstRoot] = this.max[secondRoot];
	}

	successor(x) {
		return this.max[this.root(x)];
	}
}


const testClient = () => {
	const Set2 = new Set(10);
	console.log(Set2.parent);
	Set2.remove(4);
	Set2.remove(6);
	Set2.remove(5);

	console.log(Set2.parent);

	console.log(Set2.successor(4));
}

testClient();