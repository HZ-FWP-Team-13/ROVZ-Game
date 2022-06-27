export default abstract class Component {
  // The type of the Component
  private type: string;

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
  public getType(): string {
    return this.type;
  }

  /**
   * Set the type of the Component
   *
   * @param value The type of the Component
   */
  public setType(value: string): void {
    this.type = value;
  }
}
