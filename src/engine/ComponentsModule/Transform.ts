import Component from "../CoreModule/Component.js";
import Vector2 from "../MathModule/Vector2.js";
import Mathematics from "../MathModule/Mathematics.js";


export default class Transform extends Component {
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
    super("transform");
    this.position = position;
    this.rotation = rotation;
    this.scale = scale;
  }

  /**
   * Move this Transform across the Game Canvas within the relative coordinate system
   *
   * @param vectorDRel Position deviation of this Transform in the relative coordinate system
   */
  public translate(vectorDRel: Vector2 = Vector2.zero): void {
    // Distance to the movement destination
    const dist = Math.sqrt(vectorDRel.x ** 2 + vectorDRel.y ** 2);

    // Slope of the movement vector in the relative coordinate system measured in radians
    const moveSlopeRel = Math.atan(vectorDRel.x  / vectorDRel.y);
    // Slope of the movement vector in the absolute coordinate system measured in radians
    const moveSlopeAbs = moveSlopeRel + Mathematics.radians(this.rotation);

    // Deviation of the X coordinate of this Transform in the absolute coordinate system
    const dXAbs = dist * Math.sin(moveSlopeAbs);
    // Deviation of the Y coordinate of this Transform in the absolute coordinate system
    const dYAbs = -dist * Math.cos(moveSlopeAbs);
    // Movement vector of this Transform in the absolute coordinate system
    let vectorDAbs = new Vector2(dXAbs, dYAbs);

    // Compensation of the arctangent absolute nature
    if (vectorDRel.y < 0) {
      vectorDAbs.negate(); // TODO: vectorDAbs *= (vectorDRel.y < 0 ? -1 : 1);
    }

    // Moving this Transform across the Game Canvas within the absolute coordinate system
    this.moveAbsolute(vectorDAbs);
  }

  /**
   * Move this Transform across the Game Canvas within the absolute coordinate system
   *
   * @param vectorDAbs Position deviation of this Transform in the absolute coordinate system
   */
  public moveAbsolute(vectorDAbs: Vector2 = Vector2.zero): void {
    this.position = Vector2.vectorsSum(this.position, vectorDAbs); // TODO: this.position += vectorDAbs;
  }

  /**
   * Rotate this Transform by the given angle measured in degrees
   *
   * @param dR Deviation of the rotation of this Transform in degrees
   */
  public rotate(dR: number = 0): void {
    this.rotation += dR;
  }

  /**
   * Get the Position of this Transform
   *
   * @returns The Position of this Transform
   */
  public get position(): Vector2 {
    return this._position;
  }
  /**
   * Set the Position of this Transform
   *
   * @param value The Position of this Transform
   */
  public set position(value: Vector2) {
    this._position = value;
  }

  /**
   * Get the Rotation of this Transform measured in degrees
   *
   * @returns The Rotation of this Transform measured in degrees
   */
  public get rotation(): number {
    return this._rotation;
  }
  /**
   * Set the Rotation of this Transform measured in degrees
   *
   * @param value The Rotation of this Transform measured in degrees
   */
  public set rotation(value: number) {
    this._rotation = value;
  }

  /**
   * Get the Scale of this Transform
   *
   * @returns The Scale of this Transform
   */
  public get scale(): Vector2 {
    return this._scale;
  }
  /**
   * Set the Scale of this Transform
   *
   * @param value The Scale of this Transform
   */
  public set scale(value: Vector2) {
    this._scale = value;
  }
}
