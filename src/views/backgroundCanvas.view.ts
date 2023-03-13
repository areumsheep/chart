import LineChartModel from '../models/lineChart.model';
import CanvasDrawHelper from '../utils/canvasDrawHelper';

class BackgroundCanvas {
  backgroundCanvas: HTMLCanvasElement;
  backgroundContext: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    const dpr = window.devicePixelRatio || 1;
    this.backgroundCanvas = document.createElement('canvas');
    this.backgroundCanvas.width = canvas.width;
    this.backgroundCanvas.height = canvas.height;

    this.backgroundContext = this.backgroundCanvas.getContext('2d')!;

    this.backgroundContext.scale(dpr, dpr);
  }

  draw(model: LineChartModel) {
    CanvasDrawHelper.draw(this.backgroundContext, model);
    return this.backgroundCanvas;
  }
}

export default BackgroundCanvas;
