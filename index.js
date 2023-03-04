const XAXIS_PADDING = 10;
const YAXIS_PADDING = 25;

class LineChart {
  constructor(id) {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext('2d');

    this.canvasWidth = this.canvas.clientWidth;
    this.canvasHeight = this.canvas.clientHeight;
    this.chartWidth = this.canvasWidth - YAXIS_PADDING;
    this.chartHeight = this.canvasHeight - XAXIS_PADDING;

    this.drawChart();
  }

  // 시간을 실시간으로 세팅하는 함수
  setTime = () => {};

  // 차트를 그리는 함수
  drawChart = () => {
    const { ctx, chartWidth, chartHeight } = this;

    ctx.beginPath();
    ctx.moveTo(YAXIS_PADDING, 0);

    ctx.lineTo(YAXIS_PADDING, chartHeight);
    ctx.lineTo(chartWidth, chartHeight);
    const yInterval = MAX_VALUE / (YTICK_COUNT - 1);
    for (let i = 0; i < Y_TICK_COUNT; i++) {
      const value = i * yInterval;
    }

    ctx.stroke();
  };

  // 데이터를 갱신하는 함수
  updateData = () => {};
}

document.addEventListener('DOMContentLoaded', () => {
  new LineChart('lineChart');
});
