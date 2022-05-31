import KeyListener from './KeyListener.js';

export default class InputAxis {
  // The KeyListener
  private keyListener: KeyListener;

  // The value of the InputAxis
  private _value: number = 0;

  // The description of the positive InputAxis direction
  private _positiveDescription: string;
  // The KeyCode of the InputAxis positive Input Key
  private positiveKey: number;

  // The description of the negative InputAxis direction
  private _negativeDescription: string;
  // The KeyCode of the InputAxis negative Input Key
  private negativeKey: number;

  // The KeyCode of the InputAxis alternative positive Input Key
  private positiveKeyAlt: number;
  // The KeyCode of the InputAxis alternative negative Input Key
  private negativeKeyAlt: number;

  /**
   * Create a new InputAxis instance
   *
   * @param positiveDescription The description of the positive InputAxis direction
   * @param positiveKey The KeyCode of the InputAxis positive Input Key
   * @param negativeDescription The description of the negative InputAxis direction
   * @param negativeKey The KeyCode of the InputAxis negative Input Key
   * @param positiveKeyAlt The KeyCode of the InputAxis alternative positive Input Key
   * @param negativeKeyAlt The KeyCode of the InputAxis alternative negative Input Key
   */
  public constructor(
    positiveDescription: string,
    positiveKey: number,
    negativeDescription: string = '',
    negativeKey: number = 0,
    positiveKeyAlt: number = 0,
    negativeKeyAlt: number = 0,
  ) {
    this.keyListener = new KeyListener();
    this._positiveDescription = positiveDescription;
    this.positiveKey = positiveKey;
    this._negativeDescription = negativeDescription;
    this.negativeKey = negativeKey;
    this.positiveKeyAlt = positiveKeyAlt;
    this.negativeKeyAlt = negativeKeyAlt;
  }

  /**
   * Get the value of the Pressed Key with the given KeyCode
   *
   * @param keyCode The given KeyCode
   * @returns The Down value of the Key with the given KeyCode
   */
  public pressedKeyValue(keyCode: number): number {
    return Number(this.keyListener.isKeyDown(keyCode));
  }

  /**
   * Get the value of the Typed Key with the given KeyCode
   *
   * @param keyCode The given KeyCode
   * @returns The Typed value of the Key with the given KeyCode
   */
  public typedKeyValue(keyCode: number): number {
    return Number(this.keyListener.isKeyTyped(keyCode));
  }

  /**
   * Get the value of the Pressed Positive Keys of this Input Axis
   *
   * @returns The value of the Pressed Positive Keys of this Input Axis
   */
  public positivePressedInput(): number {
    let positiveDownInput = 0;
    if (this.positiveKeyAlt != 0) {
      positiveDownInput = Math.max(
        this.pressedKeyValue(this.positiveKey),
        this.pressedKeyValue(this.positiveKeyAlt)
      );
    } else {
      positiveDownInput = this.pressedKeyValue(this.positiveKey);
    }
    return positiveDownInput;
  }

  /**
   * Get the value of the Typed Positive Keys of this Input Axis
   *
   * @returns The value of the Typed Positive Keys of this Input Axis
   */
  public positiveTypedInput(): number {
    let positiveTypedInput = 0;
    if (this.positiveKeyAlt != 0) {
      positiveTypedInput = Math.max(
        this.typedKeyValue(this.positiveKey),
        this.typedKeyValue(this.positiveKeyAlt)
      );
    } else {
      positiveTypedInput = this.typedKeyValue(this.positiveKey);
    }
    return positiveTypedInput;
  }

  /**
   * Get the value of the Pressed Negative Keys of this Input Axis
   *
   * @returns The value of the Pressed Negative Keys of this Input Axis
   */
  public negativePressedInput(): number {
    let negativeDownInput = 0;
    if (this.negativeKeyAlt != 0) {
      negativeDownInput = Math.max(
        this.pressedKeyValue(this.negativeKey),
        this.pressedKeyValue(this.negativeKeyAlt)
      );
    } else if (this.negativeKey != 0) {
      negativeDownInput = this.pressedKeyValue(this.negativeKey);
    } else {
      negativeDownInput = 0;
    }
    return negativeDownInput;
  }

  /**
   * Get the value of the Typed Negative Keys of this Input Axis
   *
   * @returns The value of the Typed Negative Keys of this Input Axis
   */
  public negativeTypedInput(): number {
    let negativeTypedInput = 0;
    if (this.negativeKeyAlt != 0) {
      negativeTypedInput = Math.max(
        this.typedKeyValue(this.negativeKey),
        this.typedKeyValue(this.negativeKeyAlt)
      );
    } else if (this.negativeKey != 0) {
      negativeTypedInput = this.typedKeyValue(this.negativeKey);
    } else {
      negativeTypedInput = 0;
    }
    return negativeTypedInput;
  }

  /**
   * Read the Pressed value of this InputAxis
   *
   * @returns The Pressed value of this InputAxis
   */
  public readPressed(): number {
    return this._value = this.positivePressedInput() - this.negativePressedInput();
  }

  /**
   * Read the Typed value of this InputAxis
   *
   * @returns The Typed value of this InputAxis
   */
  public readTyped(): number {
    return this._value = this.positiveTypedInput() - this.negativeTypedInput();
  }

  /**
   * Get the value of this InputAxis
   *
   * @returns The value of this InputAxis
   */
  public get value(): number {
    return this._value;
  }

  /**
   * Get the description of the positive InputAxis direction
   *
   * @returns The description of the positive InputAxis direction
   */
  public get positiveDescription(): string {
    return this._positiveDescription;
  }

  /**
   * Get the description of the negative InputAxis direction
   *
   * @returns The description of the negative InputAxis direction
   */
  public get negativeDescription(): string {
    return this._negativeDescription;
  }
}
