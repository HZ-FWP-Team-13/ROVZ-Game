import KeyListener from './KeyListener.js';

export default class InputAxis {
  // The KeyListener
  private keyListener: KeyListener;

  // The value of the InputAxis
  private value: number = 0;

  // The KeyCode of the InputAxis positive Input Key
  private positiveKey: number;
  // The KeyCode of the InputAxis negative Input Key
  private negativeKey: number;

  // The KeyCode of the InputAxis alternative positive Input Key
  private positiveKeyAlt: number;
  // The KeyCode of the InputAxis alternative negative Input Key
  private negativeKeyAlt: number;

  /**
   * Create a new InputAxis instance
   *
   * @param positiveKey The KeyCode of the InputAxis positive Input Key
   * @param negativeKey The KeyCode of the InputAxis negative Input Key
   * @param positiveKeyAlt The KeyCode of the InputAxis alternative positive Input Key
   * @param negativeKeyAlt The KeyCode of the InputAxis alternative negative Input Key
   */
  public constructor(
    positiveKey: number,
    negativeKey: number = 0,
    positiveKeyAlt: number = 0,
    negativeKeyAlt: number = 0,
  ) {
    this.keyListener = new KeyListener();
    this.positiveKey = positiveKey;
    this.negativeKey = negativeKey;
    this.positiveKeyAlt = positiveKeyAlt;
    this.negativeKeyAlt = negativeKeyAlt;
  }

  /**
   * Read the value of the Key with the given KeyCode
   *
   * @param keyCode The given KeyCode
   * @returns The value of the Key with the given KeyCode
   */
  public isKeyDown(keyCode: number): number {
    return Number(this.keyListener.isKeyDown(keyCode));
  }

  /**
   * Read the value of this InputAxis
   *
   * @returns The value of this InputAxis
   */
  public readInput(): number {

    // Reading the positive Input
    let positiveAxisInput = 0;
    if (this.positiveKeyAlt != 0) {
      positiveAxisInput = Math.max(
        this.isKeyDown(this.positiveKey),
        this.isKeyDown(this.positiveKeyAlt)
      );
    } else {
      positiveAxisInput = this.isKeyDown(this.positiveKey);
    }

    // Reading the negative Input
    let negativeAxisInput = 0;
    if (this.negativeKeyAlt != 0) {
      negativeAxisInput = Math.max(
        this.isKeyDown(this.negativeKey),
        this.isKeyDown(this.negativeKeyAlt)
      );
    } else if (this.negativeKey != 0) {
      negativeAxisInput = this.isKeyDown(this.negativeKey);
    } else {
      negativeAxisInput = 0;
    }

    return this.value = positiveAxisInput - negativeAxisInput;
  }

  /**
   * Get value of this InputAxis
   *
   * @returns The value of this InputAxis
   */
  public getValue(): number {
    return this.value;
  }
}
