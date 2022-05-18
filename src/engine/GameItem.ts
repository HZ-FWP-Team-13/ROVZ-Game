import Graphics from './Graphics.js';
import Polygon from './Polygon.js';
import XY from './XY.js';

export default abstract class GameItem {
  // The path to the Source Image of the GameItem appearance
  protected imgSourcePath: string;

  // The Source Image of the GameItem appearance
  protected imgSource: HTMLImageElement;

  // The X coordinate of the GameItem on the game canvas
  protected xPos: number;

  // The Y coordinate of the GameItem on the game canvas
  protected yPos: number;

  // The rotation of the GameItem measured in degrees
  protected rotation: number;

  // The width of the GameItem appearance
  protected frameWidth: number;

  // The height of the GameItem appearance
  protected frameHeight: number;

  // The width of the GameItem collider
  protected colliderWidth: number;

  // The height of the GameItem collider
  protected colliderHeight: number;

  // The current state of the GameItem animation cycle
  protected animationState: number;

  //

  /**
   * Create a new GameItem instance
   *
   * @param imgSourcePath The path to the Source Image of the GameItem appearance
   * @param xPos The X coordinate of the GameItem on the game canvas
   * @param yPos The Y coordinate of the GameItem on the game canvas
   * @param rotation The rotation of the GameItem measured in degrees
   * @param frameWidth The width of the GameItem appearance
   * @param frameHeight The height of the GameItem appearance
   * @param colliderWidth The width of the GameItem collider
   * @param colliderHeight The height of the GameItem collider
   * @param animationState The current state of the GameItem animation cycle
   */
  public constructor(
    imgSourcePath: string,
    xPos: number, yPos: number,
    rotation: number,
    frameWidth: number, frameHeight: number,
    colliderWidth: number = frameWidth, colliderHeight: number = frameHeight,
    animationState: number = 0,
  ) {
    this.imgSourcePath = imgSourcePath;
    this.setImgSource(imgSourcePath);

    this.xPos = xPos;
    this.yPos = yPos;

    this.rotation = rotation;

    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;

    this.colliderWidth = colliderWidth;
    this.colliderHeight = colliderHeight;

    this.animationState = animationState;
  }

  /**
   * Move this GameItem across the Game Canvas within the absolute coordinate system
   *
   * @param dXAbs Deviation of the X coordinate of this GameItem in the absolute coordinate system
   * @param dYAbs Deviation of the Y coordinate of this GameItem in the absolute coordinate system
   * @param dR Deviation of the rotation of this GameItem
   */
  public moveAbsolute(dXAbs: number, dYAbs: number, dR: number = 0): void {
    this.xPos += dXAbs;
    this.yPos += dYAbs;
    this.rotate(dR);
  }

  /**
   * Rotate this GameItem by the given angle measured in degrees
   *
   * @param dR Deviation of the rotation of this GameItem
   */
  public rotate(dR: number): void {
    this.rotation += dR;
  }

  /**
   * Move this GameItem across the Game Canvas within the relative coordinate system
   *
   * @param dXRel Deviation of the X coordinate of this GameItem in the relative coordinate system
   * @param dYRel Deviation of the Y coordinate of this GameItem in the relative coordinate system
   */
  public moveRelative(dXRel: number, dYRel: number): void {
    // Distance to the movement destination
    const dist = Math.sqrt(dXRel ** 2 + dYRel ** 2) * (dXRel >= 0 ? 1 : -1) * (dYRel >= 0 ? 1 : -1);

    // Slope of the movement vector in the relative coordinate system
    const moveSlopeRel = Math.atan(dXRel / dYRel);
    // Slope of the movement vector in the absolute coordinate system
    const moveSlopeAbs = moveSlopeRel + this.getRotationInRadians();

    // Deviation of the X coordinate in the absolute coordinate system
    const dXAbs = dist * Math.sin(moveSlopeAbs);
    // Deviation of the Y coordinate in the absolute coordinate system
    const dYAbs = dist * Math.cos(moveSlopeAbs);

    console.log(Math.atan(dXRel / dYRel));

    // Moving this GameItem across the Game Canvas within the absolute coordinate system
    this.moveAbsolute(dXAbs, -dYAbs);
  }

