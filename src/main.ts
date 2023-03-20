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
  const clickData = initialData.datasets[1].data;

  lineChart.initData(randomPoint());
  lineChart.addEventListener('mousedown', (event) => {
    event.preventDefault();

    const isLeftClick = event.button === 0;
    const isRightClick = event.button === 2 || event.button === 3;
  });
});

$form.addEventListener('submit', (event) => {
  event.preventDefault();

  const width = $widthInput.value;
  const height = $heightInput.value;

  lineChart.changeSize(Number(width), Number(height));
});
