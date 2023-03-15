import LineChart from './LineChart';
import { initialData } from './constants/initalData';
import { $ } from './utils/dom';

const $app = $<HTMLDivElement>('#app');
const $form = $<HTMLFormElement>('#resize-form');
const $widthInput = $<HTMLInputElement>('#width-input');
const $heightInput = $<HTMLInputElement>('#height-input');

const lineChart = new LineChart($app, initialData);
$widthInput.value = `${initialData.rect.w}`;
$heightInput.value = `${initialData.rect.h}`;

document.addEventListener('DOMContentLoaded', () => {
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

$form.addEventListener('submit', (event) => {
  event.preventDefault();
  const width = $widthInput.value;
  const height = $heightInput.value;

  lineChart.changeSize(Number(width), Number(height));
});
