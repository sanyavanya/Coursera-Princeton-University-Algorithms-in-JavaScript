const findRoot = (array, index) => {
	while (index !== array[index]) index = array[index]; 
	return index;
}

const find = (arr, p, q) => {
	if (findRoot(arr, p) === findRoot(arr, q)) return true;
	else return false;
}

const union = (arr, p, q) => {
	arr[findRoot(arr, p)] = findRoot(arr, q);
}

const testClient = () => {
	const id = [1, 2, 2, 2, 7, 6, 7, 7, 4, 8];
	console.log('Initial:', id);
	console.log('find(3, 6):', find(id, 3, 6)); // лучше бы написать класс с методами, а не передавать структуру данных в качестве аргумента
	union(id, 3, 6);
	console.log('find(3, 6):', find(id, 3, 6));
}

testClient();