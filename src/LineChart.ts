import type { Data, Datum } from './types/Data';
import type { Point } from './types/LineChart';

import COLOR from './constants/color';
import CHART from './constants/CHART';

import { padLeft } from './utils/string';
import CrossHair from './CrossHair';

class LineChart {
  $canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  chartWidth: number;
  chartHeight: number;
  startTime!: number;
  endTime!: number;
  xTimeInterval = CHART.DURATION;
  data: Data = [];
  dataset: Point[] = [];
  crossHair: CrossHair;

  constructor($canvas: HTMLCanvasElement) {
    const dpr = window.devicePixelRatio;

    $canvas.width = $canvas.width * dpr;
    $canvas.height = $canvas.height * dpr;

    this.$canvas = $canvas;
    this.ctx = $canvas.getContext('2d')!;
    this.chartWidth = $canvas.width - CHART.PADDING;
    this.chartHeight = $canvas.height - CHART.PADDING;

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
    this.startTime = this.endTime - CHART.DURATION * CHART.X.TICK;
  };

  #drawAxisX() {
    this.ctx.beginPath();
    this.ctx.moveTo(CHART.PADDING, this.chartHeight);
    this.ctx.lineTo(this.chartWidth, this.chartHeight);
    this.ctx.stroke();
  }

  #drawAxisY() {
    this.ctx.beginPath();
    this.ctx.moveTo(CHART.PADDING, CHART.PADDING);
    this.ctx.lineTo(CHART.PADDING, this.chartHeight);
    this.ctx.stroke();
  }

  #drawLabelX() {
    const { startTime, xTimeInterval, chartWidth, chartHeight } = this;

    this.ctx.beginPath();

    let currentTime = startTime - (startTime % xTimeInterval);
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'top';

    while (startTime + CHART.DURATION * CHART.X.TICK > currentTime) {
      const xPoint =
        ((currentTime - startTime) / CHART.DURATION) * chartWidth * 0.2;

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
    for (let i = CHART.Y.MIN; i <= yTickInterval; i++) {
      const value = i * yTickInterval;

      const yPoint =
        this.chartHeight - (value / CHART.Y.MAX) * this.chartHeight * 0.9;
      this.ctx.fillText(`${value}`, CHART.PADDING - 5, yPoint - 10);

      if (i !== 0) {
        this.ctx.setLineDash([1, 2]);
        this.ctx.strokeStyle = COLOR.lightgray;
        this.ctx.moveTo(CHART.PADDING, yPoint);
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

      const xPoint = ((time - startTime) / CHART.DURATION) * chartWidth * 0.2;
      const yPoint =
        chartHeight - (value / CHART.Y.MAX) * this.chartHeight * 0.9;

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
    realTimeChart.rect(CHART.PADDING, 0, this.chartWidth, this.$canvas.height);
    this.ctx.clip(realTimeChart, 'evenodd');
  };

  #draw = () => {
    this.#setTime();
    this.ctx.clearRect(
      0,
      0,
      this.chartWidth + CHART.PADDING,
      this.chartHeight + CHART.PADDING
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
