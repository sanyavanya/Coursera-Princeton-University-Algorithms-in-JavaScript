class Grid {
	constructor(n) {
		this.n = n;
		this.nSquared = n*n;

		this.id = [];
		this.sz = [];
		this.openness = [];
		this.full = [];

		this.openSites = 0;
		for (let i = 0; i < this.nSquared+2; i++) {
			this.id.push(-1);
			this.sz.push(1);
			this.openness.push(false);
			this.full.push(false);
		}

		this.id[0] = 0;
		this.id[this.nSquared+1] = this.nSquared+1;
	}

	// Union-Find Methods
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
	}

	connected(p, q) {
		if (this.root(p) === this.root(q)) return true;
		return false;
	}

	// Percolation Methods
	display() {
		console.log('        ', this.id[0]);
		for (let i = 0; i < this.n; i++) console.log(this.id.slice(i*this.n+1,i*this.n+this.n+1));
		console.log('         ', this.id[this.nSquared+1]);
	}

	displayOpenness() {
		console.log('        ', this.openness[0]);
		for (let i = 0; i < this.n; i++) console.log(this.openness.slice(i*this.n+1,i*this.n+this.n+1));
		console.log('         ', this.openness[this.nSquared+1]);
	}

	areConnected(row1, col1, row2, col2) {
		let first = 1 + (row1-1)*this.n + col1-1;
		let second = 1 + (row2-1)*this.n + col2-1;
		return this.connected(first,second);
	}

	open(row, col) {
		if (row > this.n || row < 1 || col > this.n || col < 1) console.log("wrong input");
		else {
			let current = 1 + (row-1)*this.n + col-1;
			let left = (1 + (row-1)*this.n + col-1) - 1; 
			let right = (1 + (row-1)*this.n + col-1) + 1; 
			let top = (1 + (row-1)*this.n + col-1) - this.n;
			let bottom = (1 + (row-1)*this.n + col-1) + this.n;

			this.id[current] = current;
			this.openSites++;
			if (row === 1) this.union(current, 0); // attaches first row open sites to the "top"
			if (row === this.n) this.union(current, this.nSquared+1); // attaches last  row open sites to the "bottom"


			if (col < this.n && this.isOpen(row, col + 1)) this.union(current, right);
			if (col > 1 && this.isOpen(row, col - 1)) this.union(current, left);
			if (row < this.n && this.isOpen(row + 1, col)) this.union(current, bottom);
			if (row > 1 && this.isOpen(row - 1, col)) this.union(current, top);
		}
	}

	isOpen(row, col) {
		if (row > this.n || row < 1 || col > this.n || col < 1) console.log("wrong input");
		else {
			let current = 1 + (row-1)*this.n + col-1;
			if (this.id[current] != -1) return true;
			return false;
		}
	}

	isFull(row, col) {
		if (row > this.n || row < 1 || col > this.n || col < 1) console.log("wrong input");
		else {
			let current = 1 + (row-1)*this.n + col-1;
			if (this.connected(current, 0)) return true;
			return false;
		}
	}

	numberOfOpenSites() {
		return this.openSites;
	}

	percolates() {
		if (this.connected(0, this.nSquared+1)) return true;
			return false;
	}

	// Simulation Methods
	monteCarlo() {
		let randomRow = 0;
		let randomCol = 0;
		do {
			 randomRow = Math.floor(Math.random() * this.n) + 1;
			 randomCol = Math.floor(Math.random() * this.n) + 1;
		} while (this.isOpen(randomRow, randomCol));	
		this.open(randomRow, randomCol);
	}

	fractionOfOpenSites() {
		while (this.percolates() === false) this.monteCarlo();
		return this.openSites / this.nSquared;
	}
}

class PercolationStats {
	constructor(gridSize, trials) {
		this.gridSize = gridSize;
		this.trials = trials;
		this.data = [];
	}

	runTrials() {
		for (let i=0; i<this.trials; i++) {
			const TrialGrid = new Grid(this.gridSize);
			this.data[i] = TrialGrid.fractionOfOpenSites();
		}
		 
	}

	mean() {
		let sum = 0;
		for (let i=0; i<this.trials; i++) sum += this.data[i];
		return sum / this.trials;
	}

	stddev() {
		let sum = 0;
		let currentMean = this.mean();
		for (let i=0; i<this.trials; i++) sum += (this.data[i] - currentMean) ** 2;
		return Math.sqrt(sum / ( this.trials - 1 ));
	}

	confidenceLo() {
		let currentMean = this.mean();
		let currentStddev = this.stddev();
		return (currentMean - (1.96*currentStddev)/Math.sqrt(this.trials));
	}

	confidenceHi() {
		let currentMean = this.mean();
		let currentStddev = this.stddev();
		return (currentMean + (1.96*currentStddev)/Math.sqrt(this.trials));
	}
}


const testClient = () => {
	const Experiment = new PercolationStats(200, 100);
	Experiment.runTrials();
	//console.log(Experiment.data);
	console.log("Size / Trials", Experiment.gridSize, Experiment.trials);
	console.log("mean =", Experiment.mean());
	console.log("stddev =", Experiment.stddev());
	console.log("95% confidence interval: [", Experiment.confidenceLo(), ",", Experiment.confidenceHi(), "]");
}

testClient();