import LineChartModel from '../models/lineChart.model';
import type { Rect } from '../types/LineChart';

const drawLine = (ctx: CanvasRenderingContext2D, { x, y, w, h }: Rect) => {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(w, h);
  ctx.stroke();
  ctx.restore();
};

const draw = (ctx: CanvasRenderingContext2D, model: LineChartModel) => {
  const { x, y, w, h } = model.options.rect;
  drawLine(ctx, { x, y, w, h });
};

const copyDraw = (
  ctx: CanvasRenderingContext2D,
  target: HTMLCanvasElement,
  model: LineChartModel
) => {
  const { w, h } = model.options.rect;
  ctx.clearRect(0, 0, w, h);
  ctx.drawImage(target, 0, 0);
};

export default {
  drawLine,
  draw,
  copyDraw,
};
