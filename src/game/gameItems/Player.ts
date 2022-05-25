import GameItem from '../../engine/GameItem.js';
import Input from '../../engine/InputModule/Input.js';

export default class Player extends GameItem {
  // The speed of the Player Character movement measured in pixels per second
  private movementSpeed: number;

  // The speed of the Player Character rotation measured in degrees per second
  private rotationSpeed: number;

  // The rotation the Player Character underwent since the last Frame
  private previousFrameRotation: number;

  /**
   * Create a new Player Character instance
   *
   * @param imgSourcePath The path to the Source Image of the Player Character appearance
   *
   * @param xPos The X coordinate of the Player Character on the game canvas
   * @param yPos The Y coordinate of the Player Character on the game canvas
   *
   * @param rotation The rotation of the Player Character measured in degrees
   *
   * @param frameWidth The width of the Player Character appearance
   * @param frameHeight The height of the Player Character appearance
   *
   * @param animationState The current state of the Player Character animation cycle
   */
  public constructor(
    imgSourcePath: string,
    xPos: number, yPos: number,
    rotation: number,
    frameWidth: number, frameHeight: number,
    animationState: number = 0,
  ) {
    super(
      imgSourcePath,
      xPos, yPos,
      rotation,
      frameWidth,
      frameHeight,
      animationState,
    );

    this.movementSpeed = 1;
    this.rotationSpeed = 1;
  }

  /**
   * Move this Player Character across the Game Canvas in response to the Player Input
   *
   * @param input of the keys when moving
   */
  public control(input: Input): void {
    // Read the Input of the Vertical InputAxis
    const traction = input.readAxisPressed('verticalMovement');
    // Read the Input of the Horizontal InputAxis
    const steering = input.readAxisPressed('horizontalMovement');

    // Traction TODO: Bind to fps
    if (traction != 0) {
      this.transform.moveRelative(0, traction * this.movementSpeed);
    }
    // Steering TODO: Bind to fps
    this.transform.rotate(this.previousFrameRotation = steering * this.rotationSpeed * traction);
  }

  /**
   * Get the rotation this Player Character underwent since the last Frame
   *
   * @returns The rotation this Player Character underwent since the last Frame
   */
  public getPreviousFrameRotation(): number {
    return this.previousFrameRotation;
  }
}
