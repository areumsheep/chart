class Pane {
  pane = document.createElement('canvas');

  constructor(
    $target: HTMLCanvasElement,
    width: number,
    height: number,
    id?: string
  ) {
    this.pane.width = width;
    this.pane.height = height;
    this.pane.id = id || 'canvas';
    this.pane.style.position = 'absolute';

    $target.parentElement?.insertAdjacentElement('afterbegin', this.pane);
  }

  get ctx() {
    return this.pane.getContext('2d')!;
  }

  addMouseMoveEvent = (callback: (event: MouseEvent) => void) => {
    this.pane.addEventListener('mousemove', (event) => {
      this.ctx?.clearRect(0, 0, 1000, 600);
      this.pane.style.cursor = 'pointer';
      callback(event);
    });

    this.pane.addEventListener('mouseout', () => {
      this.ctx?.clearRect(0, 0, 1000, 600);
    });
  };
}

export default Pane;
