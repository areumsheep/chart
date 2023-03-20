import CHART_SETTINGS from '../constants/chartSettings';
import COLOR from '../constants/color';
import LineChartModel from '../models/lineChart.model';

const drawChart = (ctx: CanvasRenderingContext2D, model: LineChartModel) => {
  const { w, h } = model.options.rect;
  const data = model.datas[0].points;

  ctx.save();
  const chart = new Path2D();
  chart.rect(CHART_SETTINGS.PADDING.VERTICAL + 2, 0, w - 20, h - 1);
  ctx.clip(chart, 'evenodd');

  data.map(({ x, y }, index) => {
    if (index === 0) {
      ctx.moveTo(x, y);
    }
    ctx.strokeStyle = COLOR.blue;
    ctx.lineWidth = 2;
    ctx.lineTo(x, y);
  });
  ctx.stroke();

  ctx.restore();
};

const drawClickedChart = (
  ctx: CanvasRenderingContext2D,
  model: LineChartModel
) => {
  const { w, h } = model.options.rect;
  const data = model.datas[1].points;

  const chart = new Path2D();
  chart.rect(CHART_SETTINGS.PADDING.VERTICAL + 2, 0, w - 20, h - 1);
  ctx.clip(chart, 'evenodd');
  ctx.beginPath();

  data.map(({ x, y }, index) => {
    if (index === 0) {
      ctx.moveTo(x, y);
    }
    ctx.strokeStyle = COLOR.orange;
    ctx.lineWidth = 2;
    ctx.lineTo(x, y);

    const circle = new Path2D();
    circle.arc(x, y, 4, 0, 2 * Math.PI);

    ctx.fillStyle = COLOR.darkorange;
    ctx.fill(circle);
  });
  ctx.stroke();
};

const draw = (ctx: CanvasRenderingContext2D, model: LineChartModel) => {
  drawChart(ctx, model);
  drawClickedChart(ctx, model);
};

export default {
  draw,
};
