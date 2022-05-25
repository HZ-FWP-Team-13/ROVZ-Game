import Vector2 from '../../engine/experimenting/Vector2.js';
import GameItem from '../../engine/GameItem.js';
import Input from '../../engine/InputModule/Input.js';

export default class FovOverlay extends GameItem {
  // The speed of the FovOverlay rotation measured in degrees per second
  private rotationSpeed: number;

  /**
   * Create a new FovOverlay instance
   *
   * @param imgSourcePath The path to the Source Image of the FovOverlay appearance
   *
   * @param xPos The X coordinate of the FovOverlay on the game canvas
   * @param yPos The Y coordinate of the FovOverlay on the game canvas
   *
   * @param rotation The rotation of the FovOverlay measured in degrees
   *
   * @param frameWidth The width of the FovOverlay appearance
   * @param frameHeight The height of the FovOverlay appearance
   */
  public constructor(
    imgSourcePath: string,
    xPos: number, yPos: number,
    rotation: number,
    frameWidth: number, frameHeight: number,
  ) {
    super(
      imgSourcePath,
      xPos, yPos,
      rotation,
      frameWidth, frameHeight,
      0,
    );

    this.rotationSpeed = 1;
  }

  /**
   * Rotate this FovOverlay in response to the Player Input
   *
   * @param input of the keys when moving
   */
  public control(input: Input): void {

    let toCursor = new Vector2(0, -1);
    if (input.getMouseInAction()) {
      toCursor = Vector2.vectorDifference(this.getTransform().position, input.getMousePosition());
      toCursor.y *= -1;
    }

    const toCursorSlope = Math.atan(toCursor.x / toCursor.y) * (180 / Math.PI) + (toCursor.y > 0 ? 180 : 0);

    // Looking around TODO: Bind to fps
    this.transform.setRotation(toCursorSlope);
  }
}
