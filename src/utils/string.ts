export const padLeft = (
  value: string,
  padding: string,
  length: number
): string => {
  let paddedValue = value;
  while (paddedValue.length < length) {
    paddedValue = padding + paddedValue;
  }
  return paddedValue;
};
