const swap = (array, a, b) => {
	let temp = array[a];
	array[a] = array[b];
	array[b] = temp;
}

const shuffle = (a) => {
	for (let i = 0; i < a.length; i++) {
		let rnd = Math.floor(Math.random()*i);
		swap(a, i, rnd);
	}
}

const createArray = (n, range) => {
	let array = [];
	
	for (let i = 0; i < n; i ++) {
		newX = Math.floor(Math.random() * (range - (-range) + 1)) + (-range);
		array.push(newX);
	}

	return array;
}

const threeWayQuicksort = (a, lo, hi) => {
	if (hi <= lo) return;
	let lt = lo, gt = hi, v = a[lo], i = lo;
	while (i <= gt) {
		if (a[i] < v) swap(a, lt++, i++);
		else if (a[i] > v) swap(a, gt--, i);
		else i++;
	}
	threeWayQuicksort(a, lo, lt-1);
	threeWayQuicksort(a, gt+1, hi);
}

let a = createArray(20, 9);
console.log('-----');
console.log(a);

console.log('-----');
shuffle(a);
console.log(a);

console.log('-----');
threeWayQuicksort(a, 0, a.length-1);
console.log(a);