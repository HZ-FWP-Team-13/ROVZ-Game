import GameItem from "../GameItem.js";
import Transform from "./Transform";
import Vector2 from "./Vector2.js";
import KeyListener from "../KeyListener.js";

export default class Polygon extends GameItem{
  points: Vector2[];
  overlap: boolean;
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
   * @param input of the keys when moving
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

  public addNewPoint(x: number, y: number) : void {
    this.points.push(new Vector2(x, y));
  }

  public static shapeOverlap_SAT(poly1: Polygon, poly2: Polygon) {



  }


}
