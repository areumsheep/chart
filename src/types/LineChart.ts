export interface ChartOptions {
  rect: Rect;
  axisX: {
    range: AxisRange;
  };
  axisY: {
    range: AxisRange;
  };
  tics: Point;
}

interface AxisRange {
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
