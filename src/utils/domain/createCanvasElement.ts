const createCanvasElement = (width: number, height: number, ratio?: number) => {
  const dpr = window.devicePixelRatio || 1;

  const canvas = document.createElement('canvas');
  canvas.style.position = 'absolute';
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  const context = canvas.getContext('2d');
  context?.scale(ratio || dpr, ratio || dpr);

  return canvas;
};

export default createCanvasElement;