  /**
   * Draw this GameItem appearance on the Game Canvas
   * based on rotation and current state of the animation cycle
   *
   * @param ctx the Canvas that needs to be drawn upon each cycle
   */
  public draw(ctx: CanvasRenderingContext2D): void {
    // Creating a backup of the Game Canvas rendering context in the absolute coordinate system
    ctx.save();

    // Switching the Game Canvas rendering context to the relative coordinate system
    // Moving the origin of the coordinate system to the center of the future GameItem appearance
    ctx.translate(this.xPos, this.yPos);
    // Rotating coordinate system to correspond with this GameItem rotation
    ctx.rotate(this.getRotationInRadians());

    //
    ctx.drawImage(this.imgSource,
      this.frameWidth * this.animationState, 0,
      this.frameWidth, this.frameHeight,
      -this.frameWidth / 2, -this.frameHeight / 2,
      this.frameWidth, this.frameHeight);

    // Returning the Game Canvas rendering context to the absolute coordinate system
    ctx.restore();


    // DEBUG STUFF
    ctx.fillStyle = '#ff0000';
    ctx.beginPath();
    ctx.moveTo(this.getRotatedRectangleCoordinates().tl.x, this.getRotatedRectangleCoordinates().tl.y);
    ctx.lineTo(this.getRotatedRectangleCoordinates().tr.x, this.getRotatedRectangleCoordinates().tr.y);
    ctx.lineTo(this.getRotatedRectangleCoordinates().br.x, this.getRotatedRectangleCoordinates().br.y);
    ctx.lineTo(this.getRotatedRectangleCoordinates().bl.x, this.getRotatedRectangleCoordinates().bl.y);
    ctx.lineTo(this.getRotatedRectangleCoordinates().tl.x, this.getRotatedRectangleCoordinates().tl.y);
    ctx.closePath();
    ctx.fill;
  }

  /**
   * Process the Player Input to modify this GameItem
   */
  public abstract control(): void;

  /**
   * Get the path to the Source Image of this GameItem appearance
   *
   * @returns The path to the Source Image of this GameItem appearance
   */
  public getImgSourcePath(): string {
    return this.imgSourcePath;
  }

  /**
   * Get the Source Image of this GameItem appearance
   *
   * @returns The Source Image of this GameItem appearance
   */
  public getImgSource(): HTMLImageElement {
    return this.imgSource;
  }

  /**
   * Get the X coordinate of this GameItem
   *
   * @returns The X coordinate of this GameItem
   */
  public getXPos(): number {
    return this.xPos;
  }

  /**
   * Get the Y coordinate of this GameItem
   *
   * @returns The Y coordinate of this GameItem
   */
  public getYPos(): number {
    return this.yPos;
  }

  /**
   * Get the rotation of this GameItem measured in degrees
   *
   * @returns The rotation of this GameItem measured in degrees
   */
  public getRotation(): number {
    return this.rotation;
  }

  /**
   * Get the rotation of this GameItem measured in radians
   *
   * @returns The rotation of this GameItem measured in radians
   */
  public getRotationInRadians(): number {
    return (this.rotation / 180) * Math.PI;
  }

  /**
   * Get the width of the GameItem appearance
   *
   * @returns The width of the GameItem appearance
   */
  public getFrameWidth(): number {
    return this.frameWidth;
  }

  /**
   * Get the height of the GameItem appearance
   *
   * @returns The height of the GameItem appearance
   */
  public getFrameHeight(): number {
    return this.frameHeight;
  }

  /**
   * Get the width of the GameItem collider
   *
   * @returns The width of the GameItem collider
   */
  public getColliderWidth(): number {
    return this.colliderWidth;
  }

  /**
   * Get the height of the GameItem collider
   *
   * @returns The height of the GameItem collider
   */
  public getColliderHeight(): number {
    return this.colliderHeight;
  }

  /**
   * Get the current state of this GameItem animation cycle
   *
   * @returns The current state of this GameItem animation cycle
   */
  public getAnimationState(): number {
    return this.animationState;
  }

