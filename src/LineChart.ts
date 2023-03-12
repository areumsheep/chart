import LineChartView from './views/lineChart.view';
import LineChartModel from './models/lineChart.model';
import LineChartController from './controllers/lineChart.controller';

import type { ChartOptions } from './types/LineChart';
import { Datum } from './types/Data';

class LineChart {
  lineChartView: LineChartView;
  lineChartModel: LineChartModel;
  lineChartController: LineChartController;

  constructor(canvas: HTMLCanvasElement, options: ChartOptions) {
    this.lineChartView = new LineChartView(canvas);
    this.lineChartModel = new LineChartModel(options);

    this.lineChartController = new LineChartController(
      this.lineChartView,
      this.lineChartModel
    );
  }

  initData = (datum: Datum) => {
    this.lineChartModel.getInitialData(datum);
  };
}

export default LineChart;
