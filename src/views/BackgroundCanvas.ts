import LineChartModel from '../models/LineChartModel';
import CanvasDrawHelper from '../utils/canvasDrawHelper';

class BackgroundCanvas {
  backgroundCanvas: HTMLCanvasElement;
  backgroundContext: CanvasRenderingContext2D;
  dpr: number;

  constructor(canvas: HTMLCanvasElement, dpr: number) {
    this.backgroundCanvas = document.createElement('canvas');
    this.backgroundCanvas.width = canvas.width;
    this.backgroundCanvas.height = canvas.height;

    this.backgroundContext = this.backgroundCanvas.getContext('2d')!;

    this.dpr = dpr;
    this.backgroundContext.scale(this.dpr, this.dpr);
  }

  draw(model: LineChartModel) {
    CanvasDrawHelper.draw(this.backgroundContext, model);
    return this.backgroundCanvas;
  }
}

export default BackgroundCanvas;
