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
    value: Math.random() * 100,
  };
};

document.addEventListener('DOMContentLoaded', () => {
  const { refreshTime } = initialData;
  const {
    0: { data: realtimeData },
    1: { data: clickData },
  } = initialData.datasets;

  realtimeData.push(randomPoint());
  lineChart.initData(0, realtimeData);
  lineChart.addEventListener('mousedown', (event) => {
    event.preventDefault();

    const isLeftClick = event.button === 0;
    const isRightClick = event.button === 2 || event.button === 3;

    if (isLeftClick) {
      //TODO 그래프 값 추가 이벤트
    } else if (isRightClick) {
      lineChart.removePoint(0, event.clientX);
    }
  });

  if (refreshTime) {
    window.setInterval(() => {
      realtimeData.push(randomPoint());

      lineChart.updateData(0, realtimeData);
    }, refreshTime);
  }
});

$form.addEventListener('submit', (event) => {
  event.preventDefault();

  const width = $widthInput.value;
  const height = $heightInput.value;

  lineChart.changeSize(Number(width), Number(height));
});
