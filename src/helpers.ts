import update from 'immutability-helper';

const COLS = 5;
const ROWS = 5;
const SMALL_VEHICLE = 0;
const MEDIUM_VEHICLE = 1;
const LARGE_VEHICLE = 2;
const VEHICLE_EMOJIS = ['🚗', '🚙', '🚚'];
const SLOT_SIZES = ['SP', 'MP', 'LP'];
const FLAT_RATE = 40;
const RATE_PER_24_HOURS = 5000;
const RATE_PER_SIZE = [20, 60, 100];
const HOURLY_RATE_CONSTRAINT = 3;

const ENTRIES = [
  // [row, col]
  [0, 2],
  [2, 0],
  [ROWS - 1, 2],
];

/*
  ROWS, COLUMNS & ENTRIES
  0 1 E 3 4
  0 1 2 3 4
  E 1 2 3 4
  0 1 2 3 4
  0 1 E 3 4
*/

const sample: Slot = {
  available: true,
  isEntry: false,
  slotSize: 0,
  vehicleSize: 0,
  row: 0,
  col: 0,
};

const initSlots = () => {
  const arr: Slot[][] = [];
  for (let r = 0; r < ROWS; r++) {
    arr.push([]);
    for (let c = 0; c < COLS; c++) {
      const copy = Object.assign({}, sample);
      copy.row = r;
      copy.col = c;
      copy.isEntry = isEntry(r, c);
      copy.slotSize = Math.floor(Math.random() * 3);
      arr[r].push(copy);
    }
  }
  return arr;
};

const isEntry = (row: number, col: number) =>
  ENTRIES.some(e => e[0] === row && e[1] === col);

const park = (entry: Slot, vehicleSize: number, slots: Slot[][]) => {
  let prevDistance = Infinity;
  let prevRow = -1;
  let prevCol = -1;

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const slot = slots[row][col];
      const distance = Math.abs(entry.row - row) + Math.abs(entry.col - col);
      // 1. Distance is valid
      // 2. Slot is available
      // 3. Vehicle size can fit
      // 4. Not an entry
      if (
        prevDistance > distance &&
        slot.available &&
        vehicleSize <= slot.slotSize &&
        !isEntry(row, col)
      ) {
        prevDistance = distance;
        prevRow = row;
        prevCol = col;
      }
    }
  }

  if (prevRow > -1 && prevCol > -1) {
    return update(slots, {
      [prevRow]: {
        [prevCol]: {available: {$set: false}, vehicleSize: {$set: vehicleSize}},
      },
    });
  }

  return undefined;
};

const unpark = (entry: Slot, slots: Slot[][]) => {
  // Simple unpark function
  // by setting the flag to false
  return update(slots, {
    [entry.row]: {
      [entry.col]: {available: {$set: true}},
    },
  });
};

const helpers = {
  ROWS,
  COLS,
  ENTRIES,
  SMALL_VEHICLE,
  MEDIUM_VEHICLE,
  LARGE_VEHICLE,
  VEHICLE_EMOJIS,
  SLOT_SIZES,
  FLAT_RATE,
  RATE_PER_SIZE,
  HOURLY_RATE_CONSTRAINT,
  RATE_PER_24_HOURS,
  initSlots,
  isEntry,
  park,
  unpark,
};

export default helpers;
