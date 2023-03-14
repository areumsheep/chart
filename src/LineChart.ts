import LineChartView from './views/lineChart.view';
import LineChartModel from './models/lineChart.model';
import LineChartController from './controllers/lineChart.controller';

import CrossHair from './views/crosshair.view';

import type { ChartOptions } from './types/LineChart';
import type { Datum } from './types/Data';

class LineChart {
  view: LineChartView;
  model: LineChartModel;
  controller: LineChartController;
  crosshair: CrossHair;

  constructor(canvas: HTMLCanvasElement, options: ChartOptions) {
    const dpr = window.devicePixelRatio || 1;
    const { width, height } = canvas;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    this.crosshair = new CrossHair(canvas, canvas.width, canvas.height);

    this.view = new LineChartView(canvas);
    this.model = new LineChartModel(options);
    this.controller = new LineChartController(
      this.view,
      this.model,
      this.crosshair
    );
  }

  initData = (datum: Datum) => {
    this.model.getInitialData(datum);
    this.crosshair.bindEvent();

    this.controller.updateModel();
  };

  updateData = (datum: Datum) => {
    this.model.getUpdateData(datum);
    const points = this.controller.formatPoints(this.model.datas);
    this.model.getUpdatePoint(points);
    this.controller.updateModel();
  };
}

export default LineChart;
