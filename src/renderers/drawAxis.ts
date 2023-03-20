import COLOR from '../constants/color';
import CHART_SETTINGS from '../constants/chartSettings';

import {
  drawHorizontalLine,
  drawVerticalLine,
  LineStyle,
  setLineStyle,
} from './drawLine';

import { formatDate } from '../utils/formatDate';
import { formatX, formatY } from '../utils/domain/formatDataToPoint';
import { Axis, AxisKey, Rect } from '../types/Chart';

class AxisHelper {
  rect: Rect;

  constructor(rect: Rect) {
    this.rect = rect;
  }

  drawAxis = (
    type: AxisKey,
    ctx: CanvasRenderingContext2D,
    axisOption: Axis
  ) => {
    switch (type) {
      case 'time':
        this.#drawAxisByTime(ctx, axisOption);
        break;
      case 'value':
        this.#drawAxisByValue(ctx, axisOption);
    }
  };

  // TODO 축과 관계없이 사용할 수 있도록 분리하기! (현재는 각 함수가 x, y축에서만 사용가능)
  #drawAxisByTime = (ctx: CanvasRenderingContext2D, axisOption: Axis) => {
    const { x, y, w, h } = this.rect;
    const {
      tick,
      format,
      range: { start, end },
    } = axisOption;

    ctx.save();
    ctx.textAlign = 'center';

    let current = start - (start % tick);
    const xPointFormatter = formatX(w, start, end, tick);

    while (current <= end) {
      const xPoint = xPointFormatter(current);

      const text = formatDate(format, new Date(current));
      current += tick;

      if (xPoint < CHART_SETTINGS.PADDING.VERTICAL) continue;
      drawVerticalLine(ctx, xPoint, h, h + 5);
      ctx.font = '12px arial';
      ctx.fillText(text, xPoint, h + 15);
    }

    drawVerticalLine(ctx, x, y, h);
    ctx.restore();
  };

  #drawAxisByValue = (ctx: CanvasRenderingContext2D, axisOption: Axis) => {
    const { x, w, h } = this.rect;

    const {
      tick,
      range: { start, end },
    } = axisOption;

    ctx.save();
    drawHorizontalLine(ctx, h, x, w);

    ctx.beginPath();
    ctx.textAlign = 'right';

    const yPointFormatter = formatY(h, end, tick);

    ctx.strokeStyle = COLOR.lightgray;
    setLineStyle(ctx, LineStyle.Dotted);

    for (let i = start; i <= end; i += tick) {
      const yPoint = yPointFormatter(i);
      ctx.fillText(`${i}`, CHART_SETTINGS.PADDING.VERTICAL, yPoint);

      if (i !== 0) {
        drawHorizontalLine(ctx, yPoint, CHART_SETTINGS.PADDING.HORIZONTAL, w);
      }
    }
    ctx.stroke();
    ctx.restore();
  };
}

export default AxisHelper;
