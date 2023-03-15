import {
  drawHorizontalLine,
  drawVerticalLine,
  LineStyle,
  setLineStyle,
} from './../renderers/drawLine';
import CHART_SETTINGS from '../constants/chartSettings';
import COLOR from '../constants/color';
import LineChartModel from '../models/lineChart.model';
import type { ChartOptions, Point } from '../types/Chart';

import { formatDate } from './formatDate';
import { formatX, formatY } from './domain/formatDataToPoint';

/** x축 라벨 출력 */
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
  const xPointFormatter = formatX(w, start, end, tick);

  while (current <= end) {
    const xPoint = xPointFormatter(current);

    const text = formatDate(format, new Date(current));
    current += tick;

    if (xPoint < CHART_SETTINGS.PADDING.VERTICAL) continue;
    drawVerticalLine(ctx, xPoint, h, h + 5);
    ctx.font = '12px arial';
    ctx.fillText(text, xPoint, h + 15);
  }
  ctx.restore();
};

/** y축 라벨 출력 */
const drawTickY = (ctx: CanvasRenderingContext2D, options: ChartOptions) => {
  const { w, h } = options.rect;
  const {
    tick,
    range: { start, end },
  } = options.axisY;

  ctx.save();
  ctx.beginPath();
  ctx.textAlign = 'right';

  const yPointFormatter = formatY(h, end, tick);

  ctx.strokeStyle = COLOR.lightgray;
  setLineStyle(ctx, LineStyle.Dotted);

  for (let i = start; i <= end; i += tick) {
    const yPoint = yPointFormatter(i);
    ctx.fillText(`${i}`, CHART_SETTINGS.PADDING.VERTICAL, yPoint);

    if (i !== 0) {
      drawHorizontalLine(ctx, yPoint, CHART_SETTINGS.PADDING.HORIZONTAL, w);
    }
  }
  ctx.stroke();
  ctx.restore();
};

const drawGrid = (ctx: CanvasRenderingContext2D, model: LineChartModel) => {
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
};

const drawChart = (ctx: CanvasRenderingContext2D, model: LineChartModel) => {
  const { w, h } = model.options.rect;
  const { points } = model;

  ctx.save();
  const chart = new Path2D();
  chart.rect(CHART_SETTINGS.PADDING.VERTICAL + 2, 0, w - 20, h - 1);
  ctx.clip(chart, 'evenodd');

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

const drawClickedChart = (
  ctx: CanvasRenderingContext2D,
  model: LineChartModel
) => {
  const { w, h } = model.options.rect;
  const { clickedPoints } = model;

  const chart = new Path2D();
  chart.rect(CHART_SETTINGS.PADDING.VERTICAL + 2, 0, w - 20, h - 1);
  ctx.clip(chart, 'evenodd');
  ctx.beginPath();

  clickedPoints.map(({ x, y }, index) => {
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
};

export default {
  drawGrid,
  drawChart,
  drawClickedChart,
};
