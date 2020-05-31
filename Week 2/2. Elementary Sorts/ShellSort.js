const swap = (array, a, b) => {
	let temp = array[a];
	array[a] = array[b];
	array[b] = temp;
}

const shellSort = (a) => {
	let h = 1;
	while (h < Math.floor(a.length/3)) h = 3 * h + 1;

	while (h >= 1) {

		for (i = 1; i < a.length; i++) {
			j = i;
			while (j - h >= 0 && a[j - h] > a[j]) {
				swap(a, j - h, j);
				j = j - h;
			}
		}
		console.log(h, a);
		h = Math.floor(h/3);
	} 
}