export interface ChartOptions {
  rect: Rect;
  axisX: {
    format?: string;
    tick: number;
    range: AxisRange;
  };
  axisY: {
    format?: string;
    min?: number;
    max?: number;
    tick: number;
    range: AxisRange;
  };
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
