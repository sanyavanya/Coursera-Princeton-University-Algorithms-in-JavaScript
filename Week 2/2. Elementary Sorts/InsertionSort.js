const swap = (array, a, b) => {
	let temp = array[a];
	array[a] = array[b];
	array[b] = temp;
}

const insertionSort = (a) => {
	for (i = 1; i < a.length; i++) {
		j = i;
		while (j - 1 >= 0 && a[j - 1] > a[j]) {
			swap(a, j - 1, j);
			j--;
		}
	}
}