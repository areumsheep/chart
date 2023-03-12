import LineChartView from '../views/lineChart.view';
import LineChartModel from '../models/lineChart.model';

class LineChartController {
  view: LineChartView;
  model: LineChartModel;

  constructor(view: LineChartView, model: LineChartModel) {
    this.view = view;
    this.model = model;

    this.view.setController(this);
  }

  updateModel = () => {
    this.view.render(this.model);
  };
}

export default LineChartController;
