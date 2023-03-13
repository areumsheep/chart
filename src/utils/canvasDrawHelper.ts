import CHART from '../constants/chart';
import LineChartModel from '../models/lineChart.model';
import type { Rect, ChartOptions } from '../types/LineChart';

import { formatDate } from './dateFormat';

const drawLine = (ctx: CanvasRenderingContext2D, { x, y, w, h }: Rect) => {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(w, h);
  ctx.stroke();
  ctx.restore();
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

  while (current <= end) {
    const xPoint = ((current - start) / xTick) * (w / tickCount);
    const text = formatDate(format, new Date(current));
    current += xTick;

    if (xPoint < CHART.PADDING.VERTICAL) continue;
    drawLine(ctx, { x: xPoint, y: h, w: xPoint, h: h + 5 });
    ctx.font = '12px arial';
    ctx.fillText(text, xPoint, h + 15);
  }
  ctx.restore();
};

const draw = (ctx: CanvasRenderingContext2D, model: LineChartModel) => {
  const { x, y, w, h } = model.options.rect;

  ctx.clearRect(0, 0, w + CHART.PADDING.HORIZONTAL, h + CHART.PADDING.VERTICAL);

  drawLine(ctx, { x, y, w: x, h });
  drawLine(ctx, { x, y: h, w, h });

  drawTickX(ctx, model.options);
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
