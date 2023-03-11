import LineChartModel from '../models/LineChartModel';
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

export default {
  drawLine,
  draw,
};
