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
    format,
    range: { start, end },
  } = options.axisX;
  const { x: xTick } = options.ticks;

  ctx.save();
  ctx.textAlign = 'center';

  let current = start - (start % xTick);
  const tickCount = (end - start) / xTick;
  const bandWidth = Math.floor((w - CHART.PADDING.VERTICAL) / tickCount);

  while (current <= end) {
    const timePoint = (current - start) / xTick;

    const xPoint =
      Math.floor(timePoint * bandWidth + CHART.PADDING.VERTICAL) - 1;

    const text = formatDate(format, new Date(current));
    current += xTick;

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
    range: { start, end },
  } = options.axisY;
  const { y: yTick } = options.ticks;

  ctx.save();
  ctx.beginPath();
  ctx.textAlign = 'right';

  const tickCount = end / yTick;
  const bandWidth = Math.floor((h - CHART.PADDING.VERTICAL) / tickCount);

  for (let i = start; i <= end; i += yTick) {
    const yPoint = Math.floor(h - (i / end) * bandWidth * tickCount);
    ctx.fillText(`${i}`, CHART.PADDING.VERTICAL, yPoint);

    if (i !== 0) {
      drawLine(
        ctx,
        { x: CHART.PADDING.HORIZONTAL, y: yPoint, w, h: yPoint },
        { dashStyle: [3, 3], color: 'lightgray' }
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

const draw = (ctx: CanvasRenderingContext2D, model: LineChartModel) => {
  const { x, y, w, h } = model.options.rect;

  ctx.clearRect(0, 0, w + CHART.PADDING.HORIZONTAL, h + CHART.PADDING.VERTICAL);

  drawTickX(ctx, model.options);
  drawTickY(ctx, model.options);

  drawLine(ctx, { x, y, w: x, h });
  drawLine(ctx, { x, y: h, w, h });

  drawChart(ctx, model.points);
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

export default {
  drawLine,
  draw,
  copyDraw,
};
