import { ChartOptions } from '../types/LineChart';

export const initialData: ChartOptions = {
  rect: {
    x: 0,
    y: 0,
    w: 500,
    h: 300,
  },
  axisX: {
    range: {
      start: Date.now(),
      end: Date.now(),
    },
  },
  axisY: {
    range: {
      start: 0,
      end: 100,
    },
  },
  tics: {
    x: 60 * 1000,
    y: 10,
  },
};
