import LineChart from './LineChart';

const $lineChart = document.querySelector('#lineChart') as HTMLCanvasElement;

document.addEventListener('DOMContentLoaded', () => {
  const lineChart = new LineChart($lineChart);
  lineChart.getInitialData({ time: Date.now(), value: Math.random() * 100 });

  window.setInterval(() => {
    lineChart.getUpdateData({ time: Date.now(), value: Math.random() * 100 });
  }, 5000);
});
