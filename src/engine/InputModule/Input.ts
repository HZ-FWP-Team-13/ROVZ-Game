import Vector2 from '../experimenting/Vector2.js';
import InputAxis from './InputAxis.js';
import MouseListener from './MouseListener.js';

export default class Input {
  // The map of InputAxises
  private axises: Map<string, InputAxis>;
  // The MouseListener
  private mouse: MouseListener;

  /**
   * Create a new Input instance
   *
   * @param axises The InputAxises configuration of this Scene
   */
  public constructor(axises: Map<string, InputAxis> = null) {
    if (axises != null) {
      this.editAxises(axises);
    }

    this.mouse = new MouseListener();
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
   * Get all InputAxis of this Input
   *
   * @returns All InputAxis of this Input
   */
  public getAxises(): Map<string, InputAxis> {
    return this.axises;
  }

  /**
   * Get the InputAxis with the given name
   *
   * @param axisName The given InputAxis name
   * @returns The InputAxis with the given name
   */
  public getAxis(axisName: string): InputAxis {
    return this.axises.get(axisName);
  }

  /**
   * Read the Pressed value of the InputAxis with the given name
   *
   * @param axisName The given InputAxis name
   * @returns The Pressed value of the InputAxis with the given name
   */
  public readAxisPressed(axisName: string): number {
    return this.getAxis(axisName).readPressed();
  }

  /**
   * Read the Typed value of the InputAxis with the given name
   *
   * @param axisName The given InputAxis name
   * @returns The Typed value of the InputAxis with the given name
   */
  public readAxisTyped(axisName: string): number {
    return this.getAxis(axisName).readTyped();
  }

  /**
   * Get the position of the Mouse
   *
   * @returns The position of the Mouse
   */
   public getMousePosition(): Vector2 {
    return this.mouse.getMousePosition();
  }

  /**
   * Get the pressed Mouse buttons
   *
   * @returns The pressed Mouse buttons
   */
  public getMouseButtons(): number {
    return this.mouse.getMouseButtons();
  }

  /**
   * Get `true` if the Mouse was used at least once in this Scene
   *
   * @returns `true` if the Mouse was used at least once in this Scene
   */
  public getMouseInAction(): boolean {
    return this.mouse.getMouseInAction();
  }
}
