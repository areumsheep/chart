export type LineWidth = 1 | 2 | 3 | 4;

export const enum LineStyle {
  Solid = 0,
  Dotted = 1,
  Dashed = 2,
  LargeDashed = 3,
  SparseDotted = 4,
}

export const setLineStyle = (
  ctx: CanvasRenderingContext2D,
  style: LineStyle
) => {
  const dashPatterns = {
    [LineStyle.Solid]: [],
    [LineStyle.Dotted]: [ctx.lineWidth, ctx.lineWidth],
    [LineStyle.Dashed]: [2 * ctx.lineWidth, 2 * ctx.lineWidth],
    [LineStyle.LargeDashed]: [6 * ctx.lineWidth, 6 * ctx.lineWidth],
    [LineStyle.SparseDotted]: [ctx.lineWidth, 4 * ctx.lineWidth],
  };

  const dashPattern = dashPatterns[style];
  ctx.setLineDash(dashPattern);
};

export const drawHorizontalLine = (
  ctx: CanvasRenderingContext2D,
  y: number,
  left: number,
  right: number
) => {
  ctx.beginPath();
  const correction = ctx.lineWidth % 2 ? 0.5 : 0;
  ctx.moveTo(left, y + correction);
  ctx.lineTo(right, y + correction);
  ctx.stroke();
};

export const drawVerticalLine = (
  ctx: CanvasRenderingContext2D,
  x: number,
  top: number,
  bottom: number
) => {
  ctx.beginPath();
  const correction = ctx.lineWidth % 2 ? 0.5 : 0;
  ctx.moveTo(x + correction, top);
  ctx.lineTo(x + correction, bottom);
  ctx.stroke();
};
