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

const binarySearch = (a, key) => {
	let lo = 0;
	let hi = a.length-1;
	while (lo <= hi) {
		let mid = Math.floor(lo + (hi-lo) / 2);
		if (key < a[mid]) hi = mid - 1;
		else if (key > a[mid]) lo = mid + 1;
		else return mid;
	}
	return -1;
}

const threeSum = (a) => {
	console.time('timer');
	const N = a.length;
	let cnt = 0;
	for (let i = 0; i < N; i++)
		for (let j = i+1; j < N; j++)
			for (let k = j+1; k < N; k++)
				if (a[i] + a[j] + a[k] == 0) {
					//console.log(a[i], a[j], a[k]);
					cnt++;
				}
	console.timeEnd('timer');
	return cnt;
}

const threeSumSorted = (a) => {
	quickSort(a, 0, a.length-1);
	console.time('timerSorted');

	const N = a.length;
	let cnt = 0;
	for (let i = 0; i < N; i++) {
		for (let j = i+1; j < N; j++){
			let negativeSum = -(a[i] + a[j]);
			let ak = binarySearch(a, negativeSum);
			if (a[i] < a[j] && a[j] < a[ak]) cnt ++;
		}
	}
	console.timeEnd('timerSorted');
	return cnt;
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

let array = [];

const testClient = () => {
	fileToPromiseArray('./txt/1Kints.txt')
		.then(data => {
			console.log(threeSum(data));
			console.log();
			console.log(threeSumSorted(data));
		});
}

testClient();