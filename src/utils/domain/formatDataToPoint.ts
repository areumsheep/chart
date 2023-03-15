import CHART_SETTINGS from '../../constants/chartSettings';

export const formatX = (
  width: number,
  start: number,
  end: number,
  tick: number
) => {
  const xTickCount = (end - start) / tick;
  const bandWidthX = Math.floor(
    (width - CHART_SETTINGS.PADDING.VERTICAL) / xTickCount
  );

  return (time: number) => {
    const timePoint = (time - start) / tick;
    return (
      Math.floor(timePoint * bandWidthX + CHART_SETTINGS.PADDING.VERTICAL) - 1
    );
  };
};

export const formatY = (height: number, end: number, tick: number) => {
  const tickCount = end / tick;
  const bandWidth = Math.floor(
    (height - CHART_SETTINGS.PADDING.VERTICAL) / tickCount
  );

  return (value: number) =>
    Math.floor(height - (value / end) * bandWidth * tickCount);
};
