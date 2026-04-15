// Date		2025-12-22

export function squareEquation(a, b, c) {
	if (((typeof a || typeof b || typeof c) != 'number') || (a == 0)) {
		throw new Error("Arguments should be a numbers and should not equal zero.");
	}
	
	let result = {};
	result.discriminant = (Math.pow(b,2)) - (4 * a * c);
	if (result.discriminant > 0) {
		result.x1 = ((-b) + Math.sqrt(result.discriminant)) / (2 * a);
		result.x2 = ((-b) - Math.sqrt(result.discriminant)) / (2 * a);
		return result;
	} else if (result.discriminant == 0) {
		result.x1 = (-b) / (2 * a);
		result.x2 = undefined;
		return result;
	} else {
		result.x1 = result.x2 = 'No root';
		return result;
	}
}

/** Equation type: a1*x + b1*y = c1; a2*x + b2*y = c2
 */
export function systemEquation(a1, b1, c1, a2, b2, c2) {
	if ((typeof a1 || typeof b1 || typeof c1 || typeof a2 || typeof b2 || typeof c2) != 'number') {
		throw new Error("Expected six numeric arguments.");
	}
	
	if ((a2 * b1 - a1 * b2 == 0) || (b1 == 0)) {
		throw new Error("Unexpected Error");
	}
	
	let result = {};
	result.x = (b1 * (c2 - (b2 * c1) / b1)) / (a2 * b1 - a1 * b2);
	result.y = (c1 - a1 * result.x) / b1;
	
	return result;
}

export function convertAngleUnit(value, from, to) {
	if (typeof value != 'number' || typeof from != 'string' || typeof to != 'string') {
		throw new Error("Invalid arguments.");
	}
	if (from != 'r' && from != 'g' && from != 'd') {
		throw new Error("Second argument is invalid. Should be r for radians, g for grads and d for degrees.");
	}
	if (to != 'r' && to != 'g' && to != 'd') {
		throw new Error("Third argument is invalid. Should be r for radians, g for grads and d for degrees.");
	}
	
	if (from == to) {
		return value;
	}
	
	if (from == 'r') {
		let degree = value * (180 / Math.PI);
	} else if (from == 'g') {
		let degree = value * (10 / 9);
	} else if (from == 'd') {
		let degree = value;
	} else {
		throw new Error("Unexpected Error");
	}
	
	if (to == 'r') {
		return degree * (Math.PI / 180);
	} else if (to == 'g') {
		return degree * 0.9;
	} else if (to == 'd') {
		return degree;
	} else {
		throw new Error("Unexpected Error");
	}
}

/** Math function.
 */
export function func(f, beginX, endX) {
	if ((typeof beginX != 'number') || (typeof endX != 'number')) {
		throw new Error("Invalid function range.");
	}
	
	let result = [];
	let x = beginX;
	for (let i = 0; i <= endX - beginX ; i++) {
		result[i] = {};
		result[i].x = x;
		result[i].y = f.apply(this, [x]);
		x++;
	}

	return result;
}

/** Calcs circle data: square and perimeter from its radius (r).
 */
export function circleData(r) {
	let result = {};
	result.square = Math.PI * r * r; //Square
	result.perimetr = 2 * Math.PI * r; //Perimeter
	return result;
}

/** Pifagor theoreme. Provide two sides in parameters and provide one of them as null to find this side.
 */
export function pifagor(a, b, c) {
	if ((a || b || c) <= 0) {
		throw new Error("Only one argument should be null. Other should be numbers above zero.");
	}

	if ((a == null) && (b != null) && (c != null)) {
		return Math.sqrt(c * c - b * b);
	}
	else if ((a != null) && (b == null) && (c != null)) {
		return Math.sqrt(c * c - a * a);
	}
	else if ((a != null) && (b != null) && (c == null)) {
		return Math.sqrt(a * a + b * b);
	}

	throw new Error("Unexpected error.");
}

export function arraySumm(arr) {
	let s = 0;
	for (let i = 0; i < arr.length; i++) {
		if (typeof arr[i] == 'number') {
			s = s + arr[i];
		}
		else {
			throw new Error("Invalid argument. Should be number[]");
		}
	}
	return s;
}

export function arrayProduct(arr) {
	let p = 1;
	for (let i = 0; i < arr.length; i++) {
		if (typeof arr[i] == 'number') {
			p = p * arr[i];
		}
		else {
			throw new Error("Invalid argument. Should be number[]");
		}
	}
	return p;
}

export function decToBin(x) {
	x = Math.abs(x);
	let bin = [];
	let znak;
	if (x == 0) {
		return x.toString();
	}
	while (x >= 1) {
		znak = x%2;
		bin.unshift(znak);
		x = Math.floor(x/2);
	}
	return bin.join('');
}

