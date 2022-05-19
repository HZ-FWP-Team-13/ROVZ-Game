import Orientation from "./Orientation.js";
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
   * @param dXAbs Deviation of the X coordinate of this GameItem in the absolute coordinate system
   * @param dYAbs Deviation of the Y coordinate of this GameItem in the absolute coordinate system
   * @param dR Deviation of the rotation of this GameItem
   */
   public moveAbsolute(dXAbs: number, dYAbs: number, dR: number = 0): void {
    this.position.x += dXAbs;
    this.position.y += dYAbs;
    this.rotate(dR);
  }

  /**
   * Rotate this GameItem by the given angle measured in degrees
   *
   * @param dR Deviation of the rotation of this GameItem
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

      // Deviation of the X coordinate in the absolute coordinate system
      const dXAbs = dist * Math.sin(moveSlopeAbs);
      // Deviation of the Y coordinate in the absolute coordinate system
      const dYAbs = dist * Math.cos(moveSlopeAbs);

      console.log(Math.atan(dXRel / dYRel));

      // Moving this GameItem across the Game Canvas within the absolute coordinate system
      this.moveAbsolute(dXAbs, -dYAbs);
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
