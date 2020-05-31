// Eager/Lazy Approach
const connected = (arr, p, q) => {
	if (arr[p] === arr[q]) return true;
	else return false;
}

const union = (arr, p, q) => {
	let first = arr[p];
	let second = arr[q];
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] === first) arr[i] = second;
	}
}

const testClient = () => {
	const id = [0,1,2,3,4,5,6,7,8,9];
	console.log('Initial:', id);

	union(id, 4, 3);
	console.log('union(4, 3):', id);
	union(id, 3, 8);
	console.log('union(3, 8):', id);
	union(id, 6, 5);
	console.log('union(6, 5):', id);
	union(id, 9, 4);
	console.log('union(9, 4):', id);
	union(id, 2, 1);
	console.log('union(2, 1):', id);

	console.log('connected(8, 9):', connected(id, 8,9));
	console.log('connected(5, 0):', connected(id, 5,0));	
}

testClient();