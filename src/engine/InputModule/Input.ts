import InputAxis from './InputAxis.js';
import KeyListener from './KeyListener.js';

export default class Input {
  // The map of InputAxises
  private axises: Map<string, InputAxis>;

  /**
   * Create a new Input instance
   *
   * @param axises The InputAxises configuration of this Scene
   */
  public constructor(axises: Map<string, InputAxis> = null) {
    this.axises = new Map<string,InputAxis>([...axises, ...new Map<string, InputAxis>([
      ['horizontal', new InputAxis(KeyListener.KEY_D, KeyListener.KEY_A)],
      ['vertical', new InputAxis(KeyListener.KEY_W, KeyListener.KEY_S)]
    ])]);
  }

  /**
   * Read the Input of an InputAxis with the given name
   *
   * @returns The Input of an InputAxis with the given name
   */
  public readAxisInput(axisName: string): number {
    return this.axises.get(axisName).readInput();
  }

  /**
   * Get the InputAxis with the given name
   *
   * @param axisName The given name
   * @returns The InputAxis with the given name
   */
  public getAxis(axisName: string): InputAxis {
    return this.axises.get(axisName);
  }
}
