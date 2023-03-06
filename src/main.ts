import LineChart from './LineChart.js';

const $lineChart = document.querySelector('#lineChart') as HTMLCanvasElement;

document.addEventListener('DOMContentLoaded', () => {
  new LineChart($lineChart);
});
