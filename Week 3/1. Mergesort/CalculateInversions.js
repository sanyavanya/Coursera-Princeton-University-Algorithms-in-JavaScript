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

let inversions = 0;

const merge = (a, aux, lo, mid, hi) => {
	
	for (let k = lo; k <= hi; k++) aux[k] = a[k];

	let i = lo, j = mid + 1;
	let n1 = mid-lo+1, n2 = hi-mid;

	for (let k = lo; k <= hi; k++) {
		if (i > mid) a[k] = aux[j++];
		else if (j > hi) a[k] = aux[i++];
		else if (aux[i] <= aux[j]) a[k] = aux[i++];
		else {
			if (aux[j] !== undefined) inversions += mid-i+1;
			a[k] = aux[j++];			
		}
	}
}

const mergeSort = (a, aux, lo, hi) => {

	if (hi <= lo) return;
	let mid = lo + Math.floor((hi-lo)/2);
	mergeSort(a, aux, lo, mid);
	mergeSort(a, aux, mid+1, hi);
	merge(a, aux, lo, mid, hi);
}

let c = createArray(5, 9);
console.log(c);
console.log('-----');

let aux = [];
mergeSort(c, aux, 0, c.length - 1);

console.log(c);
console.log(inversions, "inversions found in array");