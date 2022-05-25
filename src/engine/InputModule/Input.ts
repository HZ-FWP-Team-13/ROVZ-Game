import InputAxis from './InputAxis.js';

export default class Input {
  // The map of InputAxises
  private axises: Map<string, InputAxis>;

  /**
   * Create a new Input instance
   *
   * @param axises The InputAxises configuration of this Scene
   */
  public constructor(axises: Map<string, InputAxis> = null) {
    if (axises != null) {
      this.editAxises(axises);
    }
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
}
