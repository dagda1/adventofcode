'use strict';
const fs = require('fs');
const path = require('path');
const moment = require('moment');

const input = fs.readFileSync(path.join(__dirname, 'day4.txt')).toString();

const lines = input.split('\n').slice(0, -1);

const ksort = src => {
  const keys = Object.keys(src),
    target = {};

  keys.sort(function(a, b) {
    return moment(b).format('X') - moment(a).format('X');
  });

  keys.forEach(key => {
    target[key] = src[key];
  });

  return target;
};

const dates = {};

lines.forEach(line => {
  const date = moment(line.match(/\[(.*?)\]/), 'YYYY-MM-DD HH:mm');

  const rest = line.substr(19);

  dates[date] = rest;
});

sorted = ksort(dates);
