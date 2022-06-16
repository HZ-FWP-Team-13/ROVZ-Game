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
    const cameraPosition = camera.getTransform().getPosition();
    const cameraDimensions = camera.getFrameDimensions();

    // Probably not the right term for this and
    // whether to use a positive or negative cameraPosition for this variable.
    const normalizedCameraX = -cameraPosition.getX() + cameraDimensions.getX() / 2;
    const normalizedCameraY = -cameraPosition.getY() + cameraDimensions.getY() / 2;

    this.points.forEach((point) => {
      ctx.fillStyle = 'green';
      ctx.fillRect(
        point.getX() - vertSize / 2 + normalizedCameraX,
        point.getY() - vertSize / 2 + normalizedCameraY,
        vertSize, vertSize,
      );
    });

    // Draw a line from point to point
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    for (let i = 0; i < this.points.length; i++) {
      ctx.lineTo(
        this.points[i].getX() + normalizedCameraX,
        this.points[i].getY() + normalizedCameraY,
      );
    }
    ctx.lineTo(
      this.points[0].getX() + normalizedCameraX,
      this.points[0].getY() + normalizedCameraY,
    );
    ctx.stroke();
    ctx.closePath();
  }

  /**
   * Add a point to the path
   *
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
