import CHART_SETTINGS from '../../constants/chartSettings';

export const formatXPointToData = (
  width: number,
  start: number,
  end: number,
  tick: number
) => {
  const xTickCount = (end - start) / tick;
  const bandWidthX = Math.floor(
    (width - CHART_SETTINGS.PADDING.VERTICAL) / xTickCount
  );

  return (point: number) => {
    const timeInMinutes =
      (point + 1 - CHART_SETTINGS.PADDING.VERTICAL) / bandWidthX;
    return Math.floor(start + timeInMinutes * tick);
  };
};

export const formatYPointToData = (
  height: number,
  end: number,
  tick: number
) => {
  const tickCount = end / tick;
  const bandWidth = Math.floor(
    (height - CHART_SETTINGS.PADDING.VERTICAL) / tickCount
  );

  return (point: number) =>
    Math.floor(((height - point) * end) / bandWidth / tickCount);
};
