export const binarySearch = <T>(
  data: T[],
  target: number,
  property: keyof T
) => {
  let low = 0;
  let high = data.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const value = data[mid][property];

    if (value === target) {
      return mid;
    } else if (value < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return low - 1;
};
