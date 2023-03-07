import type { Data, Datum } from './types/Data';
import { padLeft } from './utils/string';

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
    // X 축 눈금 간격
    const xTickInterval = 60;

    // X 축 최대 출력 수
    const xTick = 5;

    const date = new Date();
    date.setMinutes(date.getMinutes() - (xTick - 1));
    date.setSeconds(0);
    date.setMilliseconds(0);

    const fiveMinutesAgo = date.getTime();

    // X 축 눈금 그리기
    this.ctx.beginPath();
    for (let i = 0; i <= xTick; i++) {
      const x =
        i * xTickInterval -
        (((Date.now() - fiveMinutesAgo) / 1000) % xTickInterval);

      const time = new Date(fiveMinutesAgo + x * 1000);
      const hour = padLeft(`${time.getHours()}`, '0', 2);
      const minute = padLeft(`${time.getMinutes()}`, '0', 2);

      const text = `${hour}:${minute}`;

      this.ctx.textAlign = 'center';
      this.ctx.fillText(text, x * 1.5, this.canvasHeight + 20);
      this.ctx.moveTo(x * 1.5, this.canvasHeight);
      this.ctx.lineTo(x * 1.5, this.canvasHeight + 10);
    }
    this.ctx.stroke();
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
