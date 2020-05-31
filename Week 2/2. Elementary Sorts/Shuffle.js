const swap = (array, a, b) => {
	let temp = array[a];
	array[a] = array[b];
	array[b] = temp;
}

const shuffle = (a) => {
	for (i = 0; i < a.length; i++) {
		let rnd = Math.floor(Math.random()*i);
		swap(a, i, rnd);
	}
}