import { readFile } from "fs/promises";

const url = new URL("input.txt", import.meta.url);
const input = await readFile(url, "utf8");

const lines = input.split("\n");

const listOne = [];
const listTwo = [];

for (let i = 0; i < lines.length; i++) {
	const line = lines[i];
	const [a, b] = line.split(" ").map((x) => parseInt(x));
	listOne.push(a);
	listTwo.push(b);
}

listOne.sort((a, b) => {
	return a - b;
});
listTwo.sort((a, b) => {
	return a - b;
});

let total = 0;
for (let i = 0; i < listOne.length; i++) {
	total += Math.abs(listOne[i] - listTwo[i]);
}

console.log("Total :", total);

let s = 0;
let similarityScore = 0;
for (let i = 0; i < lines.length; i++) {
	for (let j = 0; j < lines.length; j++) {
		if (listOne[i] <= listTwo[j] && listOne[i] == listTwo[j]) {
			s++;
		}
	}
	similarityScore += listOne[i] * s;
	s = 0;
}

console.log("Similarity score:", similarityScore);
