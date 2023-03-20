// 상수
export const DatasetType = {
  line: 'line',
  bar: 'bar',
} as const;

export const AxisType = {
  time: 'time',
  value: 'value',
} as const;

// 차트 전체에서 사용할 Option
export interface ChartOptions {
  rect: Rect;
  refreshTime?: number;
  datasets: Dataset[];
  xAxis: Axis;
  yAxis: Axis;
}

// Option에 정의된 타입
export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Dataset {
  type: keyof typeof DatasetType;
  data: any[];
  handler?: 'click';
  color: string;
}

export type AxisKey = keyof typeof AxisType;

export interface Axis {
  type: AxisKey;
  format?: string;
  gap?: number;
  tick: number;
  range: AxisRange;
}

export interface AxisRange {
  start: number;
  end: number;
  min?: number;
  max?: number;
}
export interface Point {
  x: number;
  y: number;
}
