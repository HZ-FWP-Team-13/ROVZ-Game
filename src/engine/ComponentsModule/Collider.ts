import Component from "../CoreModule/Component.js";
import GameItem from "../CoreModule/GameItem.js";
import Mathematics from "../MathModule/Mathematics.js";
import Vector2 from "../MathModule/Vector2.js";
import Transform from "./Transform.js";

export default class Collider extends Component {

  private points: Vector2[]; // Contains the original points of the collider, defining it's "shape" of the collider. These points are relative to the origin of the Game Item.

  private updatedPoints: Vector2[]; // Contains the updated points of the mesh collider, i.e. the points when the collider is moved / rotated.

  previousFrameRotation: number;
  public overlap: boolean;

  public constructor() {
    super("collider");
    this.points = [];
    this.updatedPoints = [];

    this.overlap = false;
  }


  public draw(ctx: CanvasRenderingContext2D) {
    let vertSize = 8;
    this.updatedPoints.forEach(point => {
      ctx.fillStyle = 'blue';
      ctx.fillRect(point.x - vertSize / 2, point.y - vertSize / 2, vertSize, vertSize);
    });

    console.log('DRAW');
  }

  /**
   * Update the positions of the points in World (Absolute) space.
   *
   *
   */
  public updatePoints(transform: Transform) {
    for (let i = 0; i < this.points.length; i++) {
      this.updatedPoints[i].x = (this.points[i].x * Math.cos(Mathematics.radians(transform.rotation))) -
      (this.points[i].y * Math.sin(Mathematics.radians(transform.rotation))) + transform.position.x;

      this.updatedPoints[i].y = (this.points[i].x * Math.sin(Mathematics.radians(transform.rotation))) +
      (this.points[i].y * Math.cos(Mathematics.radians(transform.rotation))) + transform.position.y;
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

  /**
   * Check for collision between two colliders using SAT (Seperating Axis Theorem)
   * @param gi1 The first GameItem
   * @param gi2 The other GameItem
   * @returns
   */
  public static checkCollision(gi1: GameItem, collider1: Collider, gi2: GameItem, collider2: Collider) {
    let g1 = gi1;
    let c1 = collider1;

    let g2 = gi2;
    let c2 = collider2;

    // TODO: perhaps find / create a static function that quickly allows us to use the Pythagorean theorem (something like: Math.pythAC(AB, BC))
    // Also, it might be a good idea to make the distance check a seperate

    // Before performing SAT calculations, we will first check if the colliders are anywhere near one another.
    // First, find the 'radii' for both Colliders

    // Radius for collider 1

    let r1 = -Infinity

    for (let i = 0; i<c1.points.length; i++) {
      let r = Math.sqrt(Math.pow(c1.points[i].x, 2) + Math.pow(c1.points[i].y, 2));
      r1 = Math.max(r1, r);
    }

     // Radius of collider 2

    let r2 = -Infinity

    for (let i = 0; i<c2.points.length; i++) {
      let r = Math.sqrt(Math.pow(c2.points[i].x, 2) + Math.pow(c2.points[i].y, 2));
      r2 = Math.max(r2, r);
    }

    // Next, find the distance between the position of the GameItems
    let d = Math.sqrt(
      Math.pow(gi2.transform.position.x - gi1.transform.position.x, 2)
       + Math.pow(gi2.transform.position.y - gi1.transform.position.y, 2)
    );

    // If the distance between the centers is larger than their radii combined, they are not close enough to collide.
    if (d > r1+r2) {
      return false;
    }

    // If the the distance is smaller than the radii combined, proceed to SAT

    for (let shape = 0; shape < 2; shape++) {
      // Once the test has been performed using the axes of the first shape, perform the test using the axes of the second shape.
      if (shape == 1) {
        g1 = gi2;
        c1 = collider2;

        g2 = gi1;
        c2 = collider1;
      }

      for (let a = 0; a < c1.updatedPoints.length; a++) {

        // Obtain the 'next' point
        let b = (a + 1) % c1.updatedPoints.length;

        // Obtain edge normals
        let axisProj = new Vector2(-(c1.updatedPoints[b].y - c1.updatedPoints[a].y), c1.updatedPoints[b].x - c1.updatedPoints[a].x);

        // Work out min and max 1D points of p1
        let min_p1 = Infinity;
        let max_p1 = -Infinity;

        // Iterate through all the points of p1
        for (let p = 0; p < c1.updatedPoints.length; p++) {
          let dot = Vector2.dotProduct(c1.updatedPoints[p], axisProj);
          min_p1 = Math.min(min_p1, dot);
          max_p1 = Math.max(max_p1, dot);
        }

        // Work out min and max 1D points of p2
        let min_c2 = Infinity;
        let max_c2 = -Infinity;

        // Iterate through all the points of p2
        for (let p = 0; p < c2.updatedPoints.length; p++) {
          let dot = Vector2.dotProduct(c2.updatedPoints[p], axisProj);
          min_c2 = Math.min(min_c2, dot);
          max_c2 = Math.max(max_c2, dot);
        }

        if (!(max_c2 >= min_p1 && max_p1 >= min_c2)) {
          c1.overlap = false;
          return false;
        }
      }
    }
    c1.overlap = true;
    // console.log(true);
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
}
