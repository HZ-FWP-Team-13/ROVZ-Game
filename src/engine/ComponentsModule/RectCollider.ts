import Vector2 from '../MathModule/Vector2.js';
import Collider from './Collider.js';

export default class RectCollider extends Collider {
  /**
   * Create a new rectangular collider
   *
   * @param dimensions Dimensions of the collider (width, height)
   */
  public constructor(dimensions: Vector2) {
    super();

    const width = dimensions.getX();
    const height = dimensions.getY();
    this.addNewPoint(-width / 2, -height / 2);
    this.addNewPoint(width / 2, -height / 2);
    this.addNewPoint(width / 2, height / 2);
    this.addNewPoint(-width / 2, height / 2);
  }
}
