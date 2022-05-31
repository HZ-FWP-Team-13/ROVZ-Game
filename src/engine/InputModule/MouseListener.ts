import Vector2 from "../MathModule/Vector2.js";

export default class MouseListener {
  private _mousePosition: Vector2 = Vector2.zero;
  private _mouseButtons: number;
  private _mouseInAction: boolean = false;

  /**
   * Constructs a new MouseListener.
   */
  constructor() {
    window.addEventListener('mousemove', (event: MouseEvent) => {
      this._mousePosition = new Vector2(event.clientX, event.clientY);
      if (this._mousePosition.x != 0 || this._mousePosition.y != 0) {
        this._mouseInAction = true;
      }
      this._mouseButtons = event.buttons;
    });
  }

  /**
   * Get the position of this Mouse
   *
   * @returns The position of this Mouse
   */
  public get mousePosition(): Vector2 {
    return this._mousePosition;
  }

  /**
   * Get the pressed Mouse buttons
   *
   * @returns The pressed Mouse buttons
   */
  public get mouseButtons(): number {
    return this._mouseButtons;
  }

  /**
   * Get `true` if the Mouse was used at least once in this Scene
   *
   * @returns `true` if the Mouse was used at least once in this Scene
   */
  public get mouseInAction(): boolean {
    return this._mouseInAction;
  }
}
