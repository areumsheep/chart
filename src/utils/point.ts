import type { Point } from '../types/LineChart';

type DistanceMemoType = {
  [key: string]: number;
};
const memoPointsDistance: DistanceMemoType = {};

const getDistance = ([x1, y1, x2, y2]: [number, number, number, number]) => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
};

export const findNearestPoint = (
  mouseX: number,
  mouseY: number,
  points: Point[]
) => {
  let minDistance = Infinity;
  let nearestPoint;
  for (let i = 0; i < points.length; i++) {
    const { x, y } = points[i];
    const key = `${x},${y}`;
    let distance;

    if (memoPointsDistance[key]) {
      distance = memoPointsDistance[key];
    } else {
      distance = getDistance([x, y, mouseX, mouseY]);
      memoPointsDistance[key] = distance;
    }

    if (distance < minDistance) {
      minDistance = distance;
      nearestPoint = [x, y];
    }
  }
  return nearestPoint;
};