  /**
   * Set the Source Image of this GameItem appearance
   *
   * @param imgSourcePath The path to the Source Image of this GameItem appearance
   */
  public setImgSource(imgSourcePath: string): void {
    this.imgSource = Graphics.loadNewImage(imgSourcePath);
  }

  /**
   * Set the X coordinate of this GameItem
   *
   * @param xPos The X coordinate of this GameItem
   */
  public setXPos(xPos: number): void {
    this.xPos = xPos;
  }

  /**
   * Set the Y coordinate of this GameItem
   *
   * @param yPos The Y coordinate of this GameItem
   */
  public setYPos(yPos: number): void {
    this.yPos = yPos;
  }

  /**
   * Set the rotation of this GameItem measured in degrees
   *
   * @param rotation The rotation of this GameItem measured in degrees
   */
  public setRotation(rotation: number): void {
    this.rotation = rotation;
  }

  /**
   * Set the width of the GameItem appearance
   *
   * @param frameWidth The width of the GameItem appearance
   */
  public setFrameWidth(frameWidth: number): void {
    this.frameWidth = frameWidth;
  }

  /**
   * Set the height of the GameItem appearance
   *
   * @param frameHeight The height of the GameItem appearance
   */
  public setFrameHeight(frameHeight: number): void {
    this.frameHeight = frameHeight;
  }

  /**
   * Set the width of the GameItem collider
   *
   * @param colliderWidth The width of the GameItem collider
   */
  public setColiderWidth(colliderWidth: number): void {
    this.colliderWidth = colliderWidth;
  }

  /**
   * Set the height of the GameItem collider
   *
   * @param colliderHeight The height of the GameItem collider
   */
  public setColiderHeight(colliderHeight: number): void {
    this.colliderHeight = colliderHeight;
  }

  /**
   * Set the current state of this GameItem animation cycle
   *
   * @param animationState The current state of this GameItem animation cycle
   */
  public setAnimationState(animationState: number): void {
    this.animationState = animationState;
  }

  /*==================================================
  ||   COLLISIONS USING SEPARATION AXIS THEOREM     ||
  ===================================================*/


  /**
   * Calculates the new position of a given vertex
   * @param vx
   * @param vy
   */
  public workOutNewPoints(vx: number, vy: number) {
    let rotatedAngle = this.getRotationInRadians();
    let cx = this.xPos;
    let cy = this.yPos;

    let dx = vx - cx;
    let dy = vy - cy;
    let distance = Math.sqrt(dx * dx + dy * dy);
    let originalAngle = Math.atan2(dy, dx);

    let rotatedX = cx + distance * Math.cos(originalAngle + rotatedAngle);
    let rotatedY = cy + distance * Math.sin(originalAngle + rotatedAngle);

    return {
      x: rotatedX,
      y: rotatedY
    }
  }

  public getRotatedRectangleCoordinates() {
    let cx = this.xPos;
    let cy = this.yPos;
    let cw = this.colliderWidth;
    let ch = this.colliderHeight;

    let topLeft = this.workOutNewPoints(cx - cw / 2, cy - ch / 2);
    let topRight = this.workOutNewPoints(cx + cw / 2, cy - ch / 2);
    let bottomLeft = this.workOutNewPoints(cx - cw / 2, cy + ch / 2);
    let bottomRight = this.workOutNewPoints(cx + cw / 2, cy + ch / 2);

    return {
      tl: topLeft,
      tr: topRight,
      bl: bottomLeft,
      br: bottomRight
    }
  }


