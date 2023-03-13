import LineChartView from './views/lineChart.view';
import LineChartModel from './models/lineChart.model';
import LineChartController from './controllers/lineChart.controller';

import type { ChartOptions } from './types/LineChart';
import type { Datum } from './types/Data';

class LineChart {
  view: LineChartView;
  model: LineChartModel;
  controller: LineChartController;

  constructor(canvas: HTMLCanvasElement, options: ChartOptions) {
    const dpr = window.devicePixelRatio || 1;
    const { width, height } = canvas;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    this.view = new LineChartView(canvas);
    this.model = new LineChartModel(options);

    this.controller = new LineChartController(this.view, this.model);
  }

  initData = (datum: Datum) => {
    this.model.getInitialData(datum);
    this.controller.updateModel();
  };

  updateData = (datum: Datum) => {
    this.model.getUpdateData(datum);
    this.controller.updateModel();
  };
}

export default LineChart;
