import CHART_SETTINGS from '../constants/chartSettings';
import COLOR from '../constants/color';
import LineChartModel from '../models/lineChart.model';
import { Point, Rect } from '../types/Chart';

class LineChartHelper {
  #x: number;
  #y: number;
  #w: number;
  #h: number;

  constructor({ x, y, w, h }: Rect) {
    this.#x = x;
    this.#y = y;
    this.#w = w;
    this.#h = h;
  }

  #drawClip = (
    ctx: CanvasRenderingContext2D,
    type: CanvasFillRule = 'nonzero'
  ) => {
    const chart = new Path2D();
    chart.rect(this.#x, this.#y, this.#w - this.#x, this.#h);
    ctx.clip(chart, type);
  };

  #drawChart = (
    ctx: CanvasRenderingContext2D,
    points: Point[],
    lineColor: string
  ) => {
    ctx.save();

    ctx.beginPath();
    points.map(({ x, y }, index) => {
      if (index === 0) {
        ctx.moveTo(x, y);
      }
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 2;
      ctx.lineTo(x, y);
    });
    ctx.stroke();
    ctx.restore();
  };

  draw = (ctx: CanvasRenderingContext2D, model: LineChartModel) => {
    this.#drawClip(ctx, 'evenodd');
    const { datas } = model;

    for (const { points, lineColor } of datas) {
      this.#drawChart(ctx, points, lineColor);
    }
  };
}

export default LineChartHelper;
