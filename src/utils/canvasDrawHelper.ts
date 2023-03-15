import {
  drawHorizontalLine,
  drawVerticalLine,
  LineStyle,
  setLineStyle,
} from './../renderers/drawLine';
import CHART_SETTINGS from '../constants/chartSettings';
import COLOR from '../constants/color';
import LineChartModel from '../models/lineChart.model';
import type { Rect, ChartOptions, Point } from '../types/Chart';

import { formatDate } from './formatDate';

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
  const bandWidth = Math.floor(
    (w - CHART_SETTINGS.PADDING.VERTICAL) / tickCount
  );

  while (current <= end) {
    const timePoint = (current - start) / tick;

    const xPoint =
      Math.floor(timePoint * bandWidth + CHART_SETTINGS.PADDING.VERTICAL) - 1;

    const text = formatDate(format, new Date(current));
    current += tick;

    if (xPoint < CHART_SETTINGS.PADDING.VERTICAL) continue;
    drawVerticalLine(ctx, xPoint, h, h + 5);
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
  const bandWidth = Math.floor(
    (h - CHART_SETTINGS.PADDING.VERTICAL) / tickCount
  );

  ctx.strokeStyle = COLOR.lightgray;
  setLineStyle(ctx, LineStyle.Dotted);

  for (let i = start; i <= end; i += tick) {
    const yPoint = Math.floor(h - (i / end) * bandWidth * tickCount);
    ctx.fillText(`${i}`, CHART_SETTINGS.PADDING.VERTICAL, yPoint);

    if (i !== 0) {
      drawHorizontalLine(ctx, yPoint, CHART_SETTINGS.PADDING.HORIZONTAL, w);
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

  ctx.clearRect(
    0,
    0,
    w + CHART_SETTINGS.PADDING.HORIZONTAL,
    h + CHART_SETTINGS.PADDING.VERTICAL
  );

  drawTickX(ctx, model.options);
  drawTickY(ctx, model.options);

  drawVerticalLine(ctx, x, y, h);
  drawHorizontalLine(ctx, h, x, w);

  ctx.save();
  const chart = new Path2D();
  chart.rect(CHART_SETTINGS.PADDING.VERTICAL + 2, 0, w - 20, h - 1);
  ctx.clip(chart, 'evenodd');

  drawChart(ctx, model.points);
  drawClickedChart(ctx, model.clickedPoints);
  ctx.restore();
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
    (w + CHART_SETTINGS.PADDING.HORIZONTAL) * dpr,
    (h + CHART_SETTINGS.PADDING.VERTICAL) * dpr
  );
  ctx.drawImage(target, 0, 0);
};

export default {
  draw,
  copyDraw,
};
