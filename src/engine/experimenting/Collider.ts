import Vector2 from "./Vector2.js";
import Input from "../Input.js";
import Transform from "./Transform.js";

/*===========================================================================================
|| NOTE: THIS CLASS WAS MADE AS AN EXPERIMENT, I WILL REFACTOR IT AS "Collider" ON MONDAY  ||
===========================================================================================*/


export default class Collider {

  private points: Vector2[]; // Contains the original points of the collider, defining it's "shape" for the purposes of drawing

  private updatedPoints: Vector2[]; // Contains the updated points of the mesh collider, i.e. the points when the collider is moved / rotated.

  // When you 'attach' a Collider to a GameItem, you can define the points in the constructor.
  // Since we pretty much exclusively use squares and rectangles, perhaps we can just take the frame height and width of the Mesh attached to the GameItem,
  // alongside the transforms of the GameItem, to define these points via a method of some kind.

  // Right now, the Polygon extends GameItem. The final, refactored Collider obviously won't.
  // This is done merely to provide visual feedback for testing purposes.

  previousFrameRotation: number;
  public overlap: boolean;

  public constructor() {

    this.points = [];
    this.updatedPoints = [];

    this.overlap = false;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    this.updatedPoints.forEach(point => {
      ctx.fillStyle = 'blue';
      ctx.fillRect(point.x - 4, point.y + 4, 8, 8);
    });
  }

  /**
   * Update the positions of the points in World space (Absolute).
   */
  public updatePoints(transform: Transform) {
    for (let i = 0; i < this.points.length; i++) {
      this.updatedPoints[i].x = (this.points[i].x * Math.cos(transform.getRotationInRadians())) - (this.points[i].y * Math.sin(transform.getRotationInRadians())) + transform.position.x;
      this.updatedPoints[i].y = (this.points[i].x * Math.sin(transform.getRotationInRadians())) + (this.points[i].y * Math.cos(transform.getRotationInRadians())) + transform.position.y;
    }
  }

  /**
   * Add a new vertex to the polygon
   * @param x X position of the vertex
   * @param y Y position of the vertex
   */
  public addNewPoint(x: number, y: number): void {
    this.points.push(new Vector2(x, y));

    // TODO: This part here will probably break when adding points after moving the Polygon.
    this.updatedPoints.push(new Vector2(x, y));
  }

  public static shapeOverlap_SAT(poly1: Collider, poly2: Collider) {
    let p1 = poly1;
    let p2 = poly2;

    for (let shape = 0; shape < 2; shape++) {

      // Once the test has been performed using the axes of the first shape, perform the test using the axes of the second shape.
      if (shape == 1) {
        p1 = poly2;
        p2 = poly1;
      }

      for (let a = 0; a < p1.updatedPoints.length; a++) {

        // Obtain the 'next' point
        let b = (a + 1) % p1.updatedPoints.length;

        // Obtain edge normals
        let axisProj = new Vector2(-(p1.updatedPoints[b].y - p1.updatedPoints[a].y), p1.updatedPoints[b].x - p1.updatedPoints[a].x);

        // Work out min and max 1D points of p1
        let min_p1 = Infinity;
        let max_p1 = -Infinity;

        // Iterate through all the points of p1
        for (let p = 0; p < p1.updatedPoints.length; p++) {
          let dot = Vector2.dotProduct(p1.updatedPoints[p], axisProj);
          min_p1 = Math.min(min_p1, dot);
          max_p1 = Math.max(max_p1, dot);
        }

        // Work out min and max 1D points of p2
        let min_p2 = Infinity;
        let max_p2 = -Infinity;

        // Iterate through all the points of p2
        for (let p = 0; p < p2.updatedPoints.length; p++) {
          let dot = Vector2.dotProduct(p2.updatedPoints[p], axisProj);
          min_p2 = Math.min(min_p2, dot);
          max_p2 = Math.max(max_p2, dot);

        }

        if (!(max_p2 >= min_p1 && max_p1 >= min_p2)) {
          p1.overlap = false;
          return false;
        }
      }
    }
    p1.overlap = true;
    // console.log(true);
    return true;
  }

  public clearPoints(): void {
    this.points = [];
    this.updatedPoints = [];
  }

  public generateRectCollider(width: number, height: number) : void {
    this.clearPoints();

    this.addNewPoint(-width / 2, -height / 2);
    this.addNewPoint(width / 2, -height / 2);
    this.addNewPoint(width / 2, height / 2);
    this.addNewPoint(-width / 2, height / 2);
  }
}
