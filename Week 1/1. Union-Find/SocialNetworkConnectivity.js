class socialNetwork {
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
		this.mx = mx; //stores biggest number in the component (works well only with root nodes)
		this.allConnected = false;	
		this.timestamps = 0;
		}

	root(i) {
		while (i !== this.id[i]) {
			this.id[i] = this.id[this.id[i]]; // this line compresses paths every time you look for the root
			i = this.id[i];			
		}

		return i
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

		// adding timestamp and checking if everything has been connected
		this.timestamps ++;
		if (this.sz[this.root(p)] === this.id.length) this.allConnected = true;
	}

	find(x) {
		return this.mx[this.root(x)];
	}
}


const testClient = () => {
	const tree1 = new socialNetwork(10);
	console.log(tree1.id);
	tree1.union(4, 3);
	tree1.union(3, 8);
	tree1.union(6, 5);
	tree1.union(9, 4);
	tree1.union(2, 1);
	tree1.union(5, 0);
	tree1.union(7, 2);
	tree1.union(6, 1);
	tree1.union(7, 3);

	console.log(tree1.id);

	console.log(tree1.allConnected, 'at timestamp', tree1.timestamps);
}

testClient();