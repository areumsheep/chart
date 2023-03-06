import type { Data, Datum } from './types/Data';

const DEFAULT_AXIS_PADDING = 20;
const DURATION = 1000 * 30;

class LineChart {
  $canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  canvasWidth: number;
  canvasHeight: number;
  startTime!: number;
  endTime!: number;
  xTimeInterval = 5000;

  constructor($canvas: HTMLCanvasElement) {
    this.$canvas = $canvas;
    this.ctx = $canvas.getContext('2d')!;
    this.canvasWidth = $canvas.width - DEFAULT_AXIS_PADDING;
    this.canvasHeight = $canvas.height - DEFAULT_AXIS_PADDING;

    this.#draw();
  }

  #setTime = () => {
    this.endTime = Date.now();
    this.startTime = this.endTime - DURATION;
  };

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

  #drawLabelX() {
    let currentTime = this.startTime - (this.startTime % this.xTimeInterval);

    while (currentTime < this.endTime + this.xTimeInterval) {
      const xPoint =
        ((currentTime - this.startTime) / DURATION) * this.canvasWidth;

      const date = new Date(currentTime);
      const text = `${date.getMinutes()}:${date.getSeconds()}`;
      this.ctx.fillText(text, xPoint, this.canvasHeight + DEFAULT_AXIS_PADDING);
      currentTime += this.xTimeInterval;
    }
  }

  #draw = () => {
    this.#setTime();
    this.ctx.clearRect(
      0,
      0,
      this.canvasWidth + DEFAULT_AXIS_PADDING,
      this.canvasHeight + DEFAULT_AXIS_PADDING
    );

    this.#drawAxisX();
    this.#drawAxisY();

    this.#drawLabelX();

    window.setInterval(() => {
      window.requestAnimationFrame(this.#draw);
    }, 5000);
  };
}

export default LineChart;
