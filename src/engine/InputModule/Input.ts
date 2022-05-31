import InputAxis from './InputAxis.js';
import MouseListener from './MouseListener.js';

export default class Input {
  // The map of InputAxises
  private _axises: Map<string, InputAxis>;
  // The MouseListener
  private _mouse: MouseListener;

  /**
   * Create a new Input instance
   *
   * @param axises The InputAxises configuration of this Scene
   */
  public constructor(axises: Map<string, InputAxis> = null) {
    if (axises != null) {
      this.editAxises(axises);
    }

    this._mouse = new MouseListener();
  }

  /**
   * Edit InputAxises of this Input
   *
   * @param axises The modified InputAxises Map
   */
  public editAxises(axises: Map<string, InputAxis>): void {
    if (this.axises != null) {
      this.axises = new Map<string, InputAxis>([...this.axises, ...axises]);
    } else {
      this.axises = axises;
    }
  }

  /**
   * Get the InputAxis with the given name
   *
   * @param axisName The given InputAxis name
   * @returns The InputAxis with the given name
   */
  public axis(axisName: string): InputAxis {
    return this.axises.get(axisName);
  }

  /**
   * Read the Pressed value of the InputAxis with the given name
   *
   * @param axisName The given InputAxis name
   * @returns The Pressed value of the InputAxis with the given name
   */
  public readAxisPressed(axisName: string): number {
    return this.axis(axisName).readPressed();
  }

  /**
   * Read the Typed value of the InputAxis with the given name
   *
   * @param axisName The given InputAxis name
   * @returns The Typed value of the InputAxis with the given name
   */
  public readAxisTyped(axisName: string): number {
    return this.axis(axisName).readTyped();
  }

  /**
   * Get all InputAxis of this Input
   *
   * @returns All InputAxis of this Input
   */
  public get axises(): Map<string, InputAxis> {
    return this._axises;
  }
  /**
   * Set all InputAxis of this Input
   *
   * @param value All InputAxis of this Input
   */
  public set axises(value: Map<string, InputAxis>) {
    this._axises = value;
  }

  /**
   * Get the Mouse
   *
   * @returns The Mouse
   */
  public get mouse(): MouseListener {
    return this._mouse;
  }
}
