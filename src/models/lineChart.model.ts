import { ChartOptions, Point } from '../types/LineChart';
import CHART from '../constants/chart';
import { Datum } from '../types/Data';

class LineChartModel {
  points: Point[] = [];
  datas: Datum[] = [];
  options: ChartOptions;

  constructor(options: ChartOptions) {
    this.options = {
      ...options,
      rect: {
        x: CHART.PADDING.HORIZONTAL,
        y: CHART.PADDING.VERTICAL,
        w: options.rect.w - CHART.PADDING.HORIZONTAL,
        h: options.rect.h - CHART.PADDING.VERTICAL,
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

  setAxisY = (type = 'ZOOM-IN') => {
    const { start, end } = this.options.axisY.range;
    const { y } = this.options.ticks;

    let point = end;
    if (type === 'ZOOM-IN') {
      point += y;
    } else {
      point -= y;
    }

    if (point >= start + y && point <= 300) {
      this.options = {
        ...this.options,
        axisY: {
          range: {
            ...this.options.axisY.range,
            end: point,
          },
        },
      };
    }
  };
}

export default LineChartModel;
