import Vector2 from "./Vector2.js";

export default class Transform {
  public position: Vector2;
  public orientation: number;
  public scale: Vector2;

  /**
   * Create a new Transform instance
   */
  public constructor(xPos: number = 0, yPos: number = 0, rotation: number = 0, scaleX: number = 1, scaleY: number = 1) {
    this.position = new Vector2(xPos, yPos);
    this.orientation = rotation;
    this.scale = new Vector2(scaleX, scaleY);
  }

  /**
   * Move this GameItem across the Game Canvas within the absolute coordinate system
   *
   * @param vectorDAbs Vector containing the X and Y deviation of this GameItem in the absolute coordinate system
   */

  public moveAbsolute(vectorDAbs: Vector2): void {
    this.position = Vector2.vectorsSum(this.position, vectorDAbs);
  }

  /**
   * Rotate this GameItem by the given angle measured in degrees
   *
   * @param dR Deviation of the rotation of this GameItem in degrees
   */
  public rotate(dR: number): void {
    this.orientation += dR;
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

    // Deviation of X and Y coordinates in the absolute coordinate system
    const vectorDAbs = new Vector2(
      dist * Math.sin(moveSlopeAbs),
      -dist * Math.cos(moveSlopeAbs)
      );

    console.log(Math.atan(dXRel / dYRel));

    // Moving this GameItem across the Game Canvas within the absolute coordinate system
    this.moveAbsolute(vectorDAbs);
  }

  /**
 * Get the rotation of this GameItem measured in radians
 *
 * @returns The rotation of this GameItem measured in radians
 */
  public getRotationInRadians(): number {
    return (this.orientation / 180) * Math.PI;
  }


}
