import GameItem from '../../engine/CoreModule/GameItem.js';
import Transform from '../../engine/ComponentsModule/Transform.js';
import Mesh from '../../engine/ComponentsModule/Mesh.js';
import Input from '../../engine/InputModule/Input.js';
import Vector2 from '../../engine/MathModule/Vector2.js';
import Mathematics from '../../engine/MathModule/Mathematics.js';

export default class FovOverlay extends GameItem {
  // The Mesh of the GameItem
  private _mesh: Mesh;

  // The speed of the FovOverlay rotation measured in degrees per second
  public rotationSpeed: number;

  /**
   * Create a new FovOverlay instance
   *
   * @param id The id of the GameObject
   * @param transform The Transform of the FovOverlay
   * @param mesh The Mesh of the FovOverlay
   */
  public constructor(id: string, transform: Transform, mesh: Mesh) {
    super(id, transform);
    this.mesh = mesh;

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
    const toCursorSlope = Mathematics.degrees(Math.atan(toCursor.x / toCursor.y)) + (toCursor.y > 0 ? 180 : 0);

    // Looking around TODO: Bind to fps
    this.transform.rotation = toCursorSlope;
  }

  /**
   * Get the Mesh of this FovOverlay
   *
   * @returns The Mesh of this FovOverlay
   */
  get mesh(): Mesh {
    return this._mesh;
  }

  /**
   * Set the Mesh of this FovOverlay
   *
   * @param mesh The Mesh of this FovOverlay
   */
  set mesh(mesh: Mesh) {
    this._mesh = mesh;
  }
}
