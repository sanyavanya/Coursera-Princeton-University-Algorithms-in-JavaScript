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

const createArrayOfDistinctPoints = (n, range) => {
	let array = [];
	
	for (i = 0; i < n; i ++) {
		newX = Math.floor(Math.random() * (range - (-range) + 1)) + (-range);
		newY = Math.floor(Math.random() * (range - (-range) + 1)) + (-range);
		let j = 0;
		found = false;
		while (j < array.length && !found) {
			if (array[j].x === newX && array[j].y === newY) found = true;
			j++
		}

		if (!found) array.push( {
			x: newX,
			y: newY
		})
	}

	return array;
}

const intersection = (a1, a2) => {
	let counter = 0;
	let lastFoundMatchingIndexInArray2 = -1;
	for (i = 0; i < a1.length; i ++) {
		let j = lastFoundMatchingIndexInArray2 + 1;
		while (j < a2.length && compare(a1, i, a2, j) === 1) j++;
		if (j < a2.length && compare(a1, i, a2, j) === 0) {
			counter++;
			lastFoundMatchingIndexInArray2 = j;
			console.log(a1[i], a2[j]);
		}
	}
	return counter;
}

const testClient = () => {
	let n = 100;
	let range = 10;
	let array1 = createArrayOfDistinctPoints(n, range);
	let array2 = createArrayOfDistinctPoints(n, range);
	shellSort(array1);
	shellSort(array2);
	console.log(array1, array2);
	console.log(intersection(array1, array2));
}

testClient();