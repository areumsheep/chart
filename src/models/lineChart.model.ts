import type { Datum, Data } from '../types/Data';
import { ChartOptions } from '../types/LineChart';

import CHART from '../constants/chart';

class LineChartModel {
  points: Data = [];
  options: ChartOptions;

  constructor(options: ChartOptions) {
    this.options = {
      ...options,
      rect: {
        x: CHART.PADDING.HORIZONTAL,
        y: CHART.PADDING.VERTICAL,
        w: options.rect.w - CHART.PADDING.HORIZONTAL,
        h: options.rect.h - CHART.PADDING.VERTICAL,
      },
    };
  }

  getInitialData = (datum: Datum) => {
    this.points.push(datum);
  };

  getUpdateData = (datum: Datum) => {
    this.points.push(datum);
    this.options = {
      ...this.options,
      axisX: {
        range: {
          start: Date.now() - 60 * 5 * 1000,
          end: Date.now(),
        },
      },
    };
  };
}

export default LineChartModel;
