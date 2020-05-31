class EggDrop {
	constructor(n, t) {
		this.n = n;
		this.t = t;
		this.eggsBroken = 0;
		this.tosses = 0;
	}

	version0() {
		let i = 1;
		while (i <= this.n) {
			if (i === this.t) {
				this.eggsBroken++;
				console.log("Eggs broken:", this.eggsBroken);
				return i;
			}
			i++;
		}
	}

	version1() {
		let min = 1;
		let max = this.n;
		while (min <= max) {			
			this.tosses++;
			let mid = Math.floor(min + (max - min)/2);
			if (mid === this.t) {
				this.eggsBroken++;
				return {
					t: mid,
					tosses: this.tosses,
					eggsBroken: this.eggsBroken
				}
			}
			if (mid > this.t) {
				this.eggsBroken++;
				max = mid - 1;
			}
			if (mid < this.t) min = mid + 1;
		}
		return {
			t: "not found",
			tosses: this.tosses,
			eggsBroken: this.eggsBroken
		}
	}

	version2() {
		let k = 0;
		while (this.eggsBroken === 0) {
			if (2 ** k >= this.t) this.eggsBroken ++;
			k ++;
		}
		console.log(k-1);

		let min = 2 ** (k-2);;
		let max = 2 ** (k-1);
		while (min <= max) {			
			this.tosses++;
			let mid = Math.floor(min + (max - min)/2);
			if (mid === this.t) {
				this.eggsBroken++;
				return {
					t: mid,
					tosses: this.tosses,
					eggsBroken: this.eggsBroken
				}
			}
			if (mid > this.t) {
				this.eggsBroken++;
				max = mid - 1;
			}
			if (mid < this.t) min = mid + 1;
		}
		return {
			t: "not found",
			tosses: this.tosses,
			eggsBroken: this.eggsBroken
		}
	}

	version3() {
		let rootN = Math.floor(Math.sqrt(this.n));
		let k = 0;
		while (this.eggsBroken === 0) {
			k ++;
			this.tosses++;
			if (rootN * k >= this.t) this.eggsBroken ++;			
		}

		let current = rootN * (k - 1) + 1;
		while (this.eggsBroken === 1) {
			this.tosses++;
			if (current >= this.t) this.eggsBroken++;
			else current++;
		}

		return {
			t: current,
			tosses: this.tosses,
			eggsBroken: this.eggsBroken
		}
	}

	version4() {
		let currentLength = 1;
		let sumOfPrevious = 0;
		while (this.eggsBroken === 0) {
			this.tosses++;
			if (sumOfPrevious + 1 >= this.t) this.eggsBroken ++;
			else {
				sumOfPrevious += currentLength;
				currentLength ++; 
			}		
		}

		let current = sumOfPrevious - currentLength + 2;
		console.log(current);
		while (this.eggsBroken === 1) {
			this.tosses++;
			if (current >= this.t) this.eggsBroken++;
			else current++;
		}

		return {
			t: current,
			tosses: this.tosses,
			eggsBroken: this.eggsBroken
		}
	}

}




const testClient = () => {
	// uncomment the lines to see results for each version of the task

	const V0 = new EggDrop(20, 19);
	//console.log(V0.version0());

	const V1 = new EggDrop(20, 5);
	// console.log(V1.version1());

	const V2 = new EggDrop(20, 14);
	//console.log(V2.version2());

	const V3 = new EggDrop(25, 6);
	//console.log(V3.version3());

	const V4 = new EggDrop(25, 6);
	console.log(V4.version4());
}

testClient();