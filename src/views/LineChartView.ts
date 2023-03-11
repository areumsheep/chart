import BackgroundCanvas from './BackgroundCanvas';

class LineChartView {
  canvasWidth: number;
  canvasHeight: number;

  backgroundCanvas: BackgroundCanvas;

  constructor(canvas: HTMLCanvasElement) {
    const dpr = window.devicePixelRatio || 1;
    const { width, height } = canvas;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;

    this.backgroundCanvas = new BackgroundCanvas(canvas, dpr);
  }

  render() {
    const backgroundCanvas = this.backgroundCanvas.draw();
  }
}

export default LineChartView;
