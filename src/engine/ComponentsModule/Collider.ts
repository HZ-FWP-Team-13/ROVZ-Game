import Component from '../CoreModule/Component.js';
import Camera from '../GraphicsModule/Camera.js';
import Mathematics from '../MathModule/Mathematics.js';
import Vector2 from '../MathModule/Vector2.js';
import Transform from './Transform.js';
import GamePawn from '../ObjectModule/GamePawn.js';

export default class Collider extends Component {
  // Contains the original points of the collider, defining it's "shape" of the collider.
  // These points are relative to the origin of the Game Item.
  private points: Vector2[];

  // Contains the updated points of the mesh collider,
  // i.e. the points when the collider is moved / rotated.
  private updatedPoints: Vector2[];

  private previousFrameRotation: number;

  public overlap: boolean;

  /**
   * Create a new Collider instance
   */
  public constructor() {
    super('collider');
    this.points = [];
    this.updatedPoints = [];

    this.overlap = false;
  }

  /**
   * Draw this Collider vertices on the Game Canvas for debugging
   *
   * @param ctx
   * @param camera
   */
  public draw(ctx: CanvasRenderingContext2D, camera: Camera): void {
    const vertSize = 8;
    const cameraPosition = camera.getTransform().getPosition();
    const cameraDimensions = camera.getFrameDimensions();

    // Probably not the right term for this and
    // whether to use a positive or negative cameraPosition for this variable.
    const normalizedCameraX = -cameraPosition.getX() + cameraDimensions.getX() / 2;
    const normalizedCameraY = -cameraPosition.getY() + cameraDimensions.getY() / 2;

    this.updatedPoints.forEach((point) => {
      ctx.fillStyle = 'blue';
      ctx.fillRect(
        point.getX() - vertSize / 2 + normalizedCameraX,
        point.getY() - vertSize / 2 + normalizedCameraY,
        vertSize, vertSize,
      );
    });

    // Draw a line from point to point
    ctx.strokeStyle = 'red';
    ctx.beginPath();
    for (let i = 0; i < this.updatedPoints.length; i++) {
      ctx.lineTo(
        this.updatedPoints[i].getX() + normalizedCameraX,
        this.updatedPoints[i].getY() + normalizedCameraY,
      );
    }
    ctx.lineTo(
      this.updatedPoints[0].getX() + normalizedCameraX,
      this.updatedPoints[0].getY() + normalizedCameraY,
    );
    ctx.stroke();
    ctx.closePath();

    console.log('DRAW');
  }

  /**
   * Update the positions of the points in the World (Absolute) space.
   *
   *
   * @param transform Transform to update 'around'
   */
  public updatePoints(transform: Transform) : void {
    for (let i = 0; i < this.points.length; i++) {
      const transformRotation = -Mathematics.radians(transform.getRotation());

      let newX = (this.points[i].getX() * Math.cos(transformRotation));
      newX -= this.points[i].getY() * Math.sin(transformRotation) + transform.getPosition().getX();

      let newY = (this.points[i].getX() * Math.sin(transformRotation));
      newY += this.points[i].getY() * Math.cos(transformRotation) + transform.getPosition().getY();

      this.updatedPoints[i].setX(-newX);

      this.updatedPoints[i].setY(newY);
    }
  }

  /**
   * Add a new vertex to the polygon
   *
   * @param x X position of the vertex
   * @param y Y position of the vertex
   */
  public addNewPoint(x: number, y: number): void {
    this.points.push(new Vector2(x, y));

    // TODO: This part here will probably break when adding points after moving the Polygon.
    this.updatedPoints.push(new Vector2(x, y));
  }

