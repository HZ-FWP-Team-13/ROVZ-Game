import GameItem from '../../engine/GameObjectModule/GameItem.js';
import Transform from '../../engine/ComponentsModule/Transform.js';
import Mesh from '../../engine/ComponentsModule/Mesh.js';
import Input from '../../engine/InputModule/Input.js';
import Vector2 from '../../engine/MathModule/Vector2.js';

export default class FovOverlay extends GameItem {
  // The speed of the FovOverlay rotation measured in degrees per second
  public rotationSpeed: number;

  /**
   * Create a new FovOverlay instance
   *
   * @param transform The Transform of the FovOverlay
   * @param mesh The Mesh of the FovOverlay
   */
  public constructor(transform: Transform, mesh: Mesh) {
    super(transform, mesh);

    this.rotationSpeed = 1;
  }

  /**
   * Rotate this FovOverlay in response to the Player Input
   *
   * @param input of the keys when moving
   */
  public control(input: Input): void {

    // Calculating a Vector2 from the Player towards the Cursor
    let toCursor = new Vector2(0, -1);
    if (input.mouse.mouseInAction) {
      toCursor = Vector2.vectorDifference(this.transform.position, input.mouse.mousePosition);
      toCursor.y *= -1;
    }

    // Calculating the slope of the mentioned vector
    const toCursorSlope = Math.atan(toCursor.x / toCursor.y) * (180 / Math.PI) + (toCursor.y > 0 ? 180 : 0);

    // Looking around TODO: Bind to fps
    this.transform.rotation = toCursorSlope;
  }
}
