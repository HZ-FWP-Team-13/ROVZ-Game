import GameItem from '../../engine/ObjectModule/GameItem.js';
import Transform from '../../engine/ComponentsModule/Transform.js';
import Mesh from '../../engine/ComponentsModule/Mesh.js';
import Input from '../../engine/InputModule/Input.js';
import Camera from '../../engine/GraphicsModule/Camera.js';
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
   * @param input The Input matrix of this Level
   * @param elapsed The time in seconds that has been elapsed since the previous frame
   * @param camera The Camera of this Level
   */
  public control(input: Input, elapsed: number, camera: Camera): void {
    // Calculating a Vector2 from the Player towards the Cursor
    let toCursor = new Vector2(0, -1);
    if (input.getMouse().getMouseInAction()) {
      toCursor = Vector2.vectorsSum(
        input.getMouse().getMousePosition(),
        camera.getTransform().getPosition(),
      );

      toCursor = Vector2.vectorDifference(
        toCursor,
        new Vector2(
          camera.getFrameDimensions().getX() / 2, camera.getFrameDimensions().getY() / 2,
        ),
      );
      toCursor = Vector2.vectorDifference(this.getTransform().getPosition(), toCursor);
      toCursor.setY(toCursor.getY() * -1);
    }

    // Calculating the slope of the mentioned vector
    let toCursorSlope = Mathematics.degrees(Math.atan(toCursor.getX() / toCursor.getY()));
    toCursorSlope += (toCursor.getY() > 0 ? 180 : 0);

    // Looking around TODO: Bind to fps
    this.getTransform().setRotation(toCursorSlope);
  }
}
