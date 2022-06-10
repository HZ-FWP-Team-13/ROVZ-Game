import Collider from '../../engine/ComponentsModule/Collider.js';
import Mesh from '../../engine/ComponentsModule/Mesh.js';
import Transform from '../../engine/ComponentsModule/Transform.js';
import Input from '../../engine/InputModule/Input.js';
import Vector2 from '../../engine/MathModule/Vector2.js';
import GamePawn from '../../engine/ObjectModule/GamePawn.js';

export default class PlayerHitbox extends GamePawn {
  // The speed of the Player movement measured in pixels per second
  public movementSpeed: number;

  // The speed of the Player rotation measured in degrees per second
  public rotationSpeed: number;

  // The rotation the Player underwent since the last Frame
  public lastFrameRotationDifference: number;

  /**
   * We create an instance of a hitbox for the player to detect collision with other
   * GameItems in advance. This is useful for calculating when to stop in front of a building, etc
   *
   * @param id The ID of the Item being used
   * @param transform The position of the object
   * @param mesh The Image/rendering of the object
   * @param collider The collider of the object
   */
  public constructor(id: string, transform: Transform, mesh: Mesh, collider: Collider) {
    super(id, transform, mesh, collider);

    this.createColliderPoints();

    this.movementSpeed = 150;
    this.rotationSpeed = 100;
  }

  /**
   * Move this PlayerHitbox across the Game Canvas in response to the Player Input
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
}
