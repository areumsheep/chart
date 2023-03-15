import type { Datum } from '../types/Data';
import type { ChartOptions, Point } from '../types/Chart';

import CHART_SETTINGS from '../constants/chartSettings';
import { MOUSE_EVENT, type MouseEventKey } from '../constants/event';
import { binarySearch } from '../utils/search';

const MAX_END_POINT_COUNT = 2;
class LineChartModel {
  points: Point[] = [];
  clickedPoints: Point[] = [];
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
        x: CHART_SETTINGS.PADDING.HORIZONTAL,
        y: CHART_SETTINGS.PADDING.VERTICAL,
        w: options.rect.w - CHART_SETTINGS.PADDING.HORIZONTAL,
        h: options.rect.h - CHART_SETTINGS.PADDING.VERTICAL,
      },
      axisY: {
        ...options.axisY,
        min: minY,
        max: maxY,
      },
    };
  }

  addInitialData = (datum: Datum) => {
    this.datas.push(datum);
  };
  addUpdateData = (datum: Datum) => {
    this.datas.push(datum);

    this.options.axisX.range.start = Date.now() - 60 * 5 * 1000;
    this.options.axisX.range.end = Date.now();
  };
  addClickedPoint = (point: Point) => {
    this.clickedPoints.push(point);
  };

  setPoints = (points: Point[]) => {
    this.points = points;
  };
  setWidth = (width: number) => {
    this.options.rect.w = width;
  };
  setHeight = (height: number) => {
    this.options.rect.h = height;
  };
  setAxisY = (type: MouseEventKey) => {
    const {
      min,
      max,
      tick,
      range: { end },
    } = this.options.axisY;

    let point = end;
    if (type === MOUSE_EVENT.ZOOM_IN) {
      point += tick;
    } else {
      point -= tick;
    }

    if (!max || !min) return;
    if (!(point >= min && point <= max)) return;

    this.options.axisY.range.end = point;
  };

  deleteClickedPoint = (index: number) => {
    this.clickedPoints.splice(index, 1);
  };

  findNearestPointIndex = <T = Point>(
    target: T[],
    point: number,
    property: keyof T
  ) => {
    return binarySearch<T>(target, point, property);
  };
}

export default LineChartModel;
