export interface ChartOptions {
  rect: Rect;
  axisX: {
    format?: string;
    range: AxisRange;
  };
  axisY: {
    format?: string;
    range: AxisRange;
  };
  ticks: Point;
}

export interface AxisRange {
  start: number;
  end: number;
}
export interface Point {
  x: number;
  y: number;
}
export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}
