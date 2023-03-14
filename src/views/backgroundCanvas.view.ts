import LineChartModel from '../models/lineChart.model';
import CanvasDrawHelper from '../utils/canvasDrawHelper';

import createCanvasElement from '../utils/createCanvasElement';

class BackgroundCanvas {
  backgroundCanvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this.backgroundCanvas = createCanvasElement(canvas.width, canvas.height);
    this.ctx = this.backgroundCanvas.getContext('2d')!;
  }

  draw(model: LineChartModel) {
    CanvasDrawHelper.draw(this.ctx, model);
    return this.backgroundCanvas;
  }
}

export default BackgroundCanvas;
