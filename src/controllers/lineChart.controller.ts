import LineChartView from '../views/lineChart.view';
import LineChartModel from '../models/lineChart.model';
import type { Datum } from '../types/Data';
import type { Point } from '../types/Chart';

import { binarySearch } from '../utils/search';
import { formatX, formatY } from '../utils/domain/formatDataToPoint';

class LineChartController {
  view: LineChartView;
  model: LineChartModel;

  constructor(view: LineChartView, model: LineChartModel) {
    this.view = view;
    this.model = model;

    this.view.setController(this);
  }

  useFormatterX = (time: number) => {
    const { w } = this.model.options.rect;
    const {
      tick,
      range: { start, end },
    } = this.model.options.xAxis;

    return formatX(w, start, end, tick)(time);
  };

  useFormatterY = (value: number) => {
    const { h } = this.model.options.rect;
    const {
      tick,
      range: { end },
    } = this.model.options.yAxis;

    return formatY(h, end, tick)(value);
  };

  formatPoints = (datas: Datum[]) => {
    const points: Point[] = [];

    datas.map(({ time, value }) => {
      const x = this.useFormatterX(time);
      const y = this.useFormatterY(value);

      points.push({ x, y });
    });

    return points;
  };

  findNearestClickedPoint = (point: number) => {
    const nearestIndex = binarySearch(this.model.clickedPoints, point, 'x');
    return nearestIndex;
  };
}

export default LineChartController;
