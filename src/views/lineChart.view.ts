import LineChartModel from '../models/lineChart.model';
import LineChartController from '../controllers/lineChart.controller';

import CanvasDrawHelper from '../utils/canvasDrawHelper';
import createCanvasElement from '../utils/domain/createCanvasElement';
import getPixelRatio from '../utils/domain/getPixelRatio';

import CHART_SETTINGS from '../constants/chartSettings';
import { RENDER_TYPE, type RenderTypeKey } from '../constants/event';
import AxisHelper from '../renderers/drawAxis';

class LineChartView {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  canvasWidth: number;
  canvasHeight: number;
  controller?: LineChartController;

  axisHelper?: AxisHelper;

  xAxisCanvas: HTMLCanvasElement;
  xAxisContext: CanvasRenderingContext2D;

  yAxisCanvas: HTMLCanvasElement;
  yAxisContext: CanvasRenderingContext2D;

  chartCanvas: HTMLCanvasElement;
  chartContext: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;

    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;

    this.xAxisCanvas = createCanvasElement(this.canvasWidth, this.canvasHeight);
    this.xAxisContext = this.xAxisCanvas.getContext('2d')!;

    this.yAxisCanvas = createCanvasElement(this.canvasWidth, this.canvasHeight);
    this.yAxisContext = this.yAxisCanvas.getContext('2d')!;

    this.chartCanvas = createCanvasElement(this.canvasWidth, this.canvasHeight);
    this.chartContext = this.chartCanvas.getContext('2d')!;
  }

  setController = (controller: LineChartController) => {
    this.controller = controller;
  };

  preRender(model: LineChartModel) {
    const rect = model.options.rect;
    const {
      xAxis: { type: xType },
      yAxis: { type: yType },
    } = model.options;

    this.axisHelper = new AxisHelper(rect);

    this.axisHelper.drawAxis(xType, this.xAxisContext, model.options.xAxis);
    this.axisHelper.drawAxis(yType, this.yAxisContext, model.options.yAxis);

    this.ctx.drawImage(this.xAxisCanvas, 0, 0);
    this.ctx.drawImage(this.yAxisCanvas, 0, 0);
  }

  render(type: RenderTypeKey, model: LineChartModel, ratio?: number) {
    const dpr = ratio || getPixelRatio();
    const { w, h } = model.options.rect;
    const {
      xAxis: { type: xType },
      yAxis: { type: yType },
    } = model.options;
    const { HORIZONTAL, VERTICAL } = CHART_SETTINGS.PADDING;

    this.ctx.clearRect(0, 0, w * dpr + HORIZONTAL, h * dpr + VERTICAL * 2);

    if (type === RENDER_TYPE.CLICKED_CHART) {
      this.chartContext.clearRect(0, 0, w + HORIZONTAL, h + VERTICAL);
      CanvasDrawHelper.draw(this.chartContext, model);
    } else {
      this.xAxisContext.clearRect(0, 0, w + HORIZONTAL, h + VERTICAL);
      this.yAxisContext.clearRect(0, 0, w + HORIZONTAL, h + VERTICAL);
      this.chartContext.clearRect(0, 0, w + HORIZONTAL, h + VERTICAL);

      this.axisHelper?.drawAxis(xType, this.xAxisContext, model.options.xAxis);
      this.axisHelper?.drawAxis(yType, this.yAxisContext, model.options.yAxis);
      CanvasDrawHelper.draw(this.chartContext, model);
    }

    this.ctx.drawImage(this.xAxisCanvas, 0, 0);
    this.ctx.drawImage(this.yAxisCanvas, 0, 0);
    this.ctx.drawImage(this.chartCanvas, 0, 0);
  }
}

export default LineChartView;
