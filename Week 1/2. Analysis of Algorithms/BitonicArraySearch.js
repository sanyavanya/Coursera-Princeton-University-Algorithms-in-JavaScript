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

const findMaxBinary = (a) => {
	let lo = 0;
	let hi = a.length-1;

	while (lo <= hi) {
		let cur = Math.floor(lo + (hi-lo) / 2);
		if (a[cur + 1] < a[cur] && a[cur - 1] < a[cur]) return cur;
		else if (a[cur + 1] > a[cur] || a[cur - 1] < a[cur]) lo = cur + 1;
		else if (a[cur + 1] < a[cur] || a[cur - 1] > a[cur]) hi = cur -1;
	}
}

const doubleBinarySearch = (a, key) => {
	let maxIndex = findMaxBinary(a);
	if (key > a[maxIndex]) return -1;
	let lo1 = 0;
	let hi1 = maxIndex;
	let lo2 = maxIndex+1;
	let hi2 = a.length-1;
	while (lo1 <= hi1 || lo2 <= hi2) {
			let mid1 = Math.floor(lo1 + (hi1-lo1) / 2);
			if (key < a[mid1]) hi1 = mid1 - 1;
			else if (key > a[mid1]) lo1 = mid1 + 1;
			else return mid1;

		let mid2 = Math.floor(lo2 + (hi2-lo2) / 2);
		if (key > a[mid2]) hi2 = mid2 - 1;
		else if (key < a[mid2]) lo2 = mid2 + 1;
		else return mid2;


	}
	return -1;
}

const testClient = () => {
	fileToPromiseArray('./txt/bitonicArray.txt')
		.then(data => {
			console.log(doubleBinarySearch(data, 26));					
		});
}

testClient();
