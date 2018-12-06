import fs from 'fs';
import path from 'path';
import { maxBy, range, minBy } from 'lodash';

const input = fs
  .readFileSync(path.join(process.cwd(), 'src/day6.txt'))
  .toString()
  .trim()
  .split('\n');

export interface Point {
  x: number;
  y: number;
  count?: number;
  isInfinite?: boolean;
}

const points: Point[] = input.map(s => {
  const [x, y] = s.split(',').map(i => Number(i));

  return { x, y, count: 0 };
});

const maxX = maxBy(points, 'x').x;
const maxY = maxBy(points, 'y').y;

const isAtTheEdgeOfGrid = ({ x, y }: Point) => x === 0 || y === 0 || x === maxX - 1 || y === maxY - 1;

const manhattan = (left: Point, right: Point) => {
  return Math.abs(right.x - left.x) + Math.abs(right.y - left.y);
};

interface Distance {
  a: Point;
  b: Point;
  distance: number;
}

let region = 0;

for (const x of range(maxX + 1)) {
  for (const y of range(maxY + 1)) {
    let closestCoordinates: Point[] = [];
    let minDistance = Infinity;
    let totalDistance = 0;

    for (const point of points) {
      const a: Point = { x, y };
      const line: Distance = { a, b: point, distance: manhattan(a, point) };

      totalDistance += line.distance;

      if (line.distance < minDistance) {
        minDistance = line.distance;
        closestCoordinates = [point];
      } else if (line.distance === minDistance) {
        closestCoordinates.push(point);
      }
    }

    if (closestCoordinates.length === 1) {
      closestCoordinates[0].count++;
      if (isAtTheEdgeOfGrid({ x, y })) {
        closestCoordinates[0].isInfinite = true;
      }
    }
    if (totalDistance < 10000) {
      region++;
    }
  }
}

let largest = 0;
for (let point of points) {
  if (!point.isInfinite && point.count > largest) {
    largest = point.count;
  }
}

console.log(`largest area = ${largest}`);
console.log(`regions less than 1000 = ${region}`);
