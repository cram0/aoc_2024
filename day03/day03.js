import { readFile } from "fs/promises";

const url = new URL("input.txt", import.meta.url);
const input = await readFile(url, "utf8");

const regexMul = RegExp(/mul\((\d+),(\d+)\)/);
const regexDo = RegExp(/do\(\)/);
const regexDont = RegExp(/don't\(\)/);

let enabled = true;

let total = 0;

const tokens = input.split(/(?=mul\()|(?=do\(\))|(?=don't\(\))/);

for (const token of tokens) {
	if (regexDo.exec(token) != null) {
		enabled = true;
		continue;
	} else if (regexDont.exec(token) != null) {
		enabled = false;
		continue;
	}

	if (enabled) {
		const match = regexMul.exec(token);
		if (match != null) {
			let [a, b] = match[0].split(/(?=\()/)[1].split(",");
			a = a.split("(")[1];
			b = b.split(")")[0];
			total += parseInt(a) * parseInt(b);
		}
	}
}

console.log(total);
