import LineChartController from '../controllers/lineChart.controller';
import { Point, Rect } from '../types/LineChart';
import CanvasDrawHelper from '../utils/canvasDrawHelper';

class CrossHair {
  crossHair = document.createElement('canvas');
  ctx: CanvasRenderingContext2D;
  canvasWidth: number;
  canvasHeight: number;

  controller?: LineChartController;
  nearestPoint?: Point;

  constructor(canvas: HTMLCanvasElement) {
    this.crossHair = canvas;
    this.ctx = this.crossHair.getContext('2d')!;
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;
  }

  setController = (controller: LineChartController) => {
    this.controller = controller;
  };

  bindEvent = () => {
    this.crossHair.addEventListener('mousemove', (event) => {
      const rect = this.crossHair.getBoundingClientRect();
      const nearestPoint = this.controller?.findNearestPoint(event, rect.left);

      if (nearestPoint) {
        this.nearestPoint = nearestPoint;
        this.render();
      }
    });
  };

  render = () => {
    const rect: Rect = {
      ...this.nearestPoint!,
      w: this.canvasWidth,
      h: this.canvasHeight,
    };
    CanvasDrawHelper.drawCrossHair(this.ctx, rect);
  };
}

export default CrossHair;
