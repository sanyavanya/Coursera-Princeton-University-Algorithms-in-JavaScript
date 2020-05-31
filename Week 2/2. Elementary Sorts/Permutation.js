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
		//console.log(h, a);
		h = Math.floor(h/3);
	} 
}

const permutationCheck = (a1, a2) => {
	let match = true;
	let i = 0;
	while (match && i < a1.length) {
		if (a1[i] !== a2[i]) match = false;
		i++;
	}
	return match;
}

const testClient = () => {
	let n = 100;
	let range = 10;
	let array1 = [1,2,3,4,5];
	let array2 = [1,3,2,5,2];
	shellSort(array1);
	shellSort(array2);
	console.log(array1, array2);
	console.log(permutationCheck(array1, array2));
}

testClient();