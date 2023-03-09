import type { Data, Datum } from './types/Data';
import type { Point } from './types/LineChart';

import COLOR from './constants/color';

import { padLeft } from './utils/string';
import CrossHair from './CrossHair';

const DEFAULT_AXIS_PADDING = 40;
const DURATION = 1000 * 60;
const MAX_Y = 100;

const xTick = 5;

class LineChart {
  $canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  chartWidth: number;
  chartHeight: number;
  startTime!: number;
  endTime!: number;
  xTimeInterval = DURATION;
  data: Data = [];
  dataset: Point[] = [];
  crossHair: CrossHair;

  constructor($canvas: HTMLCanvasElement) {
    const dpr = window.devicePixelRatio;

    $canvas.width = $canvas.width * dpr;
    $canvas.height = $canvas.height * dpr;

    this.$canvas = $canvas;
    this.ctx = $canvas.getContext('2d')!;
    this.chartWidth = $canvas.width - DEFAULT_AXIS_PADDING;
    this.chartHeight = $canvas.height - DEFAULT_AXIS_PADDING;

    this.crossHair = new CrossHair(
      $canvas,
      $canvas.width,
      $canvas.height,
      'tooltip'
    );

    this.#draw();
  }

  #setTime = () => {
    this.endTime = Date.now();
    this.startTime = this.endTime - DURATION * xTick;
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
    const { endTime, startTime, xTimeInterval, chartWidth, chartHeight } = this;

    this.ctx.beginPath();

    let currentTime = startTime - (startTime % xTimeInterval);
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'top';

    while (currentTime < endTime + DURATION * 5) {
      const xPoint = ((currentTime - startTime) / DURATION) * chartWidth * 0.2;

      const date = new Date(currentTime);
      const hour = padLeft(`${date.getHours()}`, '0', 2);
      const minute = padLeft(`${date.getMinutes()}`, '0', 2);
      const text = `${hour}:${minute}`;

      this.ctx.font = '15px arial';
      this.ctx.fillText(text, xPoint, chartHeight + 9);
      this.ctx.moveTo(xPoint, this.chartHeight);
      this.ctx.lineTo(xPoint, this.chartHeight + 7);
      currentTime += xTimeInterval;
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
      this.ctx.fillText(`${value}`, DEFAULT_AXIS_PADDING - 5, yPoint - 10);
      if (i !== 0) {
        this.ctx.setLineDash([1, 2]);
        this.ctx.strokeStyle = COLOR.lightgray;
        this.ctx.moveTo(DEFAULT_AXIS_PADDING, yPoint);
        this.ctx.lineTo(this.chartWidth, yPoint);
      }
    }
    this.ctx.stroke();
    this.ctx.restore();
  }

  #drawLineChart = () => {
    const { startTime, chartWidth, chartHeight } = this;

    this.ctx.save();
    this.ctx.beginPath();

    const dataset: Point[] = [];
    this.data.forEach((datum, index) => {
      const { time, value } = datum;

      const xPoint = ((time - startTime) / DURATION) * chartWidth * 0.2;
      const yPoint = chartHeight - (value / MAX_Y) * this.chartHeight * 0.9;

      dataset.push({ x: xPoint, y: yPoint });

      if (!index) {
        this.ctx.moveTo(xPoint, yPoint);
      } else {
        this.ctx.strokeStyle = COLOR.blue;
        this.ctx.lineWidth = 2;
        this.ctx.lineTo(xPoint, yPoint);
      }
    });
    this.crossHair.dataset = dataset;

    this.ctx.stroke();
    this.ctx.restore();
  };

  #drawClip = () => {
    const realTimeChart = new Path2D();
    realTimeChart.rect(
      DEFAULT_AXIS_PADDING,
      0,
      this.chartWidth,
      this.$canvas.height
    );
    this.ctx.clip(realTimeChart, 'evenodd');
  };

  #draw = () => {
    this.#setTime();
    this.ctx.clearRect(
      0,
      0,
      this.chartWidth + DEFAULT_AXIS_PADDING,
      this.chartHeight + DEFAULT_AXIS_PADDING
    );

    this.#drawLabelX();
    this.#drawLabelY();

    this.#drawClip();

    this.#drawAxisX();
    this.#drawAxisY();

    this.#drawLineChart();

    window.setInterval(() => {
      window.requestAnimationFrame(this.#draw);
    }, 5000);
  };

  getInitialData = (datum: Datum) => {
    this.data.push(datum);
  };

  getUpdateData = (datum: Datum) => {
    this.data.push(datum);
  };
}

export default LineChart;
