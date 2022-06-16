import GamePawn from '../../engine/ObjectModule/GamePawn.js';
import Transform from '../../engine/ComponentsModule/Transform.js';
import Mesh from '../../engine/ComponentsModule/Mesh.js';
import Collider from '../../engine/ComponentsModule/Collider.js';
import Input from '../../engine/InputModule/Input.js';
import Vector2 from '../../engine/MathModule/Vector2.js';

export default class Player extends GamePawn {
  // The speed of the Player movement measured in pixels per second
  private movementSpeed: number;

  // The speed of the Player rotation measured in degrees per second
  public rotationSpeed: number;

  // The rotation the Player underwent since the last Frame
  public lastFrameRotationDifference: number;

  // We use this hitbox to determine movement against collidable objects
  private hitbox: Player;

  /**
   * Create a new Player instance
   *
   * @param id The id of the GameObject
   * @param transform The Transform of the GameObject
   * @param mesh The Mesh of the GameItem
   * @param collider The Collider of the GamePawn
   */
  public constructor(id: string, transform: Transform, mesh: Mesh, collider: Collider) {
    super(id, transform, mesh, collider);

    this.createColliderPoints();

    this.movementSpeed = 150;
    this.rotationSpeed = 100;
  }

  /**
   * Move this Player across the Game Canvas in response to the Player Input
   *
   * @param input The Input matrix of this Level
   * @param elapsed The time in seconds that has been elapsed since the previous frame
   */
  public control(input: Input, elapsed: number): void {
    // Read the Input of the Vertical InputAxis
    const traction = input.readAxisPressed('verticalMovement');
    // Read the Input of the Horizontal InputAxis
    const steering = input.readAxisPressed('horizontalMovement');

    // Traction
    if (traction !== 0) {
      // TODO: this.transform.translate(Vector2.up * traction * this.movementSpeed * elapsed);
      this.getTransform().translate(new Vector2(0, traction * this.movementSpeed * elapsed));
    }

    // Steering
    this.lastFrameRotationDifference = steering * this.rotationSpeed * elapsed * traction;
    this.getTransform().rotate(this.lastFrameRotationDifference);
  }

  /**
   * Setter to set the movement speed to a new parameter
   *
   * @param speed The movement speed that needs to be set
   */
  public setSpeed(speed: number): void {
    this.movementSpeed = speed;
  }

  /**
   * getter for hitbox of the player.
   *
   * @returns the hitbox of the player
   */
  public getHitbox(): Player {
    return this.hitbox;
  }

  /**
   * Setter to set the movement speed to a new parameter
   *
   * @param player The movement speed that needs to be set
   */
  public setHitbox(player: Player): void {
    this.hitbox = player;
    this.hitbox.createColliderPoints();
  }
}
