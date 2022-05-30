import Component from '../CoreModule/Component.js';
import Vector2 from '../MathModule/Vector2.js';
import Transform from './Transform.js';
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
    this.loadNewImage(sourceImagePath);
    this.dimensions = dimensions;
    this.animationState = animationState;
  }

  /**
   * Load and set a new Source Image from a given or stored path
   *
   * @param sourceImagePath The given path to the Source Image of this Mesh
   * @returns The new Source Image
   */
  public loadNewImage(sourceImagePath: string = null): HTMLImageElement {
    if (sourceImagePath == null) {
      this.sourceImagePath = sourceImagePath;
      return this.sourceImage = Graphics.loadNewImage(this.sourceImagePath);
    }
    return this.sourceImage = Graphics.loadNewImage(sourceImagePath);
  }

  /**
   * Draw this GameObject appearance on the Game Canvas
   * based on rotation and current state of the animation cycle
   *
   * @param ctx the Canvas that needs to be drawn upon each cycle
   * @param transform ---
   */
  public draw(ctx: CanvasRenderingContext2D, transform: Transform): void {
    // Creating a backup of the Game Canvas rendering context in the absolute coordinate system
    ctx.save();

    // Switching the Game Canvas rendering context to the relative coordinate system
    // Moving the origin of the coordinate system to the center of the future GameObject appearance
    ctx.translate(transform.position.x, transform.position.y);
    // Rotating coordinate system to correspond with this GameObject rotation
    ctx.rotate(Mathematics.radians(transform.rotation));

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
      this.dimensions.x, this.dimensions.y);

    // Returning the Game Canvas rendering context to the absolute coordinate system
    ctx.restore();
  }

  /**
   * Get the path to the Source Image of this Mesh
   *
   * @returns The path to the Source Image of this Mesh
   */
  get sourceImagePath(): string {
    return this._sourceImagePath;
  }

  /**
   * Set the path to the Source Image of this Mesh
   *
   * @param sourceImagePath The path to the Source Image of this Mesh
   */
  set sourceImagePath(sourceImagePath: string) {
    this._sourceImagePath = sourceImagePath;
  }

  /**
   * Get the Source Image of this Mesh
   *
   * @returns The Source Image of this Mesh
   */
  get sourceImage(): HTMLImageElement {
    return this._sourceImage;
  }

  /**
   * Set the Source Image of this Mesh
   *
   * @param sourceImage The Source Image of this Mesh
   */
  set sourceImage(sourceImage: HTMLImageElement) {
    this._sourceImage = sourceImage;
  }

  /**
   * Get the dimensions of this Mesh
   *
   * @returns The dimensions of this Mesh
   */
  get dimensions(): Vector2 {
    return this._dimensions;
  }

  /**
   * Set the dimensions of this Mesh
   *
   * @param dimensions The width of this Mesh
   */
  set dimensions(dimensions: Vector2) {
    this._dimensions = dimensions;
  }

  /**
   * Get the current animation state of this Mesh
   *
   * @returns The current animation state of this Mesh
   */
  get animationState(): number {
    return this._animationState;
  }

  /**
   * Set the current animation state of this Mesh
   *
   * @param animationState The current animation state of this Mesh
   */
  set animationState(animationState: number) {
    this._animationState = animationState;
  }
}
