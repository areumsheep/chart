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
    // X 축 눈금 간격
    const xTickInterval = 60;

    // X 축 시작 시간 (현재 시간에서 가장 가까운 1분 단위로 내림)
    const startX =
      Math.floor(Date.now() / (xTickInterval * 1000)) * (xTickInterval * 1000);

    // X 축 눈금 그리기
    this.ctx.beginPath();
    for (let i = 0; i <= 5; i++) {
      const x =
        i * xTickInterval - (((Date.now() - startX) / 1000) % xTickInterval);

      const time = new Date(startX + x * 1000);
      const text = `${time.getHours()}:${time.getMinutes()}`;

      this.ctx.textAlign = 'center';
      this.ctx.fillText(text, x, this.canvasHeight + 20);
      this.ctx.moveTo(x, this.canvasHeight);
      this.ctx.lineTo(x, this.canvasHeight + 10);
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
