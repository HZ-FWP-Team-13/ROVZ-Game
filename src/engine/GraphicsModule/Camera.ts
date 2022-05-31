import GameObject from "../ObjectModule/GameObject.js";
import Vector2 from "../MathModule/Vector2.js";
import Transform from "../ComponentsModule/Transform.js";

export default class Camera extends GameObject {
  // The dimensions of the frame the Camera captures
  private _frameDimensions: Vector2;

  /**
   * Create a new Camera instance
   *
   * @param id The id of the GameObject
   * @param frameDimensions The dimensions of the frame the Camera captures
   * @param transform The Transform of the GameObject
   */
  public constructor(id: string, frameDimensions: Vector2, transform: Transform = new Transform()) {
    super(id, transform);

    this.frameDimensions = frameDimensions;
  }

  /**
   * Get the dimensions of the frame this Camera captures
   *
   * @returns The dimensions of the frame this Camera captures
   */
  public get frameDimensions(): Vector2 {
    return this._frameDimensions;
  }
  /**
   * Set the dimensions of the frame this Camera captures
   *
   * @param value The dimensions of the frame this Camera captures
   */
  public set frameDimensions(value: Vector2) {
    this._frameDimensions = value;
  }
}
