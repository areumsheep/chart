import type { Datum } from '../types/Data';
import type { ChartOptions, Point } from '../types/LineChart';

import CHART from '../constants/chart';
import EVENT, { type EventKey } from '../constants/event';

const MAX_END_POINT_COUNT = 3;
class LineChartModel {
  points: Point[] = [];
  datas: Datum[] = [];
  options: ChartOptions;

  constructor(options: ChartOptions) {
    const {
      tick,
      range: { start, end },
    } = options.axisY;

    const minY = start + tick;
    const maxY = end * MAX_END_POINT_COUNT;

    this.options = {
      ...options,
      rect: {
        x: CHART.PADDING.HORIZONTAL,
        y: CHART.PADDING.VERTICAL,
        w: options.rect.w - CHART.PADDING.HORIZONTAL,
        h: options.rect.h - CHART.PADDING.VERTICAL,
      },
      axisY: {
        ...options.axisY,
        min: minY,
        max: maxY,
      },
    };
  }

  getInitialData = (datum: Datum) => {
    this.datas.push(datum);
  };

  getUpdateData = (datum: Datum) => {
    this.datas.push(datum);

    this.options = {
      ...this.options,
      axisX: {
        ...this.options.axisX,
        range: {
          start: Date.now() - 60 * 5 * 1000,
          end: Date.now(),
        },
      },
    };
  };

  setPoints = (points: Point[]) => {
    this.points = points;
  };

  setAxisY = (type: EventKey) => {
    const {
      min,
      max,
      tick,
      range: { end },
    } = this.options.axisY;

    let point = end;
    if (type === EVENT.ZOOM_IN) {
      point += tick;
    } else {
      point -= tick;
    }

    if (!max || !min) return;
    if (!(point >= min && point <= max)) return;

    this.options.axisY.range.end = point;
  };

  setWidth = (width: number) => {
    this.options.rect.w = width;
  };
}

export default LineChartModel;
