import LineChartView from '../views/lineChart.view';
import LineChartModel from '../models/lineChart.model';
import CHART from '../constants/chart';
import type { Datum } from '../types/Data';
import type { Point } from '../types/LineChart';

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
      range: { start, end },
    } = this.model.options.axisX;
    const { x: xTick } = this.model.options.ticks;

    const xTickCount = (end - start) / xTick;
    const bandWidthX = Math.floor((w - CHART.PADDING.VERTICAL) / xTickCount);

    const timePoint = (time - start) / xTick;
    const xPoint =
      Math.floor(timePoint * bandWidthX + CHART.PADDING.VERTICAL) - 1;

    return xPoint;
  };

  formatY = (value: number) => {
    const { h } = this.model.options.rect;
    const {
      range: { end },
    } = this.model.options.axisY;
    const { y: yTick } = this.model.options.ticks;

    const tickCount = end / yTick;
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

  formatPointByValue = ({ value }: Datum) => {
    const { h } = this.model.options.rect;
    const {
      range: { end },
    } = this.model.options.axisY;
    const { y: yTick } = this.model.options.ticks;

    const tickCount = end / yTick;
    const bandWidth = Math.floor((h - CHART.PADDING.VERTICAL) / tickCount);
    const yPoint = Math.floor(h - (value / end) * bandWidth * tickCount);

    return yPoint;
  };

  updateModel = () => {
    requestAnimationFrame(() => {
      this.view.render(this.model);
    });
  };
}

export default LineChartController;
