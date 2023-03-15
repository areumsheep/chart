import CHART from '../constants/chart';
import COLOR from '../constants/color';
import LineChartModel from '../models/lineChart.model';
import type {
  Rect,
  ChartOptions,
  PartialLineStyle,
  Point,
} from '../types/LineChart';

import { formatDate } from './formatDate';

const drawLine = (
  ctx: CanvasRenderingContext2D,
  { x, y, w, h }: Rect,
  lineStyle?: PartialLineStyle
) => {
  ctx.beginPath();
  ctx.setLineDash(lineStyle?.dashStyle || []);
  ctx.strokeStyle = lineStyle?.color || 'black';
  ctx.moveTo(x, y);
  ctx.lineTo(w, h);
  ctx.stroke();
};

const drawTickX = (ctx: CanvasRenderingContext2D, options: ChartOptions) => {
  const { w, h } = options.rect;
  const {
    tick,
    format,
    range: { start, end },
  } = options.axisX;

  ctx.save();
  ctx.textAlign = 'center';

  let current = start - (start % tick);
  const tickCount = (end - start) / tick;
  const bandWidth = Math.floor((w - CHART.PADDING.VERTICAL) / tickCount);

  while (current <= end) {
    const timePoint = (current - start) / tick;

    const xPoint =
      Math.floor(timePoint * bandWidth + CHART.PADDING.VERTICAL) - 1;

    const text = formatDate(format, new Date(current));
    current += tick;

    if (xPoint < CHART.PADDING.VERTICAL) continue;
    drawLine(ctx, { x: xPoint, y: h, w: xPoint, h: h + 5 });
    ctx.font = '12px arial';
    ctx.fillText(text, xPoint, h + 15);
  }
  ctx.restore();
};

const drawTickY = (ctx: CanvasRenderingContext2D, options: ChartOptions) => {
  const { w, h } = options.rect;
  const {
    tick,
    range: { start, end },
  } = options.axisY;

  ctx.save();
  ctx.beginPath();
  ctx.textAlign = 'right';

  const tickCount = end / tick;
  const bandWidth = Math.floor((h - CHART.PADDING.VERTICAL) / tickCount);

  for (let i = start; i <= end; i += tick) {
    const yPoint = Math.floor(h - (i / end) * bandWidth * tickCount);
    ctx.fillText(`${i}`, CHART.PADDING.VERTICAL, yPoint);

    if (i !== 0) {
      drawLine(
        ctx,
        { x: CHART.PADDING.HORIZONTAL, y: yPoint, w, h: yPoint },
        { dashStyle: [2, 2], color: 'lightgray' }
      );
    }
  }
  ctx.stroke();
  ctx.restore();
};

const drawChart = (ctx: CanvasRenderingContext2D, points: Point[]) => {
  ctx.save();
  ctx.beginPath();

  points.map(({ x, y }, index) => {
    if (index === 0) {
      ctx.moveTo(x, y);
    }
    ctx.strokeStyle = COLOR.blue;
    ctx.lineWidth = 2;
    ctx.lineTo(x, y);
  });
  ctx.stroke();
  ctx.restore();
};

const drawClickedChart = (ctx: CanvasRenderingContext2D, points: Point[]) => {
  ctx.save();
  ctx.beginPath();

  points.map(({ x, y }, index) => {
    if (index === 0) {
      ctx.moveTo(x, y);
    }
    ctx.strokeStyle = COLOR.orange;
    ctx.lineWidth = 2;
    ctx.lineTo(x, y);

    const circle = new Path2D();
    circle.arc(x, y, 4, 0, 2 * Math.PI);

    ctx.fillStyle = COLOR.darkorange;
    ctx.fill(circle);
  });
  ctx.stroke();
  ctx.restore();
};

const draw = (ctx: CanvasRenderingContext2D, model: LineChartModel) => {
  const { x, y, w, h } = model.options.rect;

  ctx.clearRect(0, 0, w + CHART.PADDING.HORIZONTAL, h + CHART.PADDING.VERTICAL);

  drawTickX(ctx, model.options);
  drawTickY(ctx, model.options);

  drawLine(ctx, { x, y, w: x, h });
  drawLine(ctx, { x, y: h, w, h });

  drawChart(ctx, model.points);
  drawClickedChart(ctx, model.clickedPoints);
};

const copyDraw = (
  ctx: CanvasRenderingContext2D,
  target: HTMLCanvasElement,
  model: LineChartModel
) => {
  const dpr = window.devicePixelRatio || 1;
  const { w, h } = model.options.rect;

  ctx.clearRect(
    0,
    0,
    (w + CHART.PADDING.HORIZONTAL) * dpr,
    (h + CHART.PADDING.VERTICAL) * dpr
  );
  ctx.drawImage(target, 0, 0);
};

const drawCrossHair = (ctx: CanvasRenderingContext2D, { x, y, w, h }: Rect) => {
  ctx.clearRect(0, 0, w, h);

  ctx.beginPath();
  ctx.save();
  ctx.setLineDash([1]);

  ctx.moveTo(x, CHART.PADDING.HORIZONTAL);
  ctx.lineTo(x, h);

  ctx.stroke();
  ctx.restore();

  const circle = new Path2D();
  circle.arc(x, y, 4, 0, 2 * Math.PI);

  ctx.fillStyle = COLOR.darkblue;
  ctx.fill(circle);
};

export default {
  draw,
  drawLine,
  drawCrossHair,

  copyDraw,
};
