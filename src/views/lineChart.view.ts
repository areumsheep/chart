import LineChartModel from '../models/lineChart.model';
import LineChartController from '../controllers/lineChart.controller';

import CanvasDrawHelper from '../utils/canvasDrawHelper';
import createCanvasElement from '../utils/domain/createCanvasElement';

import CHART_SETTINGS from '../constants/chartSettings';
import { RENDER_TYPE, type RenderTypeKey } from '../constants/event';

class LineChartView {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  canvasWidth: number;
  canvasHeight: number;
  controller?: LineChartController;

  gridCanvas: HTMLCanvasElement;
  gridContext: CanvasRenderingContext2D;

  firstChartCanvas: HTMLCanvasElement;
  firstChartContext: CanvasRenderingContext2D;

  secondChartCanvas: HTMLCanvasElement;
  secondChartContext: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;

    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;

    this.gridCanvas = createCanvasElement(this.canvasWidth, this.canvasHeight);
    this.gridContext = this.gridCanvas.getContext('2d')!;

    this.firstChartCanvas = createCanvasElement(
      this.canvasWidth,
      this.canvasHeight
    );
    this.firstChartContext = this.firstChartCanvas.getContext('2d')!;

    this.secondChartCanvas = createCanvasElement(
      this.canvasWidth,
      this.canvasHeight
    );
    this.secondChartContext = this.secondChartCanvas.getContext('2d')!;
  }

  setController = (controller: LineChartController) => {
    this.controller = controller;
  };

  preRender(model: LineChartModel) {
    CanvasDrawHelper.drawGrid(this.gridContext, model);
    CanvasDrawHelper.drawChart(this.firstChartContext, model);
    CanvasDrawHelper.drawClickedChart(this.secondChartContext, model);

    this.ctx.drawImage(this.gridCanvas, 0, 0);
    this.ctx.drawImage(this.firstChartCanvas, 0, 0);
    this.ctx.drawImage(this.secondChartCanvas, 0, 0);
  }

  render(type: RenderTypeKey, model: LineChartModel) {
    const { w, h } = model.options.rect;
    const { HORIZONTAL, VERTICAL } = CHART_SETTINGS.PADDING;

    this.ctx.clearRect(0, 0, w + HORIZONTAL, h + VERTICAL);

    if (type === RENDER_TYPE.CLICKED_CHART) {
      this.secondChartContext.clearRect(0, 0, w, h);
      CanvasDrawHelper.drawClickedChart(this.secondChartContext, model);
    } else {
      this.gridContext.clearRect(0, 0, w + HORIZONTAL, h + VERTICAL);
      this.firstChartContext.clearRect(0, 0, w + HORIZONTAL, h + VERTICAL);
      CanvasDrawHelper.drawGrid(this.gridContext, model);
      CanvasDrawHelper.drawChart(this.firstChartContext, model);
    }

    this.ctx.drawImage(this.gridCanvas, 0, 0);
    this.ctx.drawImage(this.firstChartCanvas, 0, 0);
    this.ctx.drawImage(this.secondChartCanvas, 0, 0);
  }
}

export default LineChartView;
