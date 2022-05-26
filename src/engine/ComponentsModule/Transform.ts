import Vector2 from "../MathModule/Vector2.js";
import Trigonometry from "../MathModule/Trigonometry.js";

export default class Transform {
  // The Position of this Transform
  private _position: Vector2;

  // The Rotation of this Transform measured in degrees
  private _rotation: number;

  // The Scale of this Transform
  private _scale: Vector2;

  /**
   * Create a new Transform instance
   *
   * @param position The Position of this Transform
   * @param rotation The rotation of the Transform measured in degrees
   * @param scale The Scale of this Transform
   */
  public constructor(
    position: Vector2 = Vector2.zero,
    rotation: number = 0,
    scale: Vector2 = Vector2.one
  ) {
    this.position = position;
    this.rotation = rotation;
    this.scale = scale;
  }

  /**
   * Move this Transform across the Game Canvas within the relative coordinate system
   *
   * @param dXRel Deviation of the X coordinate of this Transform in the relative coordinate system
   * @param dYRel Deviation of the Y coordinate of this Transform in the relative coordinate system
   */
  public translate(dXRel: number, dYRel: number): void {
    // Distance to the movement destination
    const dist = Math.sqrt(dXRel ** 2 + dYRel ** 2) * (dXRel >= 0 ? 1 : -1) * (dYRel >= 0 ? 1 : -1);

    // Slope of the movement vector in the relative coordinate system
    const moveSlopeRel = Math.atan(dXRel / dYRel);
    // Slope of the movement vector in the absolute coordinate system
    const moveSlopeAbs = moveSlopeRel + Trigonometry.radians(this.rotation);

    // Deviation of the X coordinate of this Transform in the absolute coordinate system
    const dXAbs = dist * Math.sin(moveSlopeAbs);
    // Deviation of the Y coordinate of this Transform in the absolute coordinate system
    const dYAbs = -dist * Math.cos(moveSlopeAbs);
    // Movement vector of this Transform in the absolute coordinate system
    const vectorDAbs = new Vector2(dXAbs, dYAbs);

    // Moving this Transform across the Game Canvas within the absolute coordinate system
    this.moveAbsolute(vectorDAbs);
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
    this.rotation += dR;
  }

  /**
   * Get the Position of this Transform
   *
   * @returns The Position of this Transform
   */
  get position(): Vector2 {
    return this._position;
  }

  /**
   * Set the Position of this Transform
   *
   * @param position The Position of this Transform
   */
  set position(position: Vector2) {
    this._position = position;
  }

  /**
   * Get the Rotation of this Transform measured in degrees
   *
   * @returns The Rotation of this Transform measured in degrees
   */
  get rotation(): number {
    return this._rotation;
  }

  /**
   * Set the Rotation of this Transform measured in degrees
   *
   * @param rotation The Rotation of this Transform measured in degrees
   */
  set rotation(rotation: number) {
    this._rotation = rotation;
  }

  /**
   * Get the Scale of this Transform
   *
   * @returns The Scale of this Transform
   */
  get scale(): Vector2 {
    return this._scale;
  }

  /**
   * Set the Scale of this Transform
   *
   * @param scale The Scale of this Transform
   */
  set scale(scale: Vector2) {
    this._scale = scale;
  }
}
