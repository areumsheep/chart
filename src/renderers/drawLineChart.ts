import LineChartModel from '../models/lineChart.model';
import type { Marker, Point, Rect } from '../types/Chart';

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
    lineColor: string,
    markerStyle?: Marker
  ) => {
    ctx.save();

    if (points.length <= 0) return;

    // path 만들기
    const path = new Path2D();
    points.map(({ x, y }, index) => {
      if (index === 0) {
        path.moveTo(x, y);
      } else {
        path.lineTo(x, y);
      }
    });

    // line 그리기
    ctx.beginPath();
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 2;
    ctx.stroke(path);

    // marker 그리기
    if (markerStyle !== undefined) {
      points.map(({ x, y }) => {
        const circle = new Path2D();
        circle.arc(x, y, 4, 0, 2 * Math.PI);

        ctx.fillStyle = markerStyle.color;
        ctx.fill(circle);
      });
    }

    ctx.restore();
  };

  draw = (ctx: CanvasRenderingContext2D, model: LineChartModel) => {
    this.#drawClip(ctx, 'evenodd');
    const { datas } = model;

    for (const { points, lineColor, markerStyle } of datas) {
      this.#drawChart(ctx, points, lineColor, markerStyle);
    }
  };
}

export default LineChartHelper;
