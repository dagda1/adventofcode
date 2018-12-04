'use strict';
const fs = require('fs');
const path = require('path');

/* const input = '#1 @ 1,3: 4x4\n#2 @ 3,1: 4x4\n#3 @ 5,5: 2x2\n'; */

const input = fs.readFileSync(path.join(__dirname, 'day3.txt')).toString();

const lines = input.split('\n').slice(0, -1);

class Rect {
  constructor(line) {
    const [x, y] = line.match(/\d+,\d+/g, line)[0].split(',');
    const [width, height] = line.match(/\d+x\d+/g, line)[0].split('x');
    this.id = line.match(/^#\d+/g, line)[0].split('#')[1];
    this.x1 = Number(x);
    this.y1 = Number(y);
    this.width = Number(width);
    this.height = Number(height);
    this.x2 = this.x1 + Number(width);
    this.y2 = this.y1 + Number(height);
    this.overlaps = false;
  }

  doesOverlap(rect) {
    if (this.x1 >= rect.x2 || rect.x1 >= this.x2) {
      return false;
    }

    if (this.y1 >= rect.y2 || rect.y1 >= this.y2) {
      return false;
    }

    this.overlaps = true;
  }
}

const rects = lines.map(x => new Rect(x));

// part 1

const getOverlappingArea = claims => {
  const claimArea = [];

  let overlaps = 0;

  for (let claim of claims) {
    const { x1, x2, y1, y2 } = claim;

    for (let row = y1; row < y2; row++) {
      for (let col = x1; col < x2; col++) {
        if (!claimArea[row]) {
          claimArea[row] = [];
        }
        if (!claimArea[row][col]) {
          claimArea[row][col] = 0;
        } else if (claimArea[row][col] === 1) {
          overlaps++;
        }
        claimArea[row][col]++;
      }
    }
  }

  return overlaps;
};

console.log(`overlapping area of ${getOverlappingArea(rects)} inches squared`);

// part 2
rects.forEach(current => {
  rects
    .filter(x => x !== current)
    .forEach(rect => {
      current.doesOverlap(rect);
    });
});

console.log(`non overlapping rect of id ${rects.find(x => !x.overlaps).id}`);
