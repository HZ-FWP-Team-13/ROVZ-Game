import GamePawn from '../../engine/ObjectModule/GamePawn.js';
import Transform from '../../engine/ComponentsModule/Transform.js';
import Mesh from '../../engine/ComponentsModule/Mesh.js';
import Collider from '../../engine/ComponentsModule/Collider.js';
import Vector2 from '../../engine/MathModule/Vector2.js';

export default class Car extends GamePawn {
  public speed: number; // The current speed of the vehicle

  public speedRange: Vector2; // min and max speed of the vehicle

  public targetSpeed: number; // Target speed of the vehicle

  public acceleration: number; // Speed increase per second

  public rotationSpeed: number; // Rotation speed

  // Determines the steer direction of the car: left, straight ahead, or right.
  public rotationDirection: string; // LEFT, NONE, RIGHT

  // The rotation the Car underwent since the last Frame
  public lastFrameRotationDifference: number;

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

    this.getCollider().generateRectCollider(
      this.getMesh().getDimensions().getX(),
      this.getMesh().getDimensions().getY(),
    );
    // TODO: All of this should be able to be changed on a per-car basis.
    // TODO: Values are assigned for testing purposes, this should be changed later.
    this.speedRange = new Vector2(-50, 150);
    this.speed = 150;
    this.targetSpeed = 150;
    this.acceleration = 20;
    this.rotationSpeed = 100;
    this.rotationDirection = 'LEFT';
  }

  /**
  * Updates this object every step // TODO: DESCRIBE THIS BETTER
  * @param elapsed the time in seconds that has been elapsed since the previous frame
  */
  public update(elapsed: number): void {
    let steering = 0;

    if (this.rotationDirection === 'LEFT') {
      steering = -1;
    } else if (this.rotationDirection === 'RIGHT') {
      steering = 1;
    }

    // Vertical movement
    this.getTransform().translate(new Vector2(0, this.speed * elapsed));

    // Steering
    this.lastFrameRotationDifference = steering * this.rotationSpeed * elapsed;
    this.getTransform().rotate(this.lastFrameRotationDifference);
  }

  // TODO: ACCESSORS
  // TODO: INTERACTION WITH TRIGGERS
}
