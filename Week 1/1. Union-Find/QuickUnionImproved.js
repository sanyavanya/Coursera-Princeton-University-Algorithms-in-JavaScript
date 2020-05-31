// With weighting and path compression
class QuickUnionUF {
	constructor(numberOfObjects) {
		const id = [];
		const sz = [];
		const mx = [];
		for (let i=0; i<numberOfObjects; i++) {
			id.push(i);
			sz.push(1);
			mx.push(i);
		}
		this.id = id;
		this.sz = sz;
		this.mx = mx; // stores th biggest number in the component (works correctly only with root nodes - but that's all we need)
		}

	root(i) {
		while (i !== this.id[i]) {
			this.id[i] = this.id[this.id[i]]; // this line compresses paths every time you look for the root
			i = this.id[i];			
		}
		return i
	}

	connected(p, q) {
		if (this.root(p) === this.root(q)) return true;
		else return false;
	}

	union(p, q) {
		const firstRoot = this.root(p);
		const secondRoot = this.root(q);

		if (firstRoot === secondRoot) return;

		if (this.sz[firstRoot] >= this.sz[secondRoot]) {
			this.id[secondRoot] = firstRoot;
			this.sz[firstRoot] += this.sz[secondRoot];
		} else {
			this.id[firstRoot] = secondRoot;
			this.sz[secondRoot] += this.sz[firstRoot];
		}

		if (this.mx[firstRoot] > this.mx[secondRoot]) this.mx[secondRoot] = this.mx[firstRoot]; // these two lines check for the biggest number the roots of both nodes know about; then they update to this largest number
		else this.mx[firstRoot] = this.mx[secondRoot];
	}

	find(x) {
		return this.mx[this.root(x)];
	}
}

const testClient = () => {
	const MyTree = new QuickUnionUF(10);
	console.log(MyTree.id);
	MyTree.union(4, 3);
	MyTree.union(3, 8);
	MyTree.union(6, 5);
	MyTree.union(9, 4);
	MyTree.union(2, 1);
	MyTree.union(5, 0);
	MyTree.union(7, 2);
	MyTree.union(6, 1);
	MyTree.union(7, 3);
	console.log(MyTree.id);
	console.log(MyTree.connected(7, 4));
}

testClient();