import GameItem from './GameItem.js';
import Input from './Input.js';

export default class Player extends GameItem {
  // Input to read the Player controls
  private input: Input;

  // The speed of the Player character movement measured in pixels per second
  private movementSpeed: number;

  // The speed of the Player character rotation measured in degrees per second
  private rotationSpeed: number;

  private previousFrameRotation: number;

  /**
   * Create a new Player instance
   *
   * @param imgSourcePath The path to the source image of the Player appearance
   *
   * @param xPos The X coordinate of the Player on the game canvas
   * @param yPos The Y coordinate of the Player on the game canvas
   *
   * @param rotation The rotation of the Player measured in degrees
   *
   * @param frameWidth The width of the Player appearance
   * @param frameHeight The height of the Player appearance
   *
   * @param colliderWidth The width of the Player collider
   * @param colliderHeight The height of the Player collider
   *
   * @param animationState The current state of the Player animation cycle
   */
  public constructor(
    imgSourcePath: string,
    xPos: number, yPos: number,
    rotation: number,
    frameWidth: number, frameHeight: number,
    colliderWidth: number = frameWidth, colliderHeight: number = frameHeight,
    animationState: number = 0,
  ) {
    super(
      imgSourcePath,
      xPos, yPos,
      rotation,
      frameWidth,
      frameHeight, colliderWidth,
      colliderHeight, animationState,
    );

    this.input = new Input();
    this.movementSpeed = 1;
    this.rotationSpeed = 1;
  }

  /**
   * Move this Player across the Game Canvas in response to the Player Input
   */
  public control(): void {
    this.input.readVerticalInput();
    // Traction
    if (this.input.getVerticalAxis() != 0) {
      this.moveRelative(0, this.input.getVerticalAxis() * this.movementSpeed);
    }
    // Steering
    this.rotate(
      this.previousFrameRotation =
      this.input.readHorizontalInput() * this.rotationSpeed * this.input.getVerticalAxis());
  }

  public getPreviousFrameRotation(): number {
    return this.previousFrameRotation;
  }
}
