import Transform from '../ComponentsModule/Transform.js';

export default abstract class GameObject {
  // The id of the GameObject
  private id: string;

  // The Transform of the GameObject
  private transform: Transform;

  /**
   * Create a new GameObject instance
   *
   * @param id The id of the GameObject
   * @param transform The Transform of the GameObject
   */
  public constructor(id: string, transform: Transform) {
    this.id = id;
    this.transform = transform;
  }

  /**
   * Get the id of the GameObject
   *
   * @returns The id of the GameObject
   */
  public getId(): string {
    return this.id;
  }

  /**
   * Set the id of the GameObject
   *
   * @param value The id of the GameObject
   */
  public setId(value: string): void {
    this.id = value;
  }

  /**
   * Get the Transform of this GameObject
   *
   * @returns The Transform of this GameObject
   */
  public getTransform(): Transform {
    return this.transform;
  }

  /**
   * Set the Transform of this GameObject
   *
   * @param value The Transform of this GameObject
   */
  public setTransform(value: Transform): void {
    this.transform = value;
  }
}
