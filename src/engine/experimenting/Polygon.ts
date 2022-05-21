import GameItem from "../GameItem.js";
import Vector2 from "./Vector2.js";
import KeyListener from "../KeyListener.js";
import Input from "../Input.js";

/*===========================================================================================
|| NOTE: THIS CLASS WAS MADE AS AN EXPERIMENT, I WILL REFACTOR IT AS "Collider" ON MONDAY  ||
===========================================================================================*/


export default class Polygon extends GameItem {

  private points: Vector2[]; // Contains the original points of the collider, defining it's "shape" for the purposes of drawing

  private updatedPoints: Vector2[]; // Contains the updated points of the mesh collider, i.e. the points when the collider is moved / rotated.

  // When you 'attach' a Collider to a GameItem, you can define the points in the constructor.
  // Since we pretty much exclusively use squares and rectangles, perhaps we can just take the frame height and width of the Mesh attached to the GameItem,
  // alongside the transforms of the GameItem, to define these points via a method of some kind.

  // Right now, the Polygon extends GameItem. The final, refactored Collider obviously won't.
  // This is done merely to provide visual feedback for testing purposes.

  previousFrameRotation: number;
  public overlap: boolean;
  private input: Input;

  public constructor(xPos: number, yPos: number, rot: number) {
    super('', xPos, yPos, rot, 50, 50, 0);
    this.points = [];
    this.updatedPoints = [];

    this.overlap = false;
    this.input = new Input();
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.transform.position.x, this.transform.position.y);
    ctx.rotate(this.transform.getRotationInRadians());
    ctx.beginPath();


    // Polygons will be red when overlapping and blue when they are not.
    if (this.overlap) {
      ctx.fillStyle = 'red';
    } else {
      ctx.fillStyle = 'black'
    }


    // Draw the polygon
    this.points.forEach(point => {
      ctx.lineTo(point.x, point.y);
    });
    ctx.fill();
    ctx.closePath();

    // Draw a line from the center to the first point to visualize rotation
    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.moveTo(0, 0);
    ctx.lineTo(this.points[0].x, this.points[0].y);
    ctx.lineWidth = 6;
    ctx.stroke();
    ctx.closePath();

    ctx.restore();

    this.updatedPoints.forEach(point => {
      ctx.fillStyle = 'blue';
      ctx.fillRect(point.x, point.y, 20, 20);
    });
  }

  /**
 * Move this Polygon across the Game Canvas in response to player Input
 *
 */
  public control(): void {
    this.input.readVerticalInput();
    // Traction
    if (this.input.getVerticalAxis() != 0) {
      this.transform.moveRelative(0, this.input.getVerticalAxis() * 4);
    }
    // Steering
    this.transform.rotate(
      this.previousFrameRotation =
      this.input.readHorizontalInput() * 4 * this.input.getVerticalAxis(),
    );

    console.log(this.transform.position);
  }

  public updatePoints() {
    for (let i = 0; i < this.points.length; i++) {
      console.log(this.transform.orientation);
      this.updatedPoints[i].x = (this.points[i].x*Math.cos(this.transform.getRotationInRadians())) - (this.points[i].y * Math.sin(this.transform.getRotationInRadians())) + this.transform.position.x;
      this.updatedPoints[i].y = (this.points[i].x*Math.sin(this.transform.getRotationInRadians())) + (this.points[i].y * Math.cos(this.transform.getRotationInRadians())) + this.transform.position.y;
    }
  }

  public update() {
    this.updatePoints();
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

  public static shapeOverlap_SAT(poly1: Polygon, poly2: Polygon) {

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
        for (let p = 0; p < p1.updatedPoints.length; p++) {
          let dot = Vector2.dotProduct(p2.updatedPoints[p], axisProj);
          min_p2 = Math.min(min_p2, dot);
          max_p2 = Math.max(max_p2, dot);

        }

        if(!(max_p2 >= min_p1 && max_p1 >= min_p2)) {
          p1.overlap = false;
          return false;
        }
      }
    }
    p1.overlap = true;
    // console.log(true);
    return true;
  }
}
