import GameObject from '../ObjectModule/GameObject.js';
import Vector2 from '../MathModule/Vector2.js';
import Transform from '../ComponentsModule/Transform.js';
import Mathematics from '../MathModule/Mathematics.js';

export default class Camera extends GameObject {
  // The dimensions of the frame the Camera captures
  private frameDimensions: Vector2;

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
   * Calculate the position of the Top Left corner of the Camera Frame
   *
   * @returns The sought Vector2
   */
  public getTopLeftCornerPosition(): Vector2 {
    // Accessing Camera rotation measured in radians
    const cameraRotation: number = Mathematics.radians(this.getTransform().getRotation());
    // Calculating projections of the Vector2 from Center of the Camera Frame to Top Left corner
    // on the relative coordinate system
    const relX: number = this.frameDimensions.getX() / 2;
    const relY: number = this.frameDimensions.getY() / 2;
    // Calculating projections of the Vector2 from Center of the Camera Frame to Top Left corner
    // on the absolute coordinate system
    const absX: number = relX * Math.cos(cameraRotation) - relY * Math.sin(cameraRotation);
    const absY: number = relX * Math.sin(cameraRotation) + relY * Math.cos(cameraRotation);
    // Calculating the sought Vector2
    const topLeftCornerPosition: Vector2 = Vector2.vectorsSum(
      this.getTransform().getPosition(),
      new Vector2(absX, absY),
    );
    return topLeftCornerPosition;
  }

  /**
   * Get the dimensions of the frame this Camera captures
   *
   * @returns The dimensions of the frame this Camera captures
   */
  public getFrameDimensions(): Vector2 {
    return this.frameDimensions;
  }

  /**
   * Set the dimensions of the frame this Camera captures
   *
   * @param value The dimensions of the frame this Camera captures
   */
  public setFrameDimensions(value: Vector2): void {
    this.frameDimensions = value;
  }
}
