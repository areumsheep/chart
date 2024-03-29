import type { ChartOptions } from '../types/Chart';

import CHART_SETTINGS from '../constants/chartSettings';
import { MOUSE_EVENT, type MouseEventKey } from '../constants/event';

import Data from './data.model';

class LineChartModel {
  datas: Data[] = [];
  options: ChartOptions;

  constructor(options: ChartOptions) {
    for (let i = 0; i < options.datasets.length; i++) {
      const { data, color, marker } = options.datasets[i];
      this.datas.push(new Data(data, color, marker));
    }

    this.options = {
      ...options,
      rect: {
        x: CHART_SETTINGS.PADDING.HORIZONTAL,
        y: CHART_SETTINGS.PADDING.VERTICAL,
        w: options.rect.w - CHART_SETTINGS.PADDING.HORIZONTAL,
        h: options.rect.h - CHART_SETTINGS.PADDING.VERTICAL,
      },
    };
  }

  get axis() {
    const { w, h } = this.options.rect;
    const {
      tick: xTick,
      range: { start: xStart, end: xEnd },
    } = this.options.xAxis;
    const {
      tick: yTick,
      range: { start: yStart, end: yEnd },
    } = this.options.yAxis;

    return {
      w,
      h,
      xTick,
      xStart,
      xEnd,
      yTick,
      yStart,
      yEnd,
    };
  }

  updateRangeTime = () => {
    this.options.xAxis.range.start = Date.now() - 60 * 5 * 1000;
    this.options.xAxis.range.end = Date.now() - 2000;
  };

  setWidth = (width: number) => {
    this.options.rect.w = width;
  };
  setHeight = (height: number) => {
    this.options.rect.h = height;
  };
  setAxisY = (type: MouseEventKey) => {
    const {
      tick,
      range: { end, min, max },
    } = this.options.yAxis;

    let point = end;
    if (type === MOUSE_EVENT.ZOOM_IN) {
      point += tick;
    } else {
      point -= tick;
    }

    if (!max || !min) return;
    if (!(point >= min && point <= max)) return;

    this.options.yAxis.range.end = point;
  };

  filterVisibleDatas = (index: number) => {
    const { start } = this.options.xAxis.range;
    const target = this.datas[index];

    const visibleData = target.datas?.filter(({ time }) => time > start);
    target.setDatas(visibleData);

    return visibleData;
  };
}

export default LineChartModel;
