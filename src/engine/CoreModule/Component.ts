export default abstract class Component {
  // The type of the Component
  private _type: string;

  /**
   * Create a new Component instance
   *
   * @param type The type of the Component
   */
  public constructor(type: string) {
    this.type = type;
  }

  /**
   * Get the type of the Component
   *
   * @returns The type of the Component
   */
  public get type(): string {
    return this._type;
  }
  /**
   * Set the type of the Component
   *
   * @param value The type of the Component
   */
  public set type(value: string) {
    this._type = value;
  }
}
