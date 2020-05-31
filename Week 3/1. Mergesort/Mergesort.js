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
	
	for (let k = lo; k <= hi; k++) aux[k] = a[k];

	let i = lo, j = mid + 1;

	for (let k = lo; k <= hi; k++) {
		if (i > mid) a[k] = aux[j++];
		else if (j > hi) a[k] = aux[i++];
		else if (aux[i] <= aux[j]) a[k] = aux[i++];
		else a[k] = aux[j++];
	}
}

const insertionSort = (a, lo, hi) => {
	for (i = lo+1; i < hi+1; i++) {
		j = i;
		while (j - 1 >= 0 && a[j - 1] > a[j]) {
			swap(a, j - 1, j);
			j--;
		}
	}
}

// ПРОСМОТРИ СОРТИРОВКУ ЕЩЕ РАЗ, УБЕДИСЬ, ЧТО УЛУЧШЕНИЯ РАБОТАЮТ, И ТЫ ИХ ПОНИМАЕШЬ. ДОКАЖИ СЛОЖНОСТЬ NlgN для сравнений и 6NlgN доступов к массиву.

const mergeSort = (a, aux, lo, hi) => {

	if (hi <= lo) return;
	let mid = lo + Math.floor((hi-lo)/2);
	mergeSort(a, aux, lo, mid);
	mergeSort(a, aux, mid+1, hi);
	merge(a, aux, lo, mid, hi);
}

const mergeSortImproved = (a, aux, lo, hi) => {
	if (hi <= lo + 7 - 1) {
		insertionSort(a, lo, hi);
		return;
	}
	let mid = lo + Math.floor((hi-lo)/2);
	mergeSortImproved(a, aux, lo, mid);
	mergeSortImproved(a, aux, mid+1, hi);
	if (a[mid] <= a[mid + 1]) return;
	merge(a, aux, lo, mid, hi);
}

const mergeSortBottomUp = (a) => {
	let N = a.length;
	let aux = [];
	for (let sz = 1; sz < N; sz = sz+sz) 
		for (let lo = 0; lo < N-sz; lo += sz+sz) 
			merge(a, aux, lo, lo+sz-1, Math.min(lo+sz+sz-1, N-1));
}

let c = createArray(10, 9);
// let c = [1,2,3,4,5,6,7,8,9,0];
console.log(c);
console.log('-----');


let aux = [];
for (let i = 0; i < c.length; i++) aux.push(0);
console.time('time');
mergeSort(c, aux, 0, c.length - 1);
//mergeSortImproved(c, aux, 0, c.length - 1);
//mergeSortBottomUp(c);
console.timeEnd('time');

console.log(c);