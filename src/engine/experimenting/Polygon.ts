import GameItem from "../GameItem.js";
import Vector2 from "./Vector2.js";
import KeyListener from "../KeyListener.js";
import Input from "../Input.js";

export default class Polygon extends GameItem {
  private points: Vector2[];
  public overlap: boolean;
  private input: Input;
  previousFrameRotation: number;

  private updatedPoints: Vector2[];

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
    // console.log(ctx.fillStyle);
    ctx.moveTo(0, 0);
    ctx.lineTo(this.points[0].x, this.points[0].y);
    // console.log(this.points[0].x, this.points[0].y);
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
 * Move this Player Character across the Game Canvas in response to the Player Input
 *
 */
  public control(): void {
    // Quick and dirty movement - next time might use a switch statement instead.
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



  public addNewPoint(x: number, y: number): void {
    this.points.push(new Vector2(x, y));
    this.updatedPoints.push(new Vector2(x, y));
    // console.log(this.points);
    // console.log(this.updatedPoints);
  }

  public static shapeOverlap_SAT(r1: Polygon, r2: Polygon) {

    let poly1 = r1;
    let poly2 = r2;

    for (let shape = 0; shape < 2; shape++) {

      if (shape == 1) {
        poly1 = r2;
        poly2 = r1;
      }

      for (let a = 0; a < poly1.updatedPoints.length; a++) {

        // Obtain the 'next' point
        let b = (a + 1) % poly1.updatedPoints.length;

        // Obtain edge normals
        let axisProj = new Vector2(-(poly1.updatedPoints[b].y - poly1.updatedPoints[a].y), poly1.updatedPoints[b].x - poly1.updatedPoints[a].x);


        // Work out min and max 1D points of r1
        let min_r1 = Infinity;
        let max_r1 = -Infinity;

        // Iterate through all the points of r1
        for (let p = 0; p < poly1.updatedPoints.length; p++) {
          let dot = Vector2.dotProduct(poly1.updatedPoints[p], axisProj);
          min_r1 = Math.min(min_r1, dot);
          max_r1 = Math.max(max_r1, dot);
          // console.log(`MIN R1: ${min_r1}, MAX R1: ${min_r1}`);
        }

        // Work out min and max 1D points of r2
        let min_r2 = Infinity;
        let max_r2 = -Infinity;

        // Iterate through all the points of r2
        for (let p = 0; p < poly1.updatedPoints.length; p++) {
          let dot = Vector2.dotProduct(poly2.updatedPoints[p], axisProj);
          min_r2 = Math.min(min_r2, dot);
          max_r2 = Math.max(max_r2, dot);
          // console.log(`MIN R2: ${min_r1}, MAX R2: ${min_r1}`);
        }

        if(!(max_r2 >= min_r1 && max_r1 >= min_r2)) {
          poly1.overlap = false;
          return false;
        }
      }
    }
    poly1.overlap = true;
    // console.log(true);
    return true;
  }
}
