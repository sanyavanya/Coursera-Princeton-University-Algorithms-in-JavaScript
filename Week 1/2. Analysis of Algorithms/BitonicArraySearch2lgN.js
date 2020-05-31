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

const fileToPromiseArray = (fileAddress) => {
	return new Promise((resolve, reject) =>{ 
		const arrayed = [];

		fs.readFile(fileAddress, (err, data) => {
			if (err) return reject(err);

			const stringed = data.toString('utf8');
			let i = 0;
			while (i < stringed.length) {
				let currentItem = '';
				while (stringed[i] != '\n') {
					currentItem += stringed[i];
					i++;
				}
				
				arrayed.push(Number(currentItem));
				i++;
			}

			return resolve(arrayed);
		});
	})
}

const binarySearch = (a, key, lo, hi) => {
	if (a[lo] < a[hi]) // acsending
		while (lo <= hi) {
			let mid = Math.floor(lo + (hi-lo) / 2);
			if (key < a[mid]) hi = mid - 1;
			else if (key > a[mid]) lo = mid + 1;
			else return mid;
		}
	else //descending
		while (lo <= hi) {
			let mid = Math.floor(lo + (hi-lo) / 2);
			if (key > a[mid]) hi = mid - 1;
			else if (key < a[mid]) lo = mid + 1;
			else return mid;
		}

	return -1;
}

const bitonicSearch = (a, key, left, right) => {
	if (left === right) return -1;
	let mid = Math.floor(left + (right-left) / 2);
	if (a[mid] === key) return mid;

	//max to the right
	if (a[mid-1] < a[mid] || a[mid] < a[mid+1]) {
		if (key < a[mid]) {
			let leftBinary = binarySearch(a, key, left, mid-1);
			if (leftBinary !== -1) return leftBinary;
		}
		return bitonicSearch(a, key, mid+1, right);
	}


	//max to the left
	if (a[mid-1] > a[mid] || a[mid] > a[mid+1]) {
		if (key < a[mid]) {
			let rightBinary = binarySearch(a, key, mid+1, right);
			if (rightBinary !== -1) return rightBinary;
		}
		return bitonicSearch(a, key, left, mid-1);
	}
	return -1;
}

const testClient = () => {
	fileToPromiseArray('./txt/bitonicArray.txt')
		.then(data => {
			console.log(bitonicSearch(data, 100, 0, data.length-1));	
			// console.log(binarySearch(data, 28, 0, data.length-1));					
		});
}

testClient();