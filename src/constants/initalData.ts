import { ChartOptions } from '../types/LineChart';

export const initialData: ChartOptions = {
  rect: {
    x: 0,
    y: 0,
    w: 700,
    h: 500,
  },
  axisX: {
    format: 'HH:mm',
    tick: 60 * 1000,
    range: {
      start: Date.now() - 60 * 5 * 1000,
      end: Date.now(),
    },
  },
  axisY: {
    tick: 10,
    range: {
      start: 0,
      end: 100,
    },
  },
};
