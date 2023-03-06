import type { Data, Datum } from './types/Data';

const DEFAULT_AXIS_PADDING = 10;

class LineChart {
  $canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  canvasWidth: number;
  canvasHeight: number;
  // yAxisPadding: number;

  constructor($canvas: HTMLCanvasElement) {
    this.$canvas = $canvas;
    this.ctx = $canvas.getContext('2d')!;
    this.canvasWidth = $canvas.width - DEFAULT_AXIS_PADDING;
    this.canvasHeight = $canvas.height - DEFAULT_AXIS_PADDING;

    this.#drawAxisX();
    this.#drawAxisY();
  }

  #drawAxisX() {
    this.ctx.beginPath();
    this.ctx.moveTo(DEFAULT_AXIS_PADDING, this.canvasHeight);
    this.ctx.lineTo(this.canvasWidth, this.canvasHeight);
    this.ctx.stroke();
  }

  #drawAxisY() {
    this.ctx.beginPath();
    this.ctx.moveTo(DEFAULT_AXIS_PADDING, DEFAULT_AXIS_PADDING);
    this.ctx.lineTo(DEFAULT_AXIS_PADDING, this.canvasHeight);
    this.ctx.stroke();
  }
}

export default LineChart;
