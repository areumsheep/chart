import type { Point } from './types/LineChart';

import COLOR from './constants/color';
import CHART from './constants/chart';

import { findNearestPoint } from './utils/point';

class CrossHair {
  crossHair = document.createElement('canvas');
  ctx: CanvasRenderingContext2D;
  chartWidth: number;
  chartHeight: number;

  dataset: Point[] = [];

  xPoint = 0;
  yPoint = 0;

  constructor(
    $target: HTMLCanvasElement,
    width: number,
    height: number,
    id?: string
  ) {
    this.crossHair.width = width;
    this.crossHair.height = height;
    this.crossHair.id = id || 'canvas';
    this.crossHair.style.position = 'absolute';

    this.ctx = this.crossHair.getContext('2d')!;
    this.chartWidth = width;
    this.chartHeight = height;

    $target.parentElement?.insertAdjacentElement('afterbegin', this.crossHair);

    this.crossHair.addEventListener('mousemove', (event) => {
      this.ctx.clearRect(0, 0, width, height);
      this.nearstPoint(event);
      this.addHoverCrossHair();
    });
  }

  nearstPoint = (e: MouseEvent) => {
    const rect = this.crossHair.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const nearestPoint = findNearestPoint(mouseX, mouseY, this.dataset);

    if (nearestPoint === undefined) return;

    const [x, y] = nearestPoint;
    this.xPoint = x;
    this.yPoint = y;
  };

  addHoverCrossHair = () => {
    this.ctx.beginPath();
    this.ctx.save();
    this.ctx.setLineDash([5]);

    this.ctx.moveTo(this.xPoint, CHART.DEFAULT_AXIS_PADDING);
    this.ctx.lineTo(this.xPoint, this.chartHeight);

    this.ctx.moveTo(CHART.DEFAULT_AXIS_PADDING, this.yPoint);
    this.ctx.lineTo(this.chartWidth, this.yPoint);

    this.ctx.stroke();
    this.ctx.restore();

    const circle = new Path2D();
    circle.arc(this.xPoint, this.yPoint, 4, 0, 2 * Math.PI);

    this.ctx.fillStyle = COLOR.darkgray;
    this.ctx.fill(circle);
  };
}

export default CrossHair;
