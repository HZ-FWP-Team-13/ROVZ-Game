import GameItem from '../../engine/ObjectModule/GameItem.js';
import Transform from '../../engine/ComponentsModule/Transform.js';
import Mesh from '../../engine/ComponentsModule/Mesh.js';
import Input from '../../engine/InputModule/Input.js';
import Vector2 from '../../engine/MathModule/Vector2.js';
import Mathematics from '../../engine/MathModule/Mathematics.js';

export default class FovOverlay extends GameItem {
  // The speed of the FovOverlay rotation measured in degrees per second
  public rotationSpeed: number;

  /**
   * Create a new FovOverlay instance
   *
   * @param id The id of the GameObject
   * @param transform The Transform of the GameItem
   * @param mesh The Mesh of the GameItem
   */
  public constructor(id: string, transform: Transform, mesh: Mesh) {
    super(id, transform, mesh);

    this.rotationSpeed = 1;
  }

  /**
   * Rotate this FovOverlay in response to the Player Input
   *
   * @param input of the keys when moving
   * @param elapsed the time in seconds that has been elapsed since the previous frame
   */
  public control(input: Input, elapsed: number): void {

    // Calculating a Vector2 from the Player towards the Cursor
    let toCursor = new Vector2(0, -1);
    if (input.mouse.mouseInAction) {
      toCursor = Vector2.vectorDifference(this.transform.position, input.mouse.mousePosition);
      toCursor.y *= -1;
    }

    // Calculating the slope of the mentioned vector
    const toCursorSlope = Mathematics.degrees(Math.atan(toCursor.x / toCursor.y)) + (toCursor.y > 0 ? 180 : 0);

    // Looking around TODO: Bind to fps
    this.transform.rotation = toCursorSlope;
  }
}
