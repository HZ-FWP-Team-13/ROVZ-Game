import Component from './Component.js';
import Vector2 from '../MathModule/Vector2.js';
import Transform from './Transform.js';
import Camera from '../GraphicsModule/Camera.js';
import Mathematics from '../MathModule/Mathematics.js';
import Graphics from '../GraphicsModule/Graphics.js';

export default class Mesh extends Component {
  // The path to the Source Image of the Mesh
  private sourceImagePath: string;

  // The Source Image of the Mesh
  private sourceImage: HTMLImageElement;

  // The dimensions of the Mesh
  private dimensions: Vector2;

  // The current animation state of the Mesh
  private animationState: number;

  /**
   * Create a new Mesh instance
   *
   * @param sourceImagePath The path to the Source Image of the Mesh
   * @param dimensions The dimensions of the Mesh
   * @param animationState The current animation state of the Mesh
   */
  public constructor(
    // The path to the Source Image of the Mesh
    sourceImagePath: string,
    // The dimensions of the Mesh
    dimensions: Vector2,
    // The current animation state of the Mesh
    animationState: number = 0,
  ) {
    super('mesh');
    this.sourceImagePath = sourceImagePath;
    this.setSourceImage(Graphics.loadNewImage(this.sourceImagePath));
    this.dimensions = dimensions;
    this.animationState = animationState;
  }

  /**
   * Draw this GameItem appearance on the Game Canvas
   * based on rotation and current state of the animation cycle
   *
   * @param ctx the Canvas that needs to be drawn upon each cycle
   * @param transform The Transform of the GameItem
   * @param camera The Camera of the Level
   */
  public draw(ctx: CanvasRenderingContext2D, transform: Transform, camera?: Camera): void {
    // Creating a backup of the Game Canvas rendering context in the absolute coordinate system
    ctx.save();

    // Switching the Game Canvas rendering context to the relative coordinate system
    // Moving the origin of the coordinate system to the center of the future GameItem appearance
    ctx.translate(
      transform.getPosition().getX(),
      transform.getPosition().getY(),
    );
    if (camera !== undefined) {
      ctx.translate(
        -camera.getTransform().getPosition().getX() + camera.getFrameDimensions().getX() / 2,
        -camera.getTransform().getPosition().getY() + camera.getFrameDimensions().getY() / 2,
      );
    }
    // Rotating coordinate system to correspond with this GameItem rotation
    ctx.rotate(
      Mathematics.radians(
        transform.getRotation() + (camera !== undefined ? camera.getTransform().getRotation() : 0),
      ),
    );

    // Drawing the Mesh to the Game Canvas
    ctx.drawImage(
      // The Source Image of the Mesh
      this.sourceImage,
      // The position of the Mesh within the Source Image
      this.dimensions.getX() * this.animationState, 0,
      // The dimensions of the Mesh within the Source Image
      this.dimensions.getX(), this.dimensions.getY(),
      // The position of the Mesh on the Game Canvas
      -this.dimensions.getX() / 2, -this.dimensions.getY() / 2,
      // The dimensions of the Mesh on the Game Canvas
      this.dimensions.getX(), this.dimensions.getY(),
    );

    // Returning the Game Canvas rendering context to the absolute coordinate system
    ctx.restore();
  }

  /**
   * Get the path to the Source Image of this Mesh
   *
   * @returns The path to the Source Image of this Mesh
   */
  public getSourceImagePath(): string {
    return this.sourceImagePath;
  }

  /**
   * Set the path to the Source Image of this Mesh
   *
   * @param value The path to the Source Image of this Mesh
   */
  public setSourceImagePath(value: string): void {
    this.sourceImagePath = value;
    this.sourceImage = Graphics.loadNewImage(value);
  }

  /**
   * Get the Source Image of this Mesh
   *
   * @returns The Source Image of this Mesh
   */
  public getSourceImage(): HTMLImageElement {
    return this.sourceImage;
  }

  /**
   * Set the Source Image of this Mesh
   *
   * @param value The Source Image of this Mesh
   */
  public setSourceImage(value: HTMLImageElement): void {
    this.sourceImage = value;
  }

  /**
   * Get the dimensions of this Mesh
   *
   * @returns The dimensions of this Mesh
   */
  public getDimensions(): Vector2 {
    return this.dimensions;
  }

  /**
   * Set the dimensions of this Mesh
   *
   * @param value The dimensions of this Mesh
   */
  public setDimensions(value: Vector2): void {
    this.dimensions = value;
  }

  /**
   * Get the current animation state of this Mesh
   *
   * @returns The current animation state of this Mesh
   */
  public getAnimationState(): number {
    return this.animationState;
  }

  /**
   * Set the current animation state of this Mesh
   *
   * @param value The current animation state of this Mesh
   */
  public setAnimationState(value: number): void {
    this.animationState = value;
  }
}
