import GameItem from '../../engine/GameItem.js';
import Input from '../../engine/Input.js';

export default class FovOverlay extends GameItem {
  // Input to read the Player Controls
  private input: Input;

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
      frameWidth, frameHeight,
      0,
    );

    this.input = new Input();
    this.rotationSpeed = 1;
  }

  /**
   * Rotate this FovOverlay in response to the Player Input
   */
  public control(): void {
    // Looking around
    this.rotate(this.input.readRotationInput() * this.rotationSpeed);
  }
}
