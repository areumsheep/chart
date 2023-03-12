import BackgroundCanvas from './backgroundCanvas.view';
import LineChartController from '../controllers/lineChart.controller';
import { Data } from '../types/Data';
import LineChartModel from '../models/lineChart.model';
import CanvasDrawHelper from '../utils/canvasDrawHelper';

class LineChartView {
  canvasContext: CanvasRenderingContext2D;
  canvasWidth: number;
  canvasHeight: number;

  backgroundCanvas: BackgroundCanvas;
  controller?: LineChartController;

  constructor(canvas: HTMLCanvasElement) {
    const dpr = window.devicePixelRatio || 1;
    const { width, height } = canvas;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;

    this.canvasContext = canvas.getContext('2d')!;
    this.backgroundCanvas = new BackgroundCanvas(canvas, dpr);
  }

  setController = (controller: LineChartController) => {
    this.controller = controller;
  };

  render(model: LineChartModel) {
    const backgroundCanvas = this.backgroundCanvas.draw(model);
    CanvasDrawHelper.copyDraw(this.canvasContext, backgroundCanvas, model);
  }
}

export default LineChartView;
