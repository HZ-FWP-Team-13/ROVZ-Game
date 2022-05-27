import GameItem from '../../engine/CoreModule/GameItem.js';
import Transform from '../../engine/ComponentsModule/Transform.js';
import Mesh from '../../engine/ComponentsModule/Mesh.js';
import Input from '../../engine/InputModule/Input.js';
import Vector2 from '../../engine/MathModule/Vector2.js';

export default class Player extends GameItem {
  // The speed of the Player movement measured in pixels per second
  public movementSpeed: number;

  // The speed of the Player rotation measured in degrees per second
  public rotationSpeed: number;

  // The rotation the Player underwent since the last Frame
  public lastFrameRotationDifference: number;

  /**
   * Create a new Player instance
   *
   * @param transform The Transform of the Player
   * @param mesh The Mesh of the Player
   */
   public constructor(transform: Transform, mesh: Mesh) {
    super(transform, mesh);

    this.movementSpeed = 1;
    this.rotationSpeed = 1;
  }

  /**
   * Move this Player across the Game Canvas in response to the Player Input
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
      this.transform.translate(new Vector2(0, traction * this.movementSpeed)); // TODO: this.transform.translate(Vector2.up * traction * this.movementSpeed);
    }
    // Steering TODO: Bind to fps
    this.transform.rotate(this.lastFrameRotationDifference = steering * this.rotationSpeed * traction);
  }
}
