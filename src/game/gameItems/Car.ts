import GamePawn from '../../engine/ObjectModule/GamePawn.js';
import Transform from '../../engine/ComponentsModule/Transform.js';
import Mesh from '../../engine/ComponentsModule/Mesh.js';
import Collider from '../../engine/ComponentsModule/Collider.js';
import Vector2 from '../../engine/MathModule/Vector2.js';
import Path from '../../engine/AIModule/Path.js';
import Mathematics from '../../engine/MathModule/Mathematics.js';

export default class Car extends GamePawn {
  public speed: number; // The current speed of the vehicle

  public speedRange: Vector2; // min and max speed of the vehicle

  public targetSpeed: number; // Target speed of the vehicle

  public acceleration: number; // Speed increase per second

  public path: Path; // Path the car follows

  /**
   * Create a new Player instance
   *
   * @param id The id of the GameObject
   * @param transform The Transform of the GameObject
   * @param mesh The Mesh of the GameItem
   * @param collider The Collider of the GamePawn
   */
  public constructor(id: string, path: Path, startPoint: number, mesh: Mesh, collider: Collider) {
    const transform = new Transform(path.getPoints()[startPoint], 0, new Vector2(1, 1));
    super(id, transform, mesh, collider);

    this.path = path;

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
  }

  /* eslint-disable */

  /**
   *
   * @param elapsed
   */
  public update(elapsed: number) {

    let points = this.path.getPoints();
    for (let i = 0; i < points.length; i++) {
      if(this.getTransform().getPosition() === points[i]) {
        // Set the rotation of the car to align with the edge between this point and the next

        // First, get the vector of the edge between this point and the next
        let u = new Vector2(points[i+1].getX() - points[i].getX(), points[i+1].getY() - points[i].getY());

        // Next, create a vector from the current point going up
        let v = new Vector2(0, points[i+1].getY() - points[i].getY());

        let angle = Math.acos(Vector2.dotProduct(u, v) / (Vector2.magnitude(u) * Vector2.magnitude(v)))

        this.getTransform().setRotation(angle);
      }
    }

    this.getTransform().translate(new Vector2(0, 1));
  }


  // TODO: ACCESSORS
  // TODO: INTERACTION WITH TRIGGERS
}
