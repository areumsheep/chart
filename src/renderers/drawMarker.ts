export type SeriesMarkerShape = 'circle' | 'square';

const enum Constants {
  MinShapeSize = 12,
  MaxShapeSize = 30,
  MinShapeMargin = 3,
}

const ceiledOdd = (x: number) => {
  const ceiled = Math.ceil(x);
  return ceiled % 2 === 0 ? ceiled - 1 : ceiled;
};

const size = (barSpacing: number, coeff: number) => {
  const result =
    Math.min(
      Math.max(barSpacing, Constants.MinShapeSize),
      Constants.MaxShapeSize
    ) * coeff;
  return ceiledOdd(result);
};

const shapeSize = (shape: SeriesMarkerShape, originalSize: number) => {
  switch (shape) {
    case 'circle':
      return size(originalSize, 0.8);
    case 'square':
      return size(originalSize, 0.7);
  }
};

export const drawCircle = (
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  size: number
) => {
  const circleSize = shapeSize('circle', size);
  const halfSize = (circleSize - 1) / 2;

  ctx.beginPath();
  ctx.arc(centerX, centerY, halfSize, 0, 2 * Math.PI, false);

  ctx.fill();
};

export const drawSquare = (
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  size: number
) => {
  const squareSize = shapeSize('square', size);
  const halfSize = (squareSize - 1) / 2;
  const left = centerX - halfSize;
  const top = centerY - halfSize;

  ctx.fillRect(left, top, squareSize, squareSize);
};
