const swap = (array, a, b) => {
	let temp = array[a];
	array[a] = array[b];
	array[b] = temp;
}

compare = (arrayA, a, arrayB, b) => {
	if (arrayA[a].x === arrayB[b].x) {
		if (arrayA[a].y === arrayB[b].y) return 0;
		if (arrayA[a].y > arrayB[b].y) return 1;
		if (arrayA[a].y < arrayB[b].y) return -1;
	}
	if (arrayA[a].x > arrayB[b].x) return 1;
	if (arrayA[a].x < arrayB[b].x) return -1;
}

const shellSort = (a) => {
	let h = 1;
	while (h < Math.floor(a.length/3)) h = 3 * h + 1;

	while (h >= 1) {

		for (i = 1; i < a.length; i++) {
			j = i;
			while (j - h >= 0 && compare(a, j - h, a, j) === 1) {
				swap(a, j - h, j);
				j = j - h;
			}
		}
		//console.log(h, a);
		h = Math.floor(h/3);
	} 
}

const createArray = (n) => {
	let array = [];
	
	for (i = 0; i < n; i ++) {
		bucket = Math.floor(Math.random() * (3));
		switch (bucket) {
			case 1: array.push('red');
			case 2: array.push('white');
			case 2: array.push('blue');
		}
	}

	return array;
}

const sortBuckets = (a) => {
	let n = a.length;
	let r = 0, w = 0, b = 0, i = 0;
	while (i < n-b) {
		switch (a[i]) {
			case 'red': {
				swap(a, r, i);
				r++;
				i++;
				break
			}
			case 'white': {
				w++;
				i++;
				break
			}
			case 'blue': {
				swap(a, i, n-b-1);
				b++;
				break
			}
		}
	}
	
}

const testClient = () => {
	let n = 21;
	let array = createArray(n);

	sortBuckets(array);
	console.log(array);
}

testClient();