const MAX_DEVICE_PIXEL_RATIO = 2;

const getPixelRatio = () => {
  const dpr = window.devicePixelRatio;
  if (dpr >= MAX_DEVICE_PIXEL_RATIO) return MAX_DEVICE_PIXEL_RATIO;
  return 1;
};

export default getPixelRatio;
