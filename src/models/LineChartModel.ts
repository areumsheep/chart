import type { Datum, Data } from '../types/Data';
import { ChartOptions } from '../types/LineChart';

class LineChartModel {
  points: Data = [];
  options: ChartOptions;

  constructor(options: ChartOptions) {
    this.options = options;
  }

  getInitialData = (datum: Datum) => {
    this.points.push(datum);
  };
}

export default LineChartModel;
