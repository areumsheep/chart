import type { Data, Datum } from './types/Data';
import { padLeft } from './utils/string';

const DEFAULT_AXIS_PADDING = 20;
const DURATION = 1000 * 30;
const MAX_Y = 100;

class LineChart {
  $canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  chartWidth: number;
  chartHeight: number;
  startTime!: number;
  endTime!: number;
  xTimeInterval = 5000;

  constructor($canvas: HTMLCanvasElement) {
    this.$canvas = $canvas;
    this.ctx = $canvas.getContext('2d')!;
    this.chartWidth = $canvas.width - DEFAULT_AXIS_PADDING;
    this.chartHeight = $canvas.height - DEFAULT_AXIS_PADDING;

    this.#draw();
  }

  #setTime = () => {
    this.endTime = Date.now();
    this.startTime = this.endTime - DURATION;
  };

  #drawAxisX() {
    this.ctx.beginPath();
    this.ctx.moveTo(DEFAULT_AXIS_PADDING, this.chartHeight);
    this.ctx.lineTo(this.chartWidth, this.chartHeight);
    this.ctx.stroke();
  }

  #drawAxisY() {
    this.ctx.beginPath();
    this.ctx.moveTo(DEFAULT_AXIS_PADDING, DEFAULT_AXIS_PADDING);
    this.ctx.lineTo(DEFAULT_AXIS_PADDING, this.chartHeight);
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
      this.ctx.fillText(text, x * 1.5, this.chartHeight + 20);
      this.ctx.moveTo(x * 1.5, this.chartHeight);
      this.ctx.lineTo(x * 1.5, this.chartHeight + 10);
    }
    this.ctx.stroke();
  }

  #drawLabelY() {
    const yTickInterval = 10;

    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.textAlign = 'right';
    for (let i = 0; i <= yTickInterval; i++) {
      const value = i * yTickInterval;
      const yPoint =
        this.chartHeight - (value / MAX_Y) * this.chartHeight * 0.9;
      this.ctx.fillText(`${value}`, DEFAULT_AXIS_PADDING - 4, yPoint + 3);
      if (i !== 0) {
        this.ctx.setLineDash([1, 2]);
        this.ctx.strokeStyle = '#E3E3E3';
        this.ctx.moveTo(DEFAULT_AXIS_PADDING, yPoint);
        this.ctx.lineTo(this.chartWidth, yPoint);
      }
    }
    this.ctx.stroke();
    this.ctx.restore();
  }

  #draw = () => {
    this.#setTime();
    this.ctx.clearRect(
      0,
      0,
      this.chartWidth + DEFAULT_AXIS_PADDING,
      this.chartHeight + DEFAULT_AXIS_PADDING
    );

    this.#drawLabelY();

    this.#drawAxisX();
    this.#drawAxisY();

    this.#drawLabelX();

    window.setInterval(() => {
      window.requestAnimationFrame(this.#draw);
    }, 5000);
  };
}

export default LineChart;
