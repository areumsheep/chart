import LineChartView from '../views/lineChart.view';
import LineChartModel from '../models/lineChart.model';
import CHART from '../constants/chart';
import type { Datum } from '../types/Data';
import type { Point } from '../types/LineChart';

import { binarySearch } from '../utils/search';
import CrossHair from '../views/crosshair.view';

class LineChartController {
  view: LineChartView;
  model: LineChartModel;
  crosshair: CrossHair;

  constructor(
    view: LineChartView,
    model: LineChartModel,
    crosshair: CrossHair
  ) {
    this.view = view;
    this.model = model;
    this.crosshair = crosshair;

    this.view.setController(this);
    this.crosshair.setController(this);
  }

  formatX = (time: number) => {
    const { w } = this.model.options.rect;
    const {
      tick,
      range: { start, end },
    } = this.model.options.axisX;

    const xTickCount = (end - start) / tick;
    const bandWidthX = Math.floor((w - CHART.PADDING.VERTICAL) / xTickCount);

    const timePoint = (time - start) / tick;
    const xPoint =
      Math.floor(timePoint * bandWidthX + CHART.PADDING.VERTICAL) - 1;

    return xPoint;
  };

  formatY = (value: number) => {
    const { h } = this.model.options.rect;
    const {
      tick,
      range: { end },
    } = this.model.options.axisY;

    const tickCount = end / tick;
    const bandWidth = Math.floor((h - CHART.PADDING.VERTICAL) / tickCount);

    const yPoint = Math.floor(h - (value / end) * bandWidth * tickCount);

    return yPoint;
  };

  formatPoints = (datas: Datum[]) => {
    const points: Point[] = [];

    datas.map(({ time, value }) => {
      const x = this.formatX(time);
      const y = this.formatY(value);

      points.push({ x, y });
    });

    return points;
  };

  findNearestPoint = (point: number) => {
    const nearestIndex = binarySearch(this.model.points, point, 'x');
    return this.model.points[nearestIndex];
  };

  updateModel = () => {
    requestAnimationFrame(() => {
      this.view.render(this.model);
    });
  };
}

export default LineChartController;
