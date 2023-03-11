import LineChartView from './views/LineChartView';
import LineChartModel from './models/LineChartModel';
import LineChartController from './controllers/LineChartController';

import type { ChartOptions } from './types/LineChart';

class LineChart {
  lineChartView: LineChartView;
  lineChartModel: LineChartModel;
  lineChartController: LineChartController;

  constructor(canvas: HTMLCanvasElement, options: ChartOptions) {
    this.lineChartView = new LineChartView(canvas);
    this.lineChartModel = new LineChartModel(options);

    this.lineChartModel.getInitialData({
      time: Date.now(),
      value: Math.random() * 100,
    });

    this.lineChartController = new LineChartController(
      this.lineChartView,
      this.lineChartModel
    );
  }
}

export default LineChart;
