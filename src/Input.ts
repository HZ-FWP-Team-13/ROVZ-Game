
import KeyListener from './KeyListener.js';

export default class Input {
  private keyListener: KeyListener;

  // The horizontal input axis
  private horizontalAxis: number = 0;

  // The vertical input axis
  private verticalAxis: number = 0;

  // The rotation input axis
  private rotationAxis: number = 0;

  private startKey: boolean;

  public constructor() {
    this.keyListener = new KeyListener();
  }

  public readHorizontalInput(): number {
    return this.horizontalAxis =
      (this.keyListener.isKeyDown(KeyListener.KEY_D) ? 1 : 0) -
      (this.keyListener.isKeyDown(KeyListener.KEY_A) ? 1 : 0);
  }

  public readVerticalInput(): number {
    return this.verticalAxis =
      (this.keyListener.isKeyDown(KeyListener.KEY_W) ? 1 : 0) -
      (this.keyListener.isKeyDown(KeyListener.KEY_S) ? 1 : 0);
  }

  public readRotationInput(): number {
    return this.rotationAxis =
      (this.keyListener.isKeyDown(KeyListener.KEY_RIGHT) ? 1 : 0) -
      (this.keyListener.isKeyDown(KeyListener.KEY_LEFT) ? 1 : 0);
  }

  public readStartInput(): boolean {
    return this.startKey = this.keyListener.isKeyTyped(KeyListener.KEY_S);
  }

  public getHorizontalAxis(): number {
    return this.horizontalAxis;
  }

  public getVerticalAxis(): number {
    return this.verticalAxis;
  }

  public getRotationAxis(): number {
    return this.rotationAxis;
  }

  public getStartKey(): boolean {
    return this.startKey;
  }
}
