import LineChart from './LineChart';

const $lineChart = document.querySelector('#lineChart') as HTMLCanvasElement;

document.addEventListener('DOMContentLoaded', () => {
  const lineChart = new LineChart($lineChart);
});
