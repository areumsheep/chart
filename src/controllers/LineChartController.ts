import LineChartModel from '../models/LineChartModel';
import LineChartView from '../views/LineChartView';

class LineChartController {
  view: LineChartView;
  model: LineChartModel;

  constructor(view: LineChartView, model: LineChartModel) {
    this.view = view;
    this.model = model;
  }
}

export default LineChartController;
