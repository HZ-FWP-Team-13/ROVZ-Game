import KeyListener from './KeyListener.js';

export default class Input {
  private keyListener: KeyListener;

  // The Horizontal Input Axis
  private horizontalAxis: number = 0;

  // The Vertical Input Axis
  private verticalAxis: number = 0;

  // The Rotation Input Axis
  private rotationAxis: number = 0;

  private startKey: boolean;

  /**
   * Create a new Input instance
   */
  public constructor() {
    this.keyListener = new KeyListener();
  }

  /**
   * Read the Horizontal Axis Input
   *
   * @returns The Horizontal Axis Input
   */
  public readHorizontalInput(): number {
    return this.horizontalAxis =
      (this.keyListener.isKeyDown(KeyListener.KEY_D) ? 1 : 0) -
      (this.keyListener.isKeyDown(KeyListener.KEY_A) ? 1 : 0);
  }

  /**
   * Read the Vertical Axis Input
   *
   * @returns The Vertical Axis Input
   */
  public readVerticalInput(): number {
    return this.verticalAxis =
      (this.keyListener.isKeyDown(KeyListener.KEY_W) ? 1 : 0) -
      (this.keyListener.isKeyDown(KeyListener.KEY_S) ? 1 : 0);
  }

  /**
   * Read the Rotation Axis Input
   *
   * @returns The Rotation Axis Input
   */
  public readRotationInput(): number {
    return this.rotationAxis =
      (this.keyListener.isKeyDown(KeyListener.KEY_RIGHT) ? 1 : 0) -
      (this.keyListener.isKeyDown(KeyListener.KEY_LEFT) ? 1 : 0);
  }

  /**
   * Read the Start Key Input
   *
   * @returns The Start Key Input
   */
  public readStartInput(): boolean {
    return this.startKey = this.keyListener.isKeyTyped(KeyListener.KEY_S);
  }

  /**
   * Get the Horizontal Axis Input
   *
   * @returns The Horizontal Axis Input
   */
  public getHorizontalAxis(): number {
    return this.horizontalAxis;
  }

  /**
   * Get the Vertical Axis Input
   *
   * @returns The Vertical Axis Input
   */
  public getVerticalAxis(): number {
    return this.verticalAxis;
  }

  /**
   * Get the Rotation Axis Input
   *
   * @returns The Rotation Axis Input
   */
  public getRotationAxis(): number {
    return this.rotationAxis;
  }

  /**
   * Get the Start Key Input
   *
   * @returns The Start Key Input
   */
  public getStartKey(): boolean {
    return this.startKey;
  }
}
