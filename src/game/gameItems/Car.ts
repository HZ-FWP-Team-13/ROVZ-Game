import Vector2 from '../../engine/MathModule/Vector2.js';
import Path from '../../engine/AIModule/Path.js';
import Mathematics from '../../engine/MathModule/Mathematics.js';
import PathedEntity from './PathedEntity.js';

export default class Car extends PathedEntity {
  /**
   * Create a new Player instance //TODO SOME OF THIS STUFF HAS BECOME OBSOLETE
   *
   * @param id The id of the GameObject
   * @param path path to follow
   * @param startPoint starting point on the path
   * @param skin Skin of the car
   */
  public constructor(
    id: string,
    path: Path,
    startPoint: number,
    skin: string,
  ) {
    // Source Image Path
    let sip = '';
    switch (skin) {
      case 'RED':
        sip = 'assets/img/cars/car_red.png';
        break;
      case 'BLUE':
        sip = 'assets/img/cars/car_blue.png';
        break;
      case 'GREEN':
        sip = 'assets/img/cars/car_green.png';
        break;
      default:
        sip = 'assets/img/cars/car_red.png';
        break;
    }

    const speed = 500;
    const wh = new Vector2(64, 128);
    // TODO: Image loading is laggy sometimes and results in nothing being rendered.
    // We should wait for all images to load prior to rendering.

    super(id, path, startPoint, speed, sip, wh);
  }

  /**
   * Update the car
   *
   * @param elapsed Time elapsed since last call
   */
  public update(elapsed: number): void {
    const points = this.path.getPoints();

    const i = this.lastPassedPointIndex;
    const j = (i + 1) % points.length;

    const a = points[i];
    const b = points[(j) % points.length];

    const ab = Vector2.magnitude(Vector2.vectorDifference(b, a));
    const c = Vector2.magnitude(Vector2.vectorDifference(this.getTransform().getPosition(), a));

    if (c >= ab) {
      const k = (j + 1) % points.length;
      this.getTransform().setPosition(b);
      // Set the rotation of the car to align with the edge between this point and the next

      // First, get the vector of the edge between this point and the next
      const u = new Vector2(points[k].getX() - points[j].getX(),
        points[k].getY() - points[j].getY());

      // Next, create a vector that goes up (or is it down???)
      const v = new Vector2(0, -1);

      let angle = Mathematics.degrees(Math.acos(Vector2.dotProduct(u, v)
        / (Vector2.magnitude(u) * Vector2.magnitude(v))));

      if (Vector2.crossProduct(u, v) > 0) {
        angle = 360 - angle;
      }

      this.getTransform().setRotation((angle));

      this.lastPassedPointIndex = j;
    }
    this.getTransform().translate(new Vector2(0, (this.speed * elapsed)));

    if (this.lastPassedPointIndex === this.path.getLastPointIndex()) {
      this.getTransform().setPosition(points[0]);
    }

    console.log(this.lastPassedPointIndex);
  }
}
