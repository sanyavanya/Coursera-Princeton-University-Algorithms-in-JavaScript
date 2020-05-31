const degrees = (rad) => {
	return rad * 180 / Math.PI;
}

class Point {
	constructor(x,y) {
		this.x = x;
		this.y = y;
	}
	draw(i) {
		let newPoint = document.createElement("div");
		newPoint.classList.add("point");
		newPoint.style.left = (this.x * canvasWidth / 100) + 4 + "px";
		newPoint.style.top = canvasWidth - (this.y * canvasWidth / 100) + 6 + "px";
		canvas.appendChild(newPoint);

		var newPointCoordinates = document.createElement("div");
		newPointCoordinates.appendChild(document.createTextNode(`${i}: (${this.x}; ${this.y})`));
		newPointCoordinates.style.left = (this.x * canvasWidth / 100) + 15 + "px";
		newPointCoordinates.style.top = canvasWidth - (this.y * canvasWidth / 100) +10 + "px";
		newPointCoordinates.style.zIndex = 2;
		newPointCoordinates.classList.add("pointCoordinates");
		canvas.appendChild(newPointCoordinates);
	}

	drawTo(AnotherPoint) {
		let newLine = document.createElement("div");
		newLine.classList.add("line");
		newLine.style.left = (this.x * canvasWidth / 100) + 7 + "px";
		newLine.style.top = canvasWidth - (this.y * canvasWidth / 100) + 10 + "px";
		let hypotenuse = Math.sqrt(Math.pow(this.y-AnotherPoint.y, 2) + Math.pow(this.x-AnotherPoint.x, 2));
		newLine.style.height = (hypotenuse * canvasWidth / 100) + "px";
		let angleSin = ((AnotherPoint.x-this.x) / hypotenuse);
		let angle = degrees(Math.asin(angleSin));
		if (AnotherPoint.y > this.y) angle = 180 - angle;
		//console.log(angle);

		newLine.style.transformOrigin = "top";	

		let r = Math.floor(Math.random()*256);
		let g = Math.floor(Math.random()*256);
		let b = Math.floor(Math.random()*256);
		newLine.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

		canvas.appendChild(newLine);
		newLine.style.transform = `rotate(${-angle}deg)`;
	}

	compareTo(AnotherPoint) {
		if (AnotherPoint.y > this.y || ((AnotherPoint.y === this.y) && (AnotherPoint.x > this.x))) return -1;
		else if (AnotherPoint.x === this.x && AnotherPoint.y === this.y) return 0;
		else return 1;
	}

	slopeTo(AnotherPoint) {
		if ((this.y === AnotherPoint.y) && (this.x === AnotherPoint.x)) return Number.NEGATIVE_INFINITY;
		else if (this.y === AnotherPoint.y) return Number.POSITIVE_INFINITY;
		else if (this.x === AnotherPoint.x) return 0;
		//console.log(`(${AnotherPoint.y}-${this.y}) / (${AnotherPoint.x}-${this.x})`);
		return (AnotherPoint.y-this.y) / (AnotherPoint.x-this.x);
	}

	slopeOrder(Point1, Point2) {
		let slope1 = this.slopeTo(Point1);
		let slope2 = this.slopeTo(Point2);
		// console.log(slope1);
		// console.log(slope2);
		if (slope1 < slope2) return -1;
		if (slope1 === slope2) return 0;
		if (slope1 > slope2) return 1;
	}
}

const findMin = (a) => {
	let min = a[0];
	for (let i = 1; i < a.length; i++) {
		if (a[i].compareTo(min) === -1) min = a[i];
		//console.log(i);
	}
	return min;
}

const findMax = (a) => {
	let max = a[0];
	for (let i = 1; i < a.length; i++) {
		if (a[i].compareTo(max) === 1) max = a[i];
	}
	return max;
}

const bruteCollinearPoints = (a) => {
	let pointsPerCheck = 4;
	if (a.length < pointsPerCheck) {
		throw "Error: not enough points!";
		return
	}
	let segments = [];
	let numberOfSegments = 0;
	for (let p = 0; p < a.length - 3; p++)
		for (let q = p+1; q < a.length - 2; q++)
			for (let r = q+1; r < a.length - 1; r++)
				for (let s = r+1; s < a.length; s++) {
					if (a[p].slopeTo(a[q]) === a[p].slopeTo(a[r]) &&
						a[p].slopeTo(a[r]) === a[p].slopeTo(a[s])) {
						// a[p].drawTo(a[q]);
						// a[p].drawTo(a[r]);
						// a[p].drawTo(a[s]);
						numberOfSegments++;
						let min = findMin([a[p], a[q], a[r], a[s]]);
						let max = findMax([a[p], a[q], a[r], a[s]]);
						segments.push([min, max]);
						min.drawTo(max);
					}
				}

	//console.log(numberOfSegments);
	return segments;
}

