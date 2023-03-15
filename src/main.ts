import LineChart from './LineChart';
import { initialData } from './constants/initalData';
import { $ } from './utils/dom';

const $app = $<HTMLDivElement>('#app');

document.addEventListener('DOMContentLoaded', () => {
  const lineChart = new LineChart($app, initialData);

  lineChart.initData({
    time: Date.now(),
    value: Math.random() * 100,
  });

  window.setInterval(() => {
    lineChart.updateData({
      time: Date.now(),
      value: Math.random() * 100,
    });
  }, 5000);
});
