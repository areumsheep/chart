import LineChartView from './views/lineChart.view';
import LineChartModel from './models/lineChart.model';
import LineChartController from './controllers/lineChart.controller';

import CrossHair from './views/crosshair.view';

import type { ChartOptions } from './types/Chart';
import type { Datum } from './types/Data';

import createCanvasElement from './utils/domain/createCanvasElement';
import { MOUSE_EVENT, RENDER_TYPE } from './constants/event';
import CHART_SETTINGS from './constants/chartSettings';

class LineChart {
  wrapper: HTMLElement;
  targetWidth: number;
  targetHeight: number;

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
    this.wrapper = wrapper;
    this.targetWidth = w;
    this.targetHeight = h;

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

  initData = (datum: Datum) => {
    this.bindEvents();

    this.model.addInitialData(datum);
    this.view.preRender(this.model);
  };

  updateData = (datum: Datum) => {
    this.model.addUpdateData(datum);
    this.redrawChart();
  };

  bindEvents = () => {
    // 마우스 이동 이벤트 => crossHair -> X
    this.wrapper.addEventListener('mousemove', (event) => {
      this.crosshair.findNearestPoint(event);
      this.crosshair.render();
    });
    // 마우스 오른쪽 클릭(메뉴 모음) 이벤트 => X
    this.wrapper.addEventListener('contextmenu', (event) => {
      event.preventDefault();
    });

    // 마우스 왼쪽, 오른쪽 이벤트 => clickedChart
    this.wrapper.addEventListener('mousedown', (event) => {
      event.preventDefault();
      const isLeftClick = event.button === 0;
      const isRightClick = event.button === 2 || event.button === 3;

      if (isLeftClick) {
        this.model.addClickedPoint({ x: event.clientX, y: event.clientY });
      }
      if (isRightClick) {
        const index = this.model.findNearestPointIndex(
          this.model.clickedPoints,
          event.clientX,
          'x'
        );
        this.model.deleteClickedPoint(index);
      }
      this.view.render(RENDER_TYPE.CLICKED_CHART, this.model);
    });

    // 마우스 휠 이벤트 => 전체
    this.wrapper.addEventListener('wheel', (event) => {
      this.model.setAxisY(
        event.deltaY > 0 ? MOUSE_EVENT.ZOOM_OUT : MOUSE_EVENT.ZOOM_IN
      );
      this.redrawChart();
    });

    // 화면 비율 (반응형) 이벤트 => 전체
    window.addEventListener('resize', () => {
      const { innerWidth } = window;
      const PADDING = 16;
      const changeWidth = innerWidth - PADDING;

      if (changeWidth < this.targetWidth) {
        this.changeSize(changeWidth);
      } else {
        this.changeSize(this.targetWidth);
      }
    });
  };

  changeSize = (width?: number, height?: number) => {
    const dpr = window.devicePixelRatio || 1;

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
    this.redrawChart();
  };

  redrawChart = () => {
    const points = this.controller.formatPoints(this.model.datas);
    this.model.setPoints(points);
    this.view.render(RENDER_TYPE.ALL, this.model);
  };
}

export default LineChart;
