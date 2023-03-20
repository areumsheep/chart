import { ChartOptions } from '../types/Chart';
import COLOR from './color';

export const initialData: ChartOptions = {
  rect: {
    x: 0,
    y: 0,
    w: 700,
    h: 500,
  },
  refreshTime: 5 * 1000,
  datasets: [
    {
      type: 'line',
      data: [],
      color: COLOR.blue,
    },
    {
      type: 'line',
      data: [],
      color: COLOR.orange,
    },
  ],
  xAxis: {
    type: 'time',
    format: 'HH:mm',
    tick: 60 * 1000,
    range: {
      start: Date.now() - 60 * 5 * 1000,
      end: Date.now(),
    },
  },
  yAxis: {
    type: 'value',
    tick: 10,
    range: {
      start: 0,
      end: 100,
      min: 10,
      max: 200,
    },
  },
};
