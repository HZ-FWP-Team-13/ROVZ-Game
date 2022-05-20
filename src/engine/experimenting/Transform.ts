import Vector2 from "./Vector2.js";

export default class Transform {
  public position: Vector2;
  public orientation: number;
  public scale: Vector2;

  /**
   * Create a new Transform instance
   *
   * @param xPos The X coordinate of the Transform on the game canvas
   * @param yPos The Y coordinate of the Transform on the game canvas
   * @param rotation The rotation of the Transform measured in degrees
   * @param xScale The width of the Transform on the game canvas
   * @param yScale The height of the Transform on the game canvas
   */
  public constructor(xPos: number = 0, yPos: number = 0, rotation: number = 0, xScale: number = 1, yScale: number = 1) {
    this.position = new Vector2(xPos, yPos);
    this.orientation = rotation;
    this.scale = new Vector2(xScale, yScale);
  }

  /**
   * Move this Transform across the Game Canvas within the absolute coordinate system
   *
   * @param vectorDAbs Vector containing the X and Y deviation of this Transform in the absolute coordinate system
   */
  public moveAbsolute(vectorDAbs: Vector2): void {
    this.position = Vector2.vectorsSum(this.position, vectorDAbs);
  }

  /**
   * Rotate this Transform by the given angle measured in degrees
   *
   * @param dR Deviation of the rotation of this Transform in degrees
   */
  public rotate(dR: number): void {
    this.orientation += dR;
  }

  /**
   * Move this Transform across the Game Canvas within the relative coordinate system
   *
   * @param dXRel Deviation of the X coordinate of this Transform in the relative coordinate system
   * @param dYRel Deviation of the Y coordinate of this Transform in the relative coordinate system
   */
  public moveRelative(dXRel: number, dYRel: number): void {
    // Distance to the movement destination
    const dist = Math.sqrt(dXRel ** 2 + dYRel ** 2) * (dXRel >= 0 ? 1 : -1) * (dYRel >= 0 ? 1 : -1);

    // Slope of the movement vector in the relative coordinate system
    const moveSlopeRel = Math.atan(dXRel / dYRel);
    // Slope of the movement vector in the absolute coordinate system
    const moveSlopeAbs = moveSlopeRel + this.getRotationInRadians();

    // Deviation of X and Y coordinates of this Transform in the absolute coordinate system
    const dXAbs = dist * Math.sin(moveSlopeAbs);
    const dYAbs = -dist * Math.cos(moveSlopeAbs);
    // Movement vector of this Transform in the absolute coordinate system
    const vectorDAbs = new Vector2(dXAbs, dYAbs);

    // Moving this Transform across the Game Canvas within the absolute coordinate system
    this.moveAbsolute(vectorDAbs);
  }

  /**
   * Get the X coordinate of this Transform
   *
   * @returns The X coordinate of this Transform
   */
   public getXPos(): number {
    return this.position.x;
  }

  /**
   * Get the Y coordinate of this Transform
   *
   * @returns The Y coordinate of this Transform
   */
  public getYPos(): number {
    return this.position.y;
  }

  /**
   * Get the rotation of this Transform measured in degrees
   *
   * @returns The rotation of this Transform measured in degrees
   */
  public getRotation(): number {
    return this.orientation;
  }

  /**
   * Get the rotation of this Transform measured in radians
   *
   * @returns The rotation of this Transform measured in radians
   */
   public getRotationInRadians(): number {
    return (this.orientation / 180) * Math.PI;
  }

  /**
   * Set the X coordinate of this Transform
   *
   * @param xPos The X coordinate of this Transform
   */
  public setXPos(xPos: number): void {
    this.position.x = xPos;
  }

  /**
   * Set the Y coordinate of this Transform
   *
   * @param yPos The Y coordinate of this Transform
   */
  public setYPos(yPos: number): void {
    this.position.y = yPos;
  }

  /**
   * Set the rotation of this Transform measured in degrees
   *
   * @param rotation The rotation of this Transform measured in degrees
   */
  public setRotation(rotation: number): void {
    this.orientation = rotation;
  }
}
