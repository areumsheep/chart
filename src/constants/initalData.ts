import { ChartOptions } from '../types/LineChart';

export const initialData: ChartOptions = {
  rect: {
    x: 0,
    y: 0,
    w: 500,
    h: 300,
  },
  axisX: {
    format: 'HH:mm',
    range: {
      start: Date.now() - 60 * 5 * 1000,
      end: Date.now(),
    },
  },
  axisY: {
    range: {
      start: 0,
      end: 100,
    },
  },
  ticks: {
    x: 60 * 1000,
    y: 10,
  },
};
