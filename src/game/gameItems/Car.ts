import GamePawn from '../../engine/ObjectModule/GamePawn.js';
import Transform from '../../engine/ComponentsModule/Transform.js';
import Mesh from '../../engine/ComponentsModule/Mesh.js';
import Collider from '../../engine/ComponentsModule/Collider.js';
import Vector2 from '../../engine/MathModule/Vector2.js';
import Path from '../../engine/AIModule/Path.js';
import Mathematics from '../../engine/MathModule/Mathematics.js';
import RectCollider from '../../engine/ComponentsModule/RectCollider.js';

export default class Car extends GamePawn {
  public speed: number; // The current speed of the vehicle

  public speedRange: Vector2; // min and max speed of the vehicle

  public targetSpeed: number; // Target speed of the vehicle

  public acceleration: number; // Speed increase per second

  public path: Path; // Path the car follows

  /**
   * Create a new Player instance //TODO SOME OF THIS STUFF HAS BECOME OBSOLETE
   *
   * @param id The id of the GameObject
   * @param path path to follow
   * @param startPoint starting point on the path
   * @param mesh The Mesh of the GameItem
   * @param collider The Collider of the GamePawn
   */
  public constructor(
    id: string,
    path: Path,
    startPoint: number,
    mesh: Mesh,
    collider: RectCollider,
  ) {
    const transform = new Transform(path.getPoints()[startPoint], 0, new Vector2(1, 1));
    super(id, transform, mesh, collider);

    this.path = path;

    // TODO: All of this should be able to be changed on a per-car basis.
    // TODO: Values are assigned for testing purposes, this should be changed later.
    this.speedRange = new Vector2(-50, 150);
    this.speed = 300;
    this.targetSpeed = 150;
    this.acceleration = 20;
  }

  /**
   * Update the car
   *
   * @param elapsed Time elapsed since last call
   */
  public update(elapsed: number) : void {
    this.getCollider().updatePoints(this.getTransform());
    const points = this.path.getPoints();
    for (let i = 0; i < points.length; i++) {
      const tx = this.getTransform().getPosition().getX();
      const ty = this.getTransform().getPosition().getY();
      const px = points[i].getX();
      const py = points[i].getY();

      if (
        (tx >= px - 5 && tx <= px + 5) && (ty <= py + 5 && ty >= py - 5)
      ) {
        const b = (i + 1) % points.length;
        // Set the rotation of the car to align with the edge between this point and the next

        // First, get the vector of the edge between this point and the next
        const u = new Vector2(points[b].getX() - points[i].getX(),
          points[b].getY() - points[i].getY());

        // Next, create a vector that goes up (or is it down???)
        const v = new Vector2(0, -1);

        let angle = Mathematics.degrees(Math.acos(Vector2.dotProduct(u, v)
        / (Vector2.magnitude(u) * Vector2.magnitude(v))));

        if (Vector2.crossProduct(u, v) > 0) {
          angle = 360 - angle;
        }

        this.getTransform().setRotation((angle));
      }
    }

    this.getTransform().translate(new Vector2(0, (this.speed * elapsed)));
  }

  // TODO: ACCESSORS
}