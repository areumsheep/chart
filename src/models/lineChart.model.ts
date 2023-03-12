import LineChartController from '../controllers/lineChart.controller';
import type { Datum, Data } from '../types/Data';
import { ChartOptions } from '../types/LineChart';

class LineChartModel {
  points: Data = [];
  options: ChartOptions;
  controller?: LineChartController;

  constructor(options: ChartOptions) {
    this.options = options;
  }

  setController = (controller: LineChartController) => {
    this.controller = controller;
  };

  getInitialData = (datum: Datum) => {
    this.points.push(datum);
    this.controller?.updateModel();
  };
}

export default LineChartModel;
