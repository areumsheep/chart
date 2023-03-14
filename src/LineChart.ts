import LineChartView from './views/lineChart.view';
import LineChartModel from './models/lineChart.model';
import LineChartController from './controllers/lineChart.controller';

import CrossHair from './views/crosshair.view';

import type { ChartOptions } from './types/LineChart';
import type { Datum } from './types/Data';

import createCanvasElement from './utils/createCanvasElement';
import EVENT from './constants/event';

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

    this.crosshair = new CrossHair(crosshairCanvas);

    this.view = new LineChartView(displayCanvas);
    this.model = new LineChartModel(options);
    this.controller = new LineChartController(
      this.view,
      this.model,
      this.crosshair
    );
  }

  initData = (datum: Datum) => {
    this.bindEvents();

    this.model.getInitialData(datum);
    this.controller.updateModel();
  };

  updateData = (datum: Datum) => {
    this.model.getUpdateData(datum);
    const points = this.controller.formatPoints(this.model.datas);
    this.model.setPoints(points);
    this.controller.updateModel();
  };

  bindEvents = () => {
    this.wrapper.addEventListener('mousemove', (event) => {
      const nearestPoint = this.crosshair.getNearestPoint(event);
      if (nearestPoint) {
        this.crosshair.render(nearestPoint);
      }
    });

    this.wrapper.addEventListener(
      'wheel',
      (event) => {
        this.model.setAxisY(event.deltaY > 0 ? EVENT.ZOOM_OUT : EVENT.ZOOM_IN);
        const points = this.controller.formatPoints(this.model.datas);
        this.model.setPoints(points);
        this.controller.updateModel();
      },
      { passive: true }
    );

    window.addEventListener('resize', () => {
      const dpr = window.devicePixelRatio || 1;
      const { innerWidth } = window;
      const PADDING = 16;
      const changeWidth = innerWidth - PADDING;

      if (changeWidth > this.targetWidth) {
        this.wrapper.style.width = `${this.targetWidth}px`;

        this.displayCanvas.width = this.targetWidth * dpr;
        this.displayCanvas.style.width = `${this.targetWidth}px`;
        this.crosshairCanvas.width = this.targetWidth * dpr;
        this.crosshairCanvas.style.width = `${this.targetWidth}px`;

        const points = this.controller.formatPoints(this.model.datas);
        this.model.setPoints(points);
        this.controller.updateModel();
        return;
      }
      this.wrapper.style.width = `${changeWidth}px`;

      this.displayCanvas.width = changeWidth * dpr;
      this.displayCanvas.style.width = `${changeWidth}px`;
      this.crosshairCanvas.width = changeWidth * dpr;
      this.crosshairCanvas.style.width = `${changeWidth}px`;

      this.model.setWidth(innerWidth);
      const points = this.controller.formatPoints(this.model.datas);
      this.model.setPoints(points);
      this.controller.updateModel();
    });
  };
}

export default LineChart;
