import LineChart from './LineChart';
import { initialData } from './constants/initalData';
import { $ } from './utils/dom';

const $app = $<HTMLDivElement>('#app');
const $form = $<HTMLFormElement>('#resize-form');
const $widthInput = $<HTMLInputElement>('#width-input');
const $heightInput = $<HTMLInputElement>('#height-input');

$widthInput.value = `${initialData.rect.w}`;
$heightInput.value = `${initialData.rect.h}`;

const lineChart = new LineChart($app, initialData);

const randomPoint = () => {
  return {
    time: Date.now(),
    value: Math.random() * initialData.yAxis.range.end,
  };
};

document.addEventListener('DOMContentLoaded', () => {
  lineChart.initData(randomPoint());

  const { refreshTime } = initialData;
  if (refreshTime) {
    window.setInterval(() => {
      lineChart.updateData(randomPoint());
    }, refreshTime);
  }
});

$form.addEventListener('submit', (event) => {
  event.preventDefault();
  const width = $widthInput.value;
  const height = $heightInput.value;

  lineChart.changeSize(Number(width), Number(height));
});
