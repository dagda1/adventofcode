//const input = fs.readFileSync(path.join(process.cwd(), 'src/day4.txt')).toString();
import fs from 'fs';
import path from 'path';

const input = fs
  .readFileSync(path.join(process.cwd(), 'src/day5.txt'))
  .toString()
  .trim();

const reactifyPolymer = (s: string) => {
  let good = [];
  for (let char of input.split('')) {
    const head: string = good[good.length - 1];

    if (head && head.toLowerCase() === char.toLowerCase() && head !== char) {
      good.pop();
    } else {
      good.push(char);
    }
  }

  return good;
};

const reacted = reactifyPolymer(input);

// part 1
console.log(`${reacted.length} remaining`);

const units = new Set();
const results: number[] = [];

input
  .toLowerCase()
  .split('')
  .forEach(unit => {
    if (!units.has(unit)) {
      units.add(unit);
    }
  });

for (var unit of units) {
  console.log(unit);
  const r2 = reactifyPolymer(input.replace(new RegExp(unit, 'ig'), ''));

  results.push(r2.length);

  units.add(unit);
}

console.log(Math.min(...results));
