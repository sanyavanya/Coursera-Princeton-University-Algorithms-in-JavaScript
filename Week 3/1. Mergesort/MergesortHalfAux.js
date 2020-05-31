swap = (array, a, b) => {
	let temp = array[a];
	array[a] = array[b];
	array[b] = temp;
}

const createArray = (n, range) => {
	let array = [];
	
	for (i = 0; i < n; i ++) {
		newX = Math.floor(Math.random() * (range - (-range) + 1)) + (-range);
		array.push(newX);
	}

	return array;
}

const merge = (a, aux, lo, mid, hi) => {
	
	for (let k = lo; k <= mid; k++) aux[k] = a[k];

	let i = lo, j = mid + 1;

	for (let k = lo; k <= hi; k++) {
		if (i > mid) a[k] = a[j++];
		else if (j > hi) a[k] = aux[i++];
		else if (aux[i] <= a[j]) a[k] = aux[i++];
		else a[k] = a[j++];
	}
}

const mergeSort = (a, aux, lo, hi) => {

	if (hi <= lo) return;
	let mid = lo + Math.floor((hi-lo)/2);
	mergeSort(a, aux, lo, mid);
	mergeSort(a, aux, mid+1, hi);
	merge(a, aux, lo, mid, hi);
}

let c = createArray(100, 99);
console.log(c);
console.log('-----');


let aux = [];
//for (let i = 0; i < Math.floor(c.length/2); i++) aux.push(0);
console.time('time');
mergeSort(c, aux, 0, c.length - 1);
//mergeSortBottomUp(c);
console.timeEnd('time');

console.log(c);