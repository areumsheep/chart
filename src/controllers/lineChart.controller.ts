import LineChartView from '../views/lineChart.view';
import LineChartModel from '../models/lineChart.model';
import CHART_SETTINGS from '../constants/chartSettings';
import type { Datum } from '../types/Data';
import type { Point } from '../types/Chart';

import { binarySearch } from '../utils/search';

class LineChartController {
  view: LineChartView;
  model: LineChartModel;

  constructor(view: LineChartView, model: LineChartModel) {
    this.view = view;
    this.model = model;

    this.view.setController(this);
  }

  formatX = (time: number) => {
    const { w } = this.model.options.rect;
    const {
      tick,
      range: { start, end },
    } = this.model.options.axisX;

    const xTickCount = (end - start) / tick;
    const bandWidthX = Math.floor(
      (w - CHART_SETTINGS.PADDING.VERTICAL) / xTickCount
    );

    const timePoint = (time - start) / tick;
    const xPoint =
      Math.floor(timePoint * bandWidthX + CHART_SETTINGS.PADDING.VERTICAL) - 1;

    return xPoint;
  };

  formatY = (value: number) => {
    const { h } = this.model.options.rect;
    const {
      tick,
      range: { end },
    } = this.model.options.axisY;

    const tickCount = end / tick;
    const bandWidth = Math.floor(
      (h - CHART_SETTINGS.PADDING.VERTICAL) / tickCount
    );

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

  findNearestClickedPoint = (point: number) => {
    const nearestIndex = binarySearch(this.model.clickedPoints, point, 'x');
    return nearestIndex;
  };

  updateModel = () => {
    requestAnimationFrame(() => {
      this.view.render(this.model);
    });
  };
}

export default LineChartController;
