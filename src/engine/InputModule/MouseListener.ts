import Vector2 from '../MathModule/Vector2.js';

export default class MouseListener {
  private mousePosition: Vector2 = Vector2.zero;

  private mouseButtons: number = 0;

  private mouseInAction: boolean = false;

  /**
   * Constructs a new MouseListener.
   */
  constructor() {
    window.addEventListener('mousemove', (event) => {
      this.mousePosition = new Vector2(event.clientX, event.clientY);
      if (this.mousePosition.getX() !== 0 || this.mousePosition.getY() !== 0) {
        this.mouseInAction = true;
      }
    });
    window.addEventListener('click', () => {
      this.mouseButtons = 1;
    });
  }

  /**
   * Get the position of this Mouse
   *
   * @returns The position of this Mouse
   */
  public getMousePosition(): Vector2 {
    return this.mousePosition;
  }

  /**
   * Get the pressed Mouse buttons
   *
   * @returns The pressed Mouse buttons
   */
  public getMouseButtons(): number {
    return this.mouseButtons;
  }

  /**
   * Set the pressed Mouse buttons
   *
   * @param mouseButtons The pressed Mouse buttons
   */
  public setMouseButtons(mouseButtons: number): void {
    this.mouseButtons = mouseButtons;
  }

  /**
   * Get `true` if the Mouse was used at least once in this Scene
   *
   * @returns `true` if the Mouse was used at least once in this Scene
   */
  public getMouseInAction(): boolean {
    return this.mouseInAction;
  }
}
