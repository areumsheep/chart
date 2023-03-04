const XAXIS_PADDING = 10;
const YAXIS_PADDING = 25;
const DURATION = 1000 * 30; //30s
const MAX_VALUE = 100;
const Y_TICK_COUNT = 5;
const TOP_PADDING = 15;
const EX_TEXT = '00:00';

class LineChart {
  constructor(id) {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext('2d');

    this.canvasWidth = this.canvas.clientWidth;
    this.canvasHeight = this.canvas.clientHeight;
    this.chartWidth = this.canvasWidth - YAXIS_PADDING;
    this.chartHeight = this.canvasHeight - XAXIS_PADDING - TOP_PADDING - 15;

    this.xFormatWidth = this.ctx.measureText(EX_TEXT).width;
    this.data = [];
    this.drawChart();
  }

  // 시간을 실시간으로 세팅하는 함수
  setTime = () => {
    this.endTime = Date.now();
    this.startTime = this.endTime - DURATION;
    this.setXInterval();
  };

  setXInterval = () => {
    let xPoint = 0;
    let timeInterval = 1000;
    while (true) {
      xPoint = (timeInterval / DURATION) * this.chartWidth;
      if (xPoint > this.xFormatWidth) {
        break;
      }
      timeInterval *= 2;
    }

    this.xTimeInterval = timeInterval;
  };

  // 차트를 그리는 함수
  drawChart = () => {
    const {
      ctx,
      canvasWidth,
      canvasHeight,
      chartWidth,
      chartHeight,
      startTime,
      endTime,
      xTimeInterval,
    } = this;

    this.setTime();
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.beginPath();
    ctx.moveTo(YAXIS_PADDING, TOP_PADDING);

    ctx.lineTo(YAXIS_PADDING, chartHeight + TOP_PADDING);

    const yInterval = MAX_VALUE / (Y_TICK_COUNT - 1);
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    for (let i = 0; i < Y_TICK_COUNT; i++) {
      const value = i * yInterval;
      const yPoint =
        TOP_PADDING + chartHeight - (value / MAX_VALUE) * chartHeight;
      ctx.fillText(value, YAXIS_PADDING - 3, yPoint);
    }

    ctx.lineTo(chartWidth, chartHeight + TOP_PADDING);
    ctx.stroke();

    ctx.save();
    ctx.beginPath();
    ctx.rect(YAXIS_PADDING, 0, chartWidth, canvasHeight);
    ctx.clip();

    let currentTime = startTime - (startTime % xTimeInterval);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    while (currentTime < endTime + xTimeInterval) {
      const xPoint = ((currentTime - startTime) / DURATION) * chartWidth;
      const date = new Date(currentTime);
      const text = `${date.getMinutes()}:${date.getSeconds()}`;

      ctx.fillText(text, xPoint, chartHeight + TOP_PADDING + 10);
      currentTime += xTimeInterval;
    }

    ctx.beginPath();
    this.data.forEach((datum, index) => {
      const [time, value] = datum;
      const xPoint = ((time - startTime) / DURATION) * chartWidth;
      const yPoint =
        TOP_PADDING + chartHeight - (value / MAX_VALUE) * this.chartHeight;

      if (!index) {
        ctx.moveTo(xPoint, yPoint);
      } else {
        ctx.lineTo(xPoint, yPoint);
      }
    });

    ctx.stroke();
    ctx.restore();
    window.requestAnimationFrame(this.drawChart);
  };

  // 데이터를 갱신하는 함수
  updateData = (data) => {
    this.data.push(data);
  };
}

document.addEventListener('DOMContentLoaded', () => {
  const lineChart = new LineChart('lineChart');

  window.setInterval(() => {
    lineChart.updateData([Date.now(), Math.random() * 100]);
  }, 1000);
});
