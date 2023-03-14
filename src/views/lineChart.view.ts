import LineChartModel from '../models/lineChart.model';
import LineChartController from '../controllers/lineChart.controller';
import BackgroundCanvas from './backgroundCanvas.view';

import CanvasDrawHelper from '../utils/canvasDrawHelper';

class LineChartView {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  canvasWidth: number;
  canvasHeight: number;

  backgroundCanvas: BackgroundCanvas;
  controller?: LineChartController;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;

    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;

    this.backgroundCanvas = new BackgroundCanvas(canvas);
  }

  setController = (controller: LineChartController) => {
    this.controller = controller;
  };

  bindEvent = () => {
    this.canvas.addEventListener(
      'wheel',
      (event) => {
        console.log(event);
      },
      { passive: true }
    );
  };

  render(model: LineChartModel) {
    const backgroundCanvas = this.backgroundCanvas.draw(model);
    CanvasDrawHelper.copyDraw(this.ctx, backgroundCanvas, model);
  }
}

export default LineChartView;
