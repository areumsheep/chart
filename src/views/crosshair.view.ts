import LineChartModel from '../models/lineChart.model';

import type { Point, Rect } from '../types/Chart';
import CHART_SETTINGS from '../constants/chartSettings';

import {
  LineStyle,
  setLineStyle,
  drawVerticalLine,
} from '../renderers/drawLine';
import { drawCircle } from '../renderers/drawMarker';

class CrossHair {
  canvas = document.createElement('canvas');
  ctx: CanvasRenderingContext2D;
  canvasWidth: number;
  canvasHeight: number;

  model: LineChartModel;
  nearestPoint?: Point;

  constructor(canvas: HTMLCanvasElement, model: LineChartModel) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d')!;
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;

    this.model = model;
  }

  findNearestPoint = (event: MouseEvent) => {
    const rect = this.canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;

    this.nearestPoint = this.model.datas[0].findNearestXPoint(mouseX);
  };

  render = () => {
    if (!this.nearestPoint) return;

    const rect: Rect = {
      ...this.nearestPoint,
      w: this.canvas.width,
      h: this.canvas.height,
    };
    this.#drawCrossHair(this.ctx, rect);
  };

  #drawCrossHair = (ctx: CanvasRenderingContext2D, { x, y, w, h }: Rect) => {
    ctx.clearRect(0, 0, w, h);

    setLineStyle(ctx, LineStyle.LargeDashed);
    drawVerticalLine(ctx, x, CHART_SETTINGS.PADDING.HORIZONTAL, h);
    drawCircle(ctx, x, y, 5);
  };
}

export default CrossHair;
