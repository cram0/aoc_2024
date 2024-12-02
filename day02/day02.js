import { readFile } from "fs/promises";

const url = new URL("input.txt", import.meta.url);
const input = await readFile(url, "utf8");

const lines = input.split("\n");

const isIncreasing = (report) => {
	for (let i = 0; i < report.length; i++) {
		if (report[i + 1]) {
			const difference = Math.abs(report[i] - report[i + 1]);
			if (difference < 1 || difference > 3) {
				return false;
			}
			if (report[i] >= report[i + 1]) {
				return false;
			}
		}
	}

	return true;
};

const isDecreasing = (report) => {
	for (let i = 0; i < report.length; i++) {
		if (report[i + 1]) {
			const difference = Math.abs(report[i] - report[i + 1]);
			if (difference < 1 || difference > 3) {
				return false;
			}
			if (report[i] <= report[i + 1]) {
				return false;
			}
		}
	}

	return true;
};

let total = 0;
for (const line of lines) {
	const numbers = line.split(" ").map((x) => parseInt(x));

	// If the numbers are increasing
	if (isIncreasing(numbers)) {
		total++;
		continue;
	} else {
		// If the numbers are not increasing, we try each possibilities by removing one number at a time on each index
		for (let i = 0; i < numbers.length; i++) {
			if (isIncreasing(numbers.toSpliced(i, 1))) {
				total++;
				break;
			}
		}
	}

	// If the numbers are decreasing
	if (isDecreasing(numbers)) {
		total++;
		continue;
	} else {
		// If the numbers are not decreasing, we try each possibilities by removing one number at a time on each index
		for (let i = 0; i < numbers.length; i++) {
			if (isDecreasing(numbers.toSpliced(i, 1))) {
				total++;
				break;
			}
		}
	}
}

console.log(total);
