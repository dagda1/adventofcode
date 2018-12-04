import fs from 'fs';
import path from 'path';
import moment, { Moment } from 'moment';
import { sortBy, range, maxBy, max, values, mean } from 'lodash';

const input = fs.readFileSync(path.join(process.cwd(), 'src/day4.txt')).toString();

const lines = input.split('\n').slice(0, -1);

enum Action {
  beginShift = 'beginsShift',
  fallsAsleep = 'fallsAsleep',
  wakesUp = 'wakesUp'
}

interface Entry {
  date: Date;
  action: Action;
  id?: number;
  entry: string;
}

const dates: Entry[] = [];

lines.forEach(line => {
  const date = moment(line.match(/\[(.*?)\]/), 'YYYY-MM-DD HH:mm').toDate();

  const entry = line.substr(19);

  let action: Action;
  let id: number;

  if (entry.indexOf('#') > -1) {
    id = Number(entry.match(/\#\d+/)[0].substr(1));
    action = Action.beginShift;
  } else if (entry.indexOf('falls asleep') > -1) {
    action = Action.fallsAsleep;
  } else if (entry.indexOf('wakes up') > -1) {
    action = Action.wakesUp;
  } else {
    throw new Error('Unknown action');
  }

  dates.push({ id, date, action: action, entry: line });
});

const sorted = sortBy(dates, 'date');

class TimePeriod {
  beginShift: Moment;
  fallsAsleep?: Moment;
  wakesUp?: Moment;
  range: number[];
  timeAsleep?: number;

  constructor(date: Moment) {
    this.beginShift = date;
  }
}

class Guard {
  id: number;
  actions: TimePeriod[] = [];
  totalTimeAsleep: number = 0;

  constructor(id: number, date: Date) {
    this.id = id;

    this.actions.push(new TimePeriod(moment(date)));
  }

  addTime(date: Entry) {
    if (date.action === Action.beginShift) {
      this.actions.push(new TimePeriod(moment(date.date)));

      return;
    }

    if (!this.actions.length) {
      throw new Error('trying to add to no actions');
    }

    let latest = this.actions[this.actions.length - 1];
    const time = moment(date.date);

    if (date.action === Action.fallsAsleep) {
      latest.fallsAsleep = time;
    } else if (date.action === Action.wakesUp) {
      latest.wakesUp = moment(date.date);

      const fallsAsleep = latest.fallsAsleep.minutes();
      const wakesUp = latest.wakesUp.minutes();
      const timeAsleep = wakesUp - fallsAsleep;

      latest.range = range(fallsAsleep, wakesUp);
      latest.timeAsleep = timeAsleep;

      this.totalTimeAsleep += timeAsleep;
    }
  }
}

const guards: Guard[] = [];

let current: Guard;

for (const date of sorted) {
  if (date.action === Action.beginShift) {
    const id = date.id;

    current = guards.find(x => x.id === id) || new Guard(id, date.date);

    if (!guards.find(x => x === current)) {
      guards.push(current);
    } else {
      current.addTime(date);
    }

    continue;
  }

  if (
    date.action === Action.fallsAsleep &&
    current.actions.find(
      x => x.fallsAsleep && x.fallsAsleep.format('DDMMYYYY') === moment(date.date).format('DDMMYYYY')
    )
  ) {
    current.actions.push(new TimePeriod(moment(date.date)));
  }

  current.addTime(date);
}

const maxAsleepGuard = maxBy(guards, 'totalTimeAsleep');

class Highest {
  guardId: number;
  minute: number;
  total: number;

  constructor(guardId: number, minute: number, total: number) {
    this.guardId = guardId;
    this.minute = minute;
    this.total = total;
  }
}

let highestAsleepMinute = new Highest(0, 0, 0);

range(0, 60).forEach(minute => {
  let minutesSlept = 0;
  for (const action of maxAsleepGuard.actions) {
    const increase = Number(action.range.indexOf(minute) > -1);

    minutesSlept += increase;
  }

  if (minutesSlept > highestAsleepMinute.total) {
    highestAsleepMinute = new Highest(maxAsleepGuard.id, minute, minutesSlept);
  }
});

console.log(
  `part 1 = highest id = ${highestAsleepMinute.guardId}, minute = ${
    highestAsleepMinute.minute
  }, answer = ${highestAsleepMinute.guardId * highestAsleepMinute.minute}`
);

// part 2

let highestMinutesSlept = new Highest(0, 0, 0);

range(0, 60).forEach(i => {
  for (let i = 0; i < 60; i++) {
    for (let guard of guards) {
      let minutesSlept = 0;
      for (let action of guard.actions) {
        if (!action.range) {
          continue;
        }

        const increase = Number(action.range.indexOf(i) > -1);
        minutesSlept += increase;
      }

      if (minutesSlept > highestMinutesSlept.total) {
        highestMinutesSlept = new Highest(guard.id, i, minutesSlept);
      }
    }
  }
});

console.log(
  `part 2 - guardId = ${highestMinutesSlept.guardId}, minute = ${
    highestMinutesSlept.minute
  }  answer = ${highestMinutesSlept.guardId * highestMinutesSlept.minute}`
);
