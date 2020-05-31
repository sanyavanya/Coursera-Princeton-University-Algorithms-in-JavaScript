// Creates a .txt file with a reversed sorted array of distinct integers. Can be easily modified to not sort the initial random array, not remove duplicates etc. 

const fs = require('fs');

const quickSort = (a, lo, hi) => {
	if (lo < hi) {
		let p = partition(a, lo, hi);
		quickSort(a, lo, p-1);
		quickSort(a, p+1, hi);
	}
}

const partition = (a, lo, hi) => {
	let pivot = a[hi];
	let i = lo;
	for (let j = lo; j <= hi; j++) {
		if (a[j] < pivot) {
			let temp = a[j];
			a[j] = a[i];
			a[i] = temp;
			i++;
		}
	}
	let temp = a[hi];
	a[hi] = a[i];
	a[i] = temp;
	return i;
}

const createArrayOfIntegers = (n, range) => {
	let array = [];
	
	for (i = 0; i < n; i ++) {
		array.push(Math.floor(Math.random() * (range - (-range) + 1)) + (-range));		
	}

	return array;
}

const removeDuplicates = (arr) => { // eager algorithm, but does the job
	let i = 0;
	let newArr = [];
	while (i < arr.length) {
		let current = arr[i];
		newArr.push(current);
		while (arr[i] === current) i++;
	} 

	return newArr;
}

const reverse = (arr) => {
	for (i = 0; i < Math.floor((arr.length) / 2); i++) {
		let temp = arr[i];
		arr[i] = arr[arr.length - 1 - i];
		arr[arr.length - 1 - i] = temp;
	}
}

const testClient = () => {
	let array = createArrayOfIntegers(200, 100);
	quickSort(array, 0, array.length-1);
	let distinctArray = removeDuplicates(array);
	reverse(distinctArray);
	console.log(distinctArray);

	// the next line will actually create a file, check the path and modify the operations above before running
	//distinctArray.forEach(x => fs.appendFileSync(`./txt/bitonicArray2.txt`, `${x}\n`)); 
}

testClient();