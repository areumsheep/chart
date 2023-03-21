import LineChartView from '../views/lineChart.view';
import LineChartModel from '../models/lineChart.model';
import type { Datum } from '../types/Data';
import type { Point } from '../types/Chart';

import { formatX, formatY } from '../utils/domain/formatDataToPoint';

class LineChartController {
  view: LineChartView;
  model: LineChartModel;
  xStart: number;
  xEnd: number;
  yEnd: number;

  constructor(view: LineChartView, model: LineChartModel) {
    this.view = view;
    this.model = model;
    this.xStart = model.options.xAxis.range.start;
    this.xEnd = model.options.xAxis.range.end;
    this.yEnd = model.options.yAxis.range.end;

    this.view.setController(this);
  }

  formatPoints = (datas: Datum[]) => {
    const points: Point[] = [];
    const { w, h, xTick, xStart, xEnd, yEnd, yTick } = this.model.axis;

    datas.map(({ time, value }) => {
      const x = formatX(w, xStart, xEnd, xTick)(time);
      const y = formatY(h, yEnd, yTick)(value);

      points.push({ x, y });
    });

    return points;
  };
}

export default LineChartController;
