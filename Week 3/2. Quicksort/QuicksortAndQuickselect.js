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

const partition = (a, lo, hi) => {
	let i = lo, j = hi+1;
	while (true) {
		while (a[++i] < a[lo]) if (i === hi) break;
		while (a[lo] < a[--j]); //if (j === lo) break;

		if(i >= j) break;
		swap(a, i, j);
	}

	swap(a, lo, j);
	return j;
} 

const quicksort = (a, lo, hi) => {
	if (hi <= lo) return;
	let j = partition(a, lo, hi);
	quicksort(a, lo, j-1);
	quicksort(a, j+1, hi);
}

const quickselect = (a, k) => {
	let lo = 0, hi = a.length-1;
	while (hi > lo) {
		let j = partition(a, lo, hi);
		if (j < k) lo = j+1;
		if (j > k) hi = j-1;
		else return [k, a[k]];
	}
	return [k, a[k]];
}


let a = createArray(20, 9);
console.log('-----');
console.log(a);

console.log('-----');
shuffle(a);
console.log(a);

console.log('-----');
console.log(quickselect(a, 5));
quicksort(a, 0, a.length-1);
console.log(a);