  public collidesWith(other: GameItem): boolean {
    let tRR = this.getRotatedRectangleCoordinates();
    let oRR = other.getRotatedRectangleCoordinates();

    // console.log(tRR);

    let thisVertices = [
      new XY(tRR.tr.x, tRR.tr.y),
      new XY(tRR.br.x, tRR.br.y),
      new XY(tRR.bl.x, tRR.bl.y),
      new XY(tRR.tl.x, tRR.tl.y)
    ];

    let thisEdges = [
      new XY(tRR.br.x - tRR.tr.x, tRR.br.y - tRR.tr.y),
      new XY(tRR.bl.x - tRR.br.x, tRR.bl.y - tRR.br.y),
      new XY(tRR.tl.x - tRR.bl.x, tRR.tl.y - tRR.bl.y),
      new XY(tRR.tr.x - tRR.tl.x, tRR.tr.y - tRR.tl.y),
    ];

    let otherVertices = [
      new XY(oRR.tr.x, oRR.tr.y),
      new XY(oRR.br.x, oRR.br.y),
      new XY(oRR.bl.x, oRR.bl.y),
      new XY(oRR.tl.x, oRR.tl.y)
    ];

    let otherEdges = [
      new XY(oRR.br.x - oRR.tr.x, oRR.br.y - oRR.tr.y),
      new XY(oRR.bl.x - oRR.br.x, oRR.bl.y - oRR.br.y),
      new XY(oRR.tl.x - oRR.bl.x, oRR.tl.y - oRR.bl.y),
      new XY(oRR.tr.x - oRR.tl.x, oRR.tr.y - oRR.tl.y),
    ];

    let thisRectPolygon = new Polygon(thisVertices, thisEdges);
    let otherRectPolygon = new Polygon(otherVertices, otherEdges);

    if (this.sat(thisRectPolygon, otherRectPolygon)) {
      console.log('TRUE');
      return true;
    }

    else if
    (this.rotation === 0 && other.getRotation() === 0 &&
      !(
      this.xPos - this.colliderWidth > other.getXPos() + other.getColliderWidth() ||
      this.xPos + this.colliderWidth < other.getXPos() - other.getColliderWidth() ||
      this.yPos - this.colliderHeight > other.getYPos() + other.getColliderHeight() ||
      this.yPos + this.colliderHeight < other.getYPos() - other.getColliderHeight()
      ))
      {
          console.log("TRUE");
          return true;
      }
      else {
        return false;
      }
    }

  public sat(polygonA: Polygon, polygonB: Polygon) {
    var perpendicularLine = null;
    var dot = 0;
    var perpendicularStack = []; // An array of all the perpendicular edges
    var amin = null;
    var amax = null;
    var bmin = null;
    var bmax = null;


    // Work out all perpendicular edges on polygon A
    for (var i = 0; i < 4; i++) {
      perpendicularLine = new XY(-polygonA.edges[i].y, polygonA.edges[i].x);
      perpendicularStack.push(perpendicularLine);
    }

    // Work out all perpendicular edges on polygon B
    for (var i = 0; i < 4; i++) {
      perpendicularLine = new XY(-polygonB.edges[i].y, polygonB.edges[i].x);
      perpendicularStack.push(perpendicularLine);
    }

    // Loop through the perpendicular vectors for both polygons
    for (var i = 0; i < perpendicularStack.length; i++) {
      // These dot products will return different values each time
      amin = null;
      amax = null;
      bmin = null;
      bmax = null;
      // Work out all the dot products for all the vertices in polygon A against the perpendicular vector that is currently being looped through
      for (var j = 0; j < polygonA.vertices.length; j++) {
        dot = polygonA.vertices[j].x *
          perpendicularStack[i].x +
          polygonA.vertices[j].y *
          perpendicularStack[i].y

        // Then find the dot products with the highest and lowest values from polygon A
        if (amax === null || dot > amax) {
          amax = dot;
        }
        if (amin === null || dot > amin) {
          amin = dot;
        }
      }


      // Work out all the dot products for all the vertices in polygon B against the perpendicular vector that is currently being looped through
      for (var j = 0; j < polygonB.vertices.length; j++) {
        dot = polygonB.vertices[j].x *
          perpendicularStack[i].x +
          polygonB.vertices[j].y *
          perpendicularStack[i].y

        // Then find the dot products with the highest and lowest values from polygon B
        if (bmax === null || dot > bmax) {
          bmax = dot;
        }
        if (bmin === null || dot > bmin) {
          bmin = dot;
        }
      }

      // If there is no gap between the dot products projection then we will continue onto evaluating the next perpendicular edge.
      if ((amin < bmax && amin > bmin) || (bmin < amax && bmin > amin)) {
        continue;
      } else {
        // Otherwise, we know that there is no collision for definite.
        return false;
      }
    }
    // If we have gotten this far, having looped through ALL of the perpendicular edges with none of their projections having gaps between them,
    // then we know two polygons are colliding.
    return true;
  }
}
