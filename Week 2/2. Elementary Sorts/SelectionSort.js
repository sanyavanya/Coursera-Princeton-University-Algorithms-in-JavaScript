const swap = (array, a, b) => {
	let temp = array[a];
	array[a] = array[b];
	array[b] = temp;
}

const selectionSort = (a) => {
	for (i = 0; i < a.length; i++) {
		min = i;
		for (j = i + 1; j < a.length; j++) {
			if (a[j] < a[min]) min = j;
		}
		swap(a, i, min);
	}
}