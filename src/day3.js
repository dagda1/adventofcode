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

  toString() {
    return `x1 = ${this.x1}, y1 = ${this.y1}, x2 = ${this.x2}, y2 = ${this.y2}, width = ${this.width}, height = ${
      this.height
    }`;
  }
}

const rects = lines.map(x => new Rect(x));

rects.forEach(current => {
  rects
    .filter(x => x !== current)
    .forEach(rect => {
      current.doesOverlap(rect);
    });
});

const overlaps = rects.filter(x => x.overlaps);

const maxOrMin = (op, prop) =>
  Math[op].apply(
    Math,
    overlaps.map(o => {
      return o[prop];
    })
  );

console.log(rects.length);
const xOverlap = maxOrMin('min', 'x2') - maxOrMin('max', 'x1');
const yOverlap = maxOrMin('min', 'y2') - maxOrMin('max', 'y1');

const area = xOverlap * yOverlap;

// 101781
