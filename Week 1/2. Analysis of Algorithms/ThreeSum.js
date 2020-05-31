const fs = require('fs');

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
			//console.log(data);
			console.log(threeSum(data));
		});
}

testClient();