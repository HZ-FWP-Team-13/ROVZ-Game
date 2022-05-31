import Transform from "../ComponentsModule/Transform.js";

export default abstract class GameObject {
  // The id of the GameObject
  private _id: string;

  // The Transform of the GameObject
  private _transform: Transform;

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
  public get id(): string {
    return this._id;
  }
  /**
   * Set the id of the GameObject
   *
   * @param value The id of the GameObject
   */
  public set id(value: string) {
    this._id = value;
  }

  /**
   * Get the Transform of this GameObject
   *
   * @returns The Transform of this GameObject
   */
  public get transform(): Transform {
    return this._transform;
  }
  /**
   * Set the Transform of this GameObject
   *
   * @param value The Transform of this GameObject
   */
  public set transform(value: Transform) {
    this._transform = value;
  }
}
