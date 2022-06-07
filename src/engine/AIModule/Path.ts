import Camera from '../GraphicsModule/Camera.js';
import Vector2 from '../MathModule/Vector2.js';

export default class Path {
  private points: Vector2[];

  /**
   * Constructor
   */
  public constructor() {
    this.points = [];
  }

  /**
   * Draw the path for debugging
   * @param ctx ctx
   * @param camera camera
   */
  public draw(ctx: CanvasRenderingContext2D, camera: Camera): void {
    const vertSize = 8;
    this.points.forEach((point) => {
      ctx.fillStyle = 'green';
      const cameraPosition = camera.getTransform().getPosition();
      const cameraDimensions = camera.getFrameDimensions();
      ctx.fillRect(
        point.getX() - vertSize / 2 - cameraPosition.getX() + cameraDimensions.getX() / 2,
        point.getY() - vertSize / 2 - cameraPosition.getY() + cameraDimensions.getY() / 2,
        vertSize, vertSize,
      );
    });
  }

  /**
   * Add a point to the path
   * @param point The point to be added
   */
  public addPoint(point: Vector2): void {
    this.points.push(point);
  }

  /**
   * Get the points
   * @returns points
   */
  public getPoints() : Vector2[] {
    return this.points;
  }
}
