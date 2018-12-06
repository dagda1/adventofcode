import fs from 'fs';
import path from 'path';
import { maxBy, range, minBy } from 'lodash';

/* 
const input = fs
  .readFileSync(path.join(process.cwd(), 'src/day6.txt'))
  .toString()
  .trim().split('\n');
 */
const input = `1, 1
1, 6
8, 3
3, 4
5, 5
8, 9`.split('\n');

export interface Point {
  x: number;
  y: number;
}

const points: Point[] = input.map(s => {
  const [x, y] = s.split(',').map(i => Number(i));

  return { x, y };
});

const minX = minBy(points, 'x').x;
const minY = minBy(points, 'y').y;
const maxX = maxBy(points, 'x').x;
const maxY = maxBy(points, 'y').y;

const maxDistance = Number.MAX_VALUE;

console.log(maxDistance);

const manhattan = (left: Point, right: Point) => {
  return Math.abs(right.x - left.x) + Math.abs(right.y - left.y);
};

interface Distance {
  a: Point;
  b: Point;
  distance: number;
}

const grid: Distance[] = [];

const minimums: Distance[] = [];

for (const x of range(maxX + 1)) {
  for (const y of range(maxY + 1)) {
    for (const point of points) {
      const a: Point = { x, y };
      const distance: Distance = { a, b: point, distance: manhattan(a, point) };

      grid.push(distance);
    }

    const minimum = minBy(grid, 'distance');

    minimums.push(minimum);
  }
}

const filteredGrid = grid.filter(point => {
  if (point.a.x === 0 || point.a.y === 0) {
    return false;
  }

  if (point.a.x === maxX || point.a.y === maxY) {
    return false;
  }

  return true;
});

console.dir(grid);
