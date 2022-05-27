import Transform from '../ComponentsModule/Transform.js';

export default abstract class GameObject {
  // The Transform of the GameObject
  public _transform: Transform;

  /**
   * Create a new GameObject instance
   *
   * @param transform The Transform of the GameObject
   */
  public constructor(transform: Transform) {
    this.transform = transform;
  }

  /**
   * Get the Transform of this GameObject
   *
   * @returns The Transform of this GameObject
   */
  get transform(): Transform {
    return this._transform;
  }

  /**
   * Set the Transform of this GameObject
   *
   * @param transform The Transform of this GameObject
   */
  set transform(transform: Transform) {
    this._transform = transform;
  }
}