export function primes(numbers, startNumber) {
	startNumber = startNumber || 2;
	if (numbers < 1 || typeof numbers != 'number' || typeof startNumber != 'number') {
		return [];
	}
	if (startNumber < 2) {
		startNumber = 2;
	}
	numbers = Math.floor(numbers);

	let searchingNumber = startNumber;
	let simples = [];
	let isItSimple = true;

	while (simples.length < numbers) {
		for (let i=2; i<searchingNumber; i++) {
			if (searchingNumber % i == 0) {
				isItSimple = false;
				break;
			}
		}
			
		if (isItSimple) {
			simples.push(searchingNumber);
		}
		
		isItSimple = true;
		searchingNumber++;
	}

	return simples;
}

export function primeFactors(x) {
	const primeFactors = [];
	let simples = primes(x < 1000 ? 100 : 1000);
	let d = simples.shift();
	let i = x;

	while (i >= d) {
		if (i == d) {
			primeFactors.push(i);
			break;
		}
		if (simples.indexOf(i) !== -1) {
			primeFactors.push(i);
			break;
		}

		if (i % d === 0) {
			primeFactors.push(d);
			i = i / d;
		} else {
			d = simples.shift()
		}

		if (!simples.length) {
			simples = primes(1000, d+1);
		}
	}

	return primeFactors;
}

/** Natural logarithm
 */
export function ln(x) {
	return Math.log(x);
}

/** Ordinary logarithm with base
 */
export function log(x, base) {
	return Math.log(x) / Math.log(base);
}

/** Dec logarithm
 */
export function lg(x) {
	return Math.log(x) / Math.log(10);
}

export function factorial(x) {
	if (x <= 1) {
		return 1;
	}
	return x * factorial(x-1);
}

export function sin(x) {
	return Math.sin(x);
}

export function cos(x) {
	return Math.cos(x);
}

export function tg(x) {
	return Math.tan(x);
}

export function ctg(x) {
	return Math.cos(x) / Math.sin(x);
}

export function sec(x) {
	return 1 / Math.cos(x);
}

export function cosec(x) {
	return 1 / Math.sin(x);
}

export function arcsin(x) {
	return Math.asin(x);
}

export function arccos(x) {
	return Math.acos(x);
}

export function arctg(x) {
	return Math.atan(x);
}

export function arcctg(x) {
	return Math.atan(1/x);
}

export function arcsec(x) {
	return Math.acos(1/x);
}

export function arccosec(x) {
	return Math.asin(1/x);
}

/**
 * Least Common Multiple
 *
 * @param numbers
 * @return {number}
 */
export function lcm(...numbers) {
	if (numbers.length === 0) return 0;

	return numbers.reduce((acc, n) => lcmTwo(acc, n), numbers[0]);
}

/**
 * Greatest Common Divisor
 *
 * @param numbers
 * @return {number}
 */
export function gcd(...numbers) {
	if (numbers.length === 0) return 0;

	return numbers.reduce((acc, n) => gcdTwo(acc, n), 0);
}

/** Greatest Common Divisor
 * Provide as many numeric arguments as needed.
 *
 * This function is deprecated. Use gcd instead.
 */
export function gcdOld() {
	if (!arguments.length) {
		return null
	}

	const factors = {}
	let allFactors = []
	const commonFactors = {}

	for (const i in arguments) {
		factors[arguments[i]] = primeFactors(arguments[i])
		allFactors = [...allFactors, ...factors[arguments[i]]]
	}

	allFactors = allFactors.filter((value, index, self) => self.indexOf(value) === index)
	allFactors = allFactors.sort((a, b) => a < b ? -1 : 1)

	for (const i in allFactors) {
		let isCommon = true;
		let m = -1;
		for (const j in factors) {
			if (factors[j].indexOf(allFactors[i]) === -1) {
				isCommon = false;
				break
			} else {
				let cnt = arrayCountValues(factors[j], allFactors[i]);
				if (m < 0 || cnt < m) {
					m = cnt;
				}
			}
		}
		if (isCommon) {
			commonFactors[allFactors[i]] = m;
		}
	}

	let d = 1; // greatest common divisor
	for (const i in commonFactors) {
		d *= Math.pow(parseInt(i), commonFactors[i]);
	}

	return d;

	function arrayCountValues(arr, v) {
		let cnt = 0;
		for (const i in arr) {
			if (arr[i] === v) {
				cnt++;
			}
		}
		return cnt;
	}
}

/** As excel function СУММПРОИЗВ.
 */
export function sumProduct(a, b) {
	if (Object.prototype.toString.call(a) != '[object Array]' ||
		Object.prototype.toString.call(b) != '[object Array]') {
		throw new TypeError('All arguments should be an arrays.');
	}
	
	let products = []; //a[index] * b[index]
	
	let product = 0;
	for (let i=0; i<a.length; i++) {
		if (b[i] == undefined) {
			b[i] = 0;
		}
		
		if (typeof a[i] != 'number' || typeof b[i] != 'number') {
			throw new Error('Type of all elements in given arrays should be a numbers. You have argumnet1[' + i + '] as ' + typeof a[i] + ' and argument2[' + i + '] as ' + typeof b[i] + '.');
		}
		
		product = a[i] * b[i];
		products.push(product);
	}
	
	return arraySumm(products);
}

