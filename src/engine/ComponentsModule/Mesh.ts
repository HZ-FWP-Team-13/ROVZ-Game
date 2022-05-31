import Component from '../CoreModule/Component.js';
import Vector2 from '../MathModule/Vector2.js';
import Transform from './Transform.js';
import Camera from '../GraphicsModule/Camera.js';
import Mathematics from '../MathModule/Mathematics.js';
import Graphics from '../GraphicsModule/Graphics.js';

export default class Mesh extends Component {
  // The path to the Source Image of the Mesh
  private _sourceImagePath: string;

  // The Source Image of the Mesh
  private _sourceImage: HTMLImageElement;

  // The dimensions of the Mesh
  private _dimensions: Vector2;

  // The current animation state of the Mesh
  private _animationState: number;

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
    super("mesh");
    this.sourceImagePath = sourceImagePath;
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
      transform.position.x - (camera != undefined ? camera.transform.position.x - camera.frameDimensions.x / 2 : 0),
      transform.position.y - (camera != undefined ? camera.transform.position.y - camera.frameDimensions.y / 2 : 0)
    );
    // Rotating coordinate system to correspond with this GameItem rotation
    ctx.rotate(Mathematics.radians(transform.rotation + (camera != undefined ? camera.transform.rotation : 0)));

    // Drawing the Mesh to the Game Canvas
    ctx.drawImage(
      // The Source Image of the Mesh
      this.sourceImage,
      // The position of the Mesh within the Source Image
      this.dimensions.x * this.animationState, 0,
      // The dimensions of the Mesh within the Source Image
      this.dimensions.x, this.dimensions.y,
      // The position of the Mesh on the Game Canvas
      -this.dimensions.x / 2, -this.dimensions.y / 2,
      // The dimensions of the Mesh on the Game Canvas
      this.dimensions.x, this.dimensions.y
    );

    // Returning the Game Canvas rendering context to the absolute coordinate system
    ctx.restore();
  }

  /**
   * Get the path to the Source Image of this Mesh
   *
   * @returns The path to the Source Image of this Mesh
   */
  public get sourceImagePath(): string {
    return this._sourceImagePath;
  }
  /**
   * Set the path to the Source Image of this Mesh
   *
   * @param value The path to the Source Image of this Mesh
   */
  public set sourceImagePath(value: string) {
    this._sourceImagePath = value;
    this.sourceImage = Graphics.loadNewImage(value)
  }

  /**
   * Get the Source Image of this Mesh
   *
   * @returns The Source Image of this Mesh
   */
  public get sourceImage(): HTMLImageElement {
    return this._sourceImage;
  }
  /**
   * Set the Source Image of this Mesh
   *
   * @param value The Source Image of this Mesh
   */
  public set sourceImage(value: HTMLImageElement) {
    this._sourceImage = value;
  }

  /**
   * Get the dimensions of this Mesh
   *
   * @returns The dimensions of this Mesh
   */
  public get dimensions(): Vector2 {
    return this._dimensions;
  }
  /**
   * Set the dimensions of this Mesh
   *
   * @param value The width of this Mesh
   */
  public set dimensions(value: Vector2) {
    this._dimensions = value;
  }

  /**
   * Get the current animation state of this Mesh
   *
   * @returns The current animation state of this Mesh
   */
  public get animationState(): number {
    return this._animationState;
  }
  /**
   * Set the current animation state of this Mesh
   *
   * @param value The current animation state of this Mesh
   */
  public set animationState(value: number) {
    this._animationState = value;
  }
}
