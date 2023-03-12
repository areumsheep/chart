import LineChart from './LineChart';
import { initialData } from './constants/initalData';

const $lineChart = document.querySelector('#lineChart') as HTMLCanvasElement;

document.addEventListener('DOMContentLoaded', () => {
  const lineChart = new LineChart($lineChart, initialData);

  lineChart.initData({
    time: Date.now(),
    value: Math.random() * 100,
  });
});