  /**
   * Check for collision between two colliders using SAT (Seperating Axis Theorem)
   *
   * @param gi1 The first GameItem
   * @param gi2 The other GameItem
   * @returns boolean
   */
  public static checkCollision(
    gi1: GamePawn,
    gi2: GamePawn,
  ): boolean {
    let c1 = gi1.getCollider();

    let c2 = gi2.getCollider();

    // TODO: perhaps find/create a static function that allows to use the Pythagorean theorem
    // (something like: Math.pythAC(AB, BC))
    // Also, it might be a good idea to make the distance check a seperate

    // Before performing SAT calculations,
    // we will first check if the colliders are anywhere near one another.
    // First, find the 'radii' for both Colliders

    // Radius for collider 1

    let r1 = -Infinity;

    for (let i = 0; i < c1.points.length; i++) {
      const r = Math.sqrt((c1.points[i].getX() ** 2) + (c1.points[i].getY() ** 2));
      r1 = Math.max(r1, r);
    }

    // Radius of collider 2

    let r2 = -Infinity;

    for (let i = 0; i < c2.points.length; i++) {
      const r = Math.sqrt((c2.points[i].getX() ** 2) + (c2.points[i].getX() ** 2));
      r2 = Math.max(r2, r);
    }

    // Next, find the distance between the position of the GameItems
    const d = Math.sqrt(
      ((gi2.getTransform().getPosition().getX() - gi1.getTransform().getPosition().getX()) ** 2)
       + ((gi2.getTransform().getPosition().getX() - gi1.getTransform().getPosition().getX() ** 2)),
    );

    // If the distance between the centers is larger than their radii combined,
    // they are not close enough to collide.
    if (d > r1 + r2) {
      return false;
    }

    // If the the distance is smaller than the radii combined, proceed to SAT

    for (let shape = 0; shape < 2; shape++) {
      // Once the test has been performed using the axes of the first shape,
      // perform the test using the axes of the second shape.
      if (shape === 1) {
        c1 = gi2.getCollider();

        c2 = gi1.getCollider();
      }

      for (let a = 0; a < c1.updatedPoints.length; a++) {
        // Obtain the 'next' point
        const b = (a + 1) % c1.updatedPoints.length;

        // Obtain edge normals
        const axisProj = new Vector2(
          -(c1.updatedPoints[b].getY() - c1.updatedPoints[a].getY()),
          c1.updatedPoints[b].getX() - c1.updatedPoints[a].getX(),
        );

        // Work out min and max 1D points of p1
        let minP1 = Infinity;
        let maxP1 = -Infinity;

        // Iterate through all the points of p1
        for (let p = 0; p < c1.updatedPoints.length; p++) {
          const dot = Vector2.dotProduct(c1.updatedPoints[p], axisProj);
          minP1 = Math.min(minP1, dot);
          maxP1 = Math.max(maxP1, dot);
        }

        // Work out min and max 1D points of p2
        let minC2 = Infinity;
        let maxC2 = -Infinity;

        // Iterate through all the points of p2
        for (let p = 0; p < c2.updatedPoints.length; p++) {
          const dot = Vector2.dotProduct(c2.updatedPoints[p], axisProj);
          minC2 = Math.min(minC2, dot);
          maxC2 = Math.max(maxC2, dot);
        }

        if (!(maxC2 >= minP1 && maxP1 >= minC2)) {
          c1.overlap = false;
          return false;
        }
      }
    }
    c1.overlap = true;
    console.log(true);
    return true;
  }

  /**
   * Clears all points from the Collider
   */
  public clearPoints(): void {
    this.points = [];
    this.updatedPoints = [];
  }

  /**
   * Clears the points and generates a rectangular collider based on width and height
   *
   * @param width The width of the collider
   * @param height The height of the collider
   */
  public generateRectCollider(width: number, height: number) : void {
    this.clearPoints();

    this.addNewPoint(-width / 2, -height / 2);
    this.addNewPoint(width / 2, -height / 2);
    this.addNewPoint(width / 2, height / 2);
    this.addNewPoint(-width / 2, height / 2);
  }

  /**
   * Get the array of updated Collider points
   *
   * @returns
   */
  public getUpdatedPoints(): Vector2[] {
    return this.updatedPoints;
  }

  /**
   * Set the array of updated Collider points
   *
   * @param value
   */
  public setUpdatedPoints(value: Vector2[]): void {
    this.updatedPoints = value;
  }
}
