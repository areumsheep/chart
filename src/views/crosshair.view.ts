import LineChartController from '../controllers/lineChart.controller';
import { Point, Rect } from '../types/LineChart';
import CanvasDrawHelper from '../utils/canvasDrawHelper';

class CrossHair {
  crossHair = document.createElement('canvas');
  ctx: CanvasRenderingContext2D;
  canvasWidth: number;
  canvasHeight: number;

  controller?: LineChartController;

  constructor(canvas: HTMLCanvasElement) {
    this.crossHair = canvas;
    this.ctx = this.crossHair.getContext('2d')!;
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;
  }

  setController = (controller: LineChartController) => {
    this.controller = controller;
  };

  getNearestPoint = (event: MouseEvent) => {
    const rect = this.crossHair.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;

    return this.controller?.findNearestPoint(mouseX);
  };

  render = (nearestPoint: Point) => {
    const rect: Rect = {
      ...nearestPoint,
      w: this.crossHair.width,
      h: this.crossHair.height,
    };
    console.log(nearestPoint);
    CanvasDrawHelper.drawCrossHair(this.ctx, rect);
  };
}

export default CrossHair;
