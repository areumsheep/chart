import LineChartView from './views/lineChart.view';
import LineChartModel from './models/lineChart.model';
import LineChartController from './controllers/lineChart.controller';

import CrossHair from './views/crosshair.view';

import type { ChartOptions } from './types/Chart';
import type { Datum } from './types/Data';

import createCanvasElement from './utils/domain/createCanvasElement';
import { MOUSE_EVENT, RENDER_TYPE } from './constants/event';
import CHART_SETTINGS from './constants/chartSettings';
import getPixelRatio from './utils/domain/getPixelRatio';

import {
  formatXPointToData,
  formatYPointToData,
} from './utils/domain/formatPointToData';

class LineChart {
  wrapper: HTMLElement;
  chartWidth: number;
  chartHeight: number;
  chartDPR: number;

  displayCanvas: HTMLCanvasElement;
  crosshairCanvas: HTMLCanvasElement;

  view: LineChartView;
  model: LineChartModel;
  controller: LineChartController;
  crosshair: CrossHair;

  constructor($target: HTMLElement, options: ChartOptions) {
    const { w, h } = options.rect;

    const wrapper = document.createElement('div');
    wrapper.style.width = `${w}px`;
    wrapper.style.height = `${h}px`;
    wrapper.style.position = 'relative';
    this.wrapper = wrapper;
    this.chartWidth = w;
    this.chartHeight = h;
    this.chartDPR = getPixelRatio();

    const displayCanvas = createCanvasElement(w, h, 1);
    const crosshairCanvas = createCanvasElement(w, h);
    this.displayCanvas = displayCanvas;
    this.crosshairCanvas = crosshairCanvas;

    this.wrapper.insertAdjacentElement('afterbegin', displayCanvas);
    this.wrapper.insertAdjacentElement('afterbegin', crosshairCanvas);

    $target.insertAdjacentElement('afterbegin', this.wrapper);

    this.view = new LineChartView(displayCanvas);
    this.model = new LineChartModel(options);
    this.controller = new LineChartController(this.view, this.model);

    this.crosshair = new CrossHair(crosshairCanvas, this.model);
  }

  #bindDefaultEvents = () => {
    // 마우스 오른쪽 클릭(메뉴 모음) 이벤트 => X
    this.wrapper.addEventListener('contextmenu', (event) => {
      event.preventDefault();
    });

    // 마우스 이동 이벤트 => crossHair -> X
    this.wrapper.addEventListener('mousemove', (event) => {
      this.crosshair.findNearestPoint(event);
      this.crosshair.render();
    });

    // 마우스 휠 이벤트 => 전체
    this.wrapper.addEventListener('wheel', (event) => {
      this.model.setAxisY(
        event.deltaY > 0 ? MOUSE_EVENT.ZOOM_OUT : MOUSE_EVENT.ZOOM_IN
      );
      this.#redrawChart();
    });

    // 화면 비율 (반응형) 이벤트 => 전체
    window.addEventListener('resize', () => {
      const { innerWidth, innerHeight } = window;
      const { HORIZONTAL, VERTICAL } = CHART_SETTINGS.PADDING;
      const FORM_HEIGHT = 130;

      const changeWidth = innerWidth - HORIZONTAL;
      const changeHeight = innerHeight - VERTICAL - FORM_HEIGHT;

      const targetWidth =
        changeWidth < this.chartWidth ? changeWidth : this.chartWidth;
      const targetHeight =
        changeHeight < this.chartHeight ? changeHeight : this.chartHeight;

      this.changeSize(targetWidth, targetHeight);
    });
  };

  #redrawChart = (index?: number) => {
    if (index !== undefined) {
      const visibleDatas = this.model.filterVisibleDatas(index);
      const visiblePoints = this.controller.formatPoints(visibleDatas);

      this.model.datas[index].setPoints(visiblePoints);
    }

    this.view.render(RENDER_TYPE.ALL, this.model, this.chartDPR);
  };

  initData = (index: number, data: Datum) => {
    this.#bindDefaultEvents();

    this.model.datas[index].updateData(data);
    this.view.preRender(this.model);
  };

  updateData = (index: number, data: Datum) => {
    this.model.datas[index].updateData(data);
    this.model.updateRangeTime();
    this.#redrawChart(index);
  };

  // TODO: 확장성을 위해 아래 함수를 뺄 수 없을까?
  formatClickData = (xPoint: number, yPoint: number) => {
    const { w, h, xTick, xStart, xEnd, yEnd, yTick } = this.model.axis;

    const x = formatXPointToData(w, xStart, xEnd, xTick)(xPoint);
    const y = formatYPointToData(h, yEnd, yTick)(yPoint);

    return { x, y };
  };

  addPoint = (index: number, data: Datum) => {
    this.model.datas[index].updateData(data);
    this.#redrawChart(index);
  };

  removePoint = (index: number, point: number) => {
    const targetIndex = this.model.datas[index].findNearestXPointIndex(point);
    this.model.datas[index].removePoint(targetIndex);
    this.#redrawChart(index);
  };

  changeSize = (width?: number, height?: number) => {
    const dpr = this.chartDPR;

    if (width) {
      this.wrapper.style.width = `${width}px`;

      this.displayCanvas.width = width * dpr;
      this.displayCanvas.style.width = `${width}px`;
      this.crosshairCanvas.width = width * dpr;
      this.crosshairCanvas.style.width = `${width}px`;

      const chartWidth = width - CHART_SETTINGS.PADDING.HORIZONTAL;
      this.model.setWidth(chartWidth);
    }
    if (height) {
      this.wrapper.style.height = `${height}px`;

      this.displayCanvas.height = height * dpr;
      this.displayCanvas.style.height = `${height}px`;
      this.crosshairCanvas.height = height * dpr;
      this.crosshairCanvas.style.height = `${height}px`;

      const chartHeight = height - CHART_SETTINGS.PADDING.VERTICAL;
      this.model.setHeight(chartHeight);
    }

    this.crosshairCanvas.getContext('2d')?.scale(dpr, dpr);
    this.#redrawChart();
  };

  addEventListener = <K extends keyof WindowEventMap>(
    type: K,
    callback: (ev: WindowEventMap[K]) => any
  ) => {
    this.wrapper.addEventListener(type, (event) =>
      callback(event as WindowEventMap[K])
    );
  };
}

export default LineChart;
