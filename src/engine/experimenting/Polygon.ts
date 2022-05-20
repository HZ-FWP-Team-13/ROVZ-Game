import GameItem from "../GameItem.js";
import Transform from "./Transform";
import Vector2 from "./Vector2.js";
import KeyListener from "../KeyListener.js";

export default class Polygon extends GameItem {
  private points: Vector2[];
  private overlap: boolean;
  previousFrameRotation: number;

  // This is temporary
  kl: KeyListener;
  kl_up: number = 38;
  kl_down: number = 40;
  kl_left: number = 37;
  kl_right: number = 39;

  public constructor(xPos: number, yPos: number, rot: number) {
    super('', xPos, yPos, rot, 50, 50, 0);
    this.points = [];
    this.overlap = false;

    this.kl = new KeyListener();
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
    console.log(ctx.fillStyle);
    ctx.moveTo(0, 0);
    ctx.lineTo(this.points[0].x, this.points[0].y);
    console.log(this.points[0].x, this.points[0].y);
    ctx.lineWidth = 6;
    ctx.stroke();
    ctx.closePath();

    ctx.restore();
  }

  /**
 * Move this Player Character across the Game Canvas in response to the Player Input
 *
 */
  public control(): void {
    // Quick and dirty movement - next time might use a switch statement instead.
    if (this.kl.isKeyDown(this.kl_up)) {
      this.transform.moveRelative(0, 3);
    }

    if (this.kl.isKeyDown(this.kl_down)) {
      this.transform.moveRelative(0, -3);
    }


    if (this.kl.isKeyDown(this.kl_left)) {
      this.transform.rotate(
        this.previousFrameRotation =
        -3)
    }

    if (this.kl.isKeyDown(this.kl_right)) {
      this.transform.rotate(
        this.previousFrameRotation =
        3)
    }
  }

  public addNewPoint(x: number, y: number): void {
    this.points.push(new Vector2(x, y));
    console.log(this.points);
  }

  public static shapeOverlap_SAT(r1: Polygon, r2: Polygon) {

    let poly1 = r1;
    let poly2 = r2;

    for (let shape = 0; shape < 2; shape++) {

      if (shape == 1) {
        poly1 = r2;
        poly2 = r1;
      }

      for (let a = 0; a < poly1.points.length; a++) {

        // Obtain the 'next' point
        let b = (a + 1) % poly1.points.length;

        // Obtain edge normals
        let axisProj = new Vector2(-(poly1.points[b].y - poly1.points[a].y), poly1.points[b].x - poly1.points[a].x);


        // Work out min and max 1D points of r1
        let min_r1 = Infinity;
        let max_r1 = -Infinity;

        // Iterate through all the points of r1
        for (let p = 0; p < poly1.points.length; p++) {
          let dot = Vector2.dotProduct(poly1.points[p], axisProj);
          min_r1 = Math.min(min_r1, dot);
          max_r1 = Math.max(max_r1, dot);
          console.log(`MIN R1: ${min_r1}, MAX R1: ${min_r1}`);
        }

        // Work out min and max 1D points of r2
        let min_r2 = Infinity;
        let max_r2 = -Infinity;

        // Iterate through all the points of r2
        for (let p = 0; p < poly1.points.length; p++) {
          let dot = Vector2.dotProduct(poly2.points[p], axisProj);
          min_r2 = Math.min(min_r2, dot);
          max_r2 = Math.max(max_r2, dot);
        }

        if(!(max_r2 >= min_r1 && max_r1 >= min_r2)) {
          poly1.overlap = false;
          return false;
        }
      }
    }
    poly1.overlap = true;
    console.log(true);
    return true;
  }
}
