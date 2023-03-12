import LineChartView from './views/lineChart.view';
import LineChartModel from './models/lineChart.model';
import LineChartController from './controllers/lineChart.controller';

import type { ChartOptions } from './types/LineChart';
import { Datum } from './types/Data';

class LineChart {
  view: LineChartView;
  model: LineChartModel;
  controller: LineChartController;

  constructor(canvas: HTMLCanvasElement, options: ChartOptions) {
    this.view = new LineChartView(canvas);
    this.model = new LineChartModel(options);

    this.controller = new LineChartController(this.view, this.model);
  }

  initData = (datum: Datum) => {
    this.model.getInitialData(datum);
  };
}

export default LineChart;