/** Calcs summs of each elements in arrays and store result to the new array.
 */
export function sumArrayElements(a, b) {
	if (Object.prototype.toString.call(a) != '[object Array]' ||
		Object.prototype.toString.call(b) != '[object Array]') {
		throw new Error('All arguments should be an arrays.');
	}
	
	let results = [];
	
	for (let i=0; i<a.length; i++) {
		if (typeof a[i] != 'number' || typeof b[i] != 'number') {
			throw new TypeError('Type of all elements in given arrays should be a numbers. You have argumnet1[' + i + '] as ' + typeof a[i] + ' and argument2[' + i + '] as ' + typeof b[i] + '.');
		}
		
		results[i] = a[i] + b[i];
	}
	
	return results;
}

/** Calcs products of each elements in arrays and store result to the new array.
 */
export function productArrays(a, b) {
	if (Object.prototype.toString.call(a) != '[object Array]' ||
		Object.prototype.toString.call(b) != '[object Array]') {
		throw new Error('All arguments should be an arrays.');
	}
	
	let results = [];
	
	for (let i=0; i<a.length; i++) {
		if (typeof a[i] != 'number' || typeof b[i] != 'number') {
			throw new Error('Type of all elements in given arrays should be a numbers. You have argumnet1[' + i + '] as ' + typeof a[i] + ' and argument2[' + i + '] as ' + typeof b[i] + '.');
		}
		
		results[i] = a[i] * b[i];
	}
	
	return results;
}

export function putInRange(val, min, max) {
	if (val < min) {
		val = min;
	} else if (val > max) {
		val = max;
	}
	
	return val;
}

export function root(n, e = 2) {
	if (e === 0) {
		throw new RangeError("Zero cannot be a root exponent.");
	}

	if (n < 0 && e % 2 === 0) {
		throw new RangeError("Cannot take root from negative number. In fact it would be a complex number, but we do not work with complex numbers here.");
	}

	const value = n ** (1 / e);
	const eps = Number.EPSILON * Math.max(1, Math.abs(value));

	return Math.abs(value - Math.round(value)) < eps ? Math.round(value) : value;
}

/**
 * Returns a random integer number in the range form start to end.
 *
 * @param start
 * @param end
 * @return {number}
 */
export function randomInt(start, end) {
	if (!Number.isInteger(start) || !Number.isInteger(end)) {
		throw new TypeError('start and end must be integers.');
	}

	if (start > end) {
		[start, end] = [end, start];
	}

	return Math.floor(Math.random() * (end - start + 1)) + start;
}

/**
 * Returns pseudo random integer between start and end.
 * Uses Mulberry32 algorithm.
 *
 * @param start
 * @param end
 * @param seed
 * @return {*}
 */
export function randomIntSeeded(start, end, seed) {
	if (start > end) [start, end] = [end, start];

	let t = seed + 0x6D2B79F5;
	t = Math.imul(t ^ (t >>> 15), t | 1);
	t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
	t = (t ^ (t >>> 14)) >>> 0;

	return start + (t % (end - start + 1));
}

/**
 * Generates a sequence of pseudo-random integer numbers between start and end, using seed value.
 *
 * @param start
 * @param end
 * @param seed
 * @param max
 * @return {Generator<*, void, *>}
 */
export function* randomIntSeededGenerator(start = 1, end = 10, seed = 1, max = 10) {
	if (!Number.isInteger(start) || !Number.isInteger(end) || !Number.isInteger(seed) || !Number.isInteger(max)) {
		throw new TypeError('Arguments must be integers.');
	}

	if (seed < 1 || seed > 9999999999) {
		throw new RangeError("Seed argument should be between 1 and 9999999999.");
	}

	if (max < 1) {
		throw new RangeError("Max argument should be greater than 0.");
	}

	let count = 0;
	let seedValue = seed;
	while (count < max) {
		yield randomIntSeeded(start, end, seedValue);
		count++;
		seedValue++;
	}
}

/**
 * Greatest Common Divisor
 * (for two values)
 * Internal function. Use gcd() outside the module.
 *
 * @param a
 * @param b
 * @return {number}
 */
function gcdTwo(a, b) {
	a = Math.abs(a);
	b = Math.abs(b);
	if (a === 0) return b;
	if (b === 0) return a;
	while (b !== 0) {
		[a, b] = [b, a % b];
	}
	return a;
}

/**
 * Least Common Multiple
 * (for two values)
 * Internal function. Use lcm() outside the module.
 *
 * @param a
 * @param b
 * @return {number}
 */
function lcmTwo(a, b) {
	if (a === 0 || b === 0) return 0;
	return Math.abs(a * b) / gcdTwo(a, b);
}