const merge = (Origin, a, aux, lo, mid, hi) => {

	for (let k = lo; k <= hi; k++) aux[k] = a[k];
	let i = lo, j = mid+1;
	for (let k = lo; k <= hi; k++) {
		if (i > mid) a[k] = aux[j++];
		else if (j > hi) a[k] = aux[i++];
		else if (Origin.slopeTo(aux[i]) <= Origin.slopeTo(aux[j])) a[k] = aux[i++];
		else a[k] = aux[j++];
	}
}

const mergeSort = (Origin, a, aux, lo, hi) => {
	if (hi <= lo) return;
	let mid = lo + Math.floor((hi-lo)/2);
	mergeSort(Origin, a, aux, lo, mid);
	mergeSort(Origin, a, aux, mid+1, hi);
	merge(Origin, a, aux, lo, mid, hi);
}

const isASubsegment = (currentSlope, currentCollinearPoints, collinearPoints) => {
	for (let i = 0; i < collinearPoints.length; i ++) {
		if (currentSlope === collinearPoints[i].slope) 
			for (let j = 0; j < collinearPoints[i].segments.length; j++)
				if (collinearPoints[i].segments[j] === currentCollinearPoints[0]) return true;	
	}
	return false;
}

const addToSegments = (collinearCount, currentSlope, collinearPoints, i, j, segments) => {
	let currentCollinearPoints = [];
	currentCollinearPoints.push(a[i]);
	for (l = 1; l <= collinearCount - 1 ; l++) currentCollinearPoints.push(a[j-l]);
	if (!isASubsegment(currentSlope, currentCollinearPoints, collinearPoints)) {
		collinearPoints.push({ slope: currentSlope, segments: currentCollinearPoints });
		let minPoint = findMin(currentCollinearPoints);
		let maxPoint = findMax(currentCollinearPoints);
		segments.push([minPoint, maxPoint]);
		minPoint.drawTo(maxPoint); // РИСОВАТЬ МОЖНО СИЛЬНО ПОЗЖЕ, после нахождения всех сегментов и их упрощения до двух крайних точек
	} else {
		//console.log('subsegment!', currentCollinearPoints);
	}
}

const fastCollinearPoints = (a) => {

	let collinearSegmentsCount = 0;
	let collinearPoints = [];
	let segments = [];
	for (i = 0; i < a.length - 3; i++) {

		let aux = [];
		mergeSort(a[i], a, aux, i+1, a.length-1);
		
		let currentSlope = a[i].slopeTo(a[i+1]);
		let collinearCount = 2;
		//ПЕРЕПИСАТЬ следующий луп как while, чтобы последнюю партию тоже проверял

		let j = i + 2;
		while (j < a.length) {
			if (a[i].slopeTo(a[j]) === currentSlope) collinearCount++;
			else {
				if (collinearCount >= 4) addToSegments(collinearCount, currentSlope, collinearPoints, i, j, segments);
				currentSlope = a[i].slopeTo(a[j]);
				collinearCount = 2;
			}
			j++;
		}	

		if (collinearCount >= 4) addToSegments(collinearCount, currentSlope, collinearPoints, i, j, segments);

		// if (collinearCount >= 4) {
		// 	let currentCollinearPoints = [];
		// 	for (l = 1; l <= collinearCount - 1; l++) currentCollinearPoints.push(a[j-l]);
		// 	currentCollinearPoints.push(a[i]);
		// 	collinearPoints.push([findMin(currentCollinearPoints), findMax(currentCollinearPoints)]);
		// 	findMin(currentCollinearPoints).drawTo(findMax(currentCollinearPoints));
		// }
	}
	return segments;
}

let canvas = document.getElementById("canvas");
let canvasWidth = 700;

let a = [];
for (let i = 0; i < 100; i++) {
	newX = Math.floor(Math.random()*100);
	newY = Math.floor(Math.random()*100);
	a.push(new Point(newX, newY));
	a[i].draw(i);
}

// for (let i = 0; i < 4; i++) {
// 	newY = Math.floor(Math.random()*100);
// 	newX = 10;
// 	a.push(new Point(newX, newY));
// 	a[i].draw(i);
// }

//console.log(a);
// console.log(a);
//console.log(bruteCollinearPoints(a));
console.log(fastCollinearPoints(a));