import Transform from './experimenting/Transform.js';
import Graphics from './Graphics.js';

export default class Mesh {
  // The path to the Source Image of the GameItem appearance
  protected imgSourcePath: string;

  // The Source Image of the GameItem appearance
  protected imgSource: HTMLImageElement;

  // The width of the GameItem appearance
  protected frameWidth: number;

  // The height of the GameItem appearance
  protected frameHeight: number;

  // The current state of the GameItem animation cycle
  protected animationState: number;

  /**
   * Mesh is a class that stores the movement and drawing functions
   *
   * @param imgSourcePath the path of the image
   * @param frameWidth the Width of the image
   * @param frameHeight the height of the image
   * @param animationState state of animation
   */
  public constructor(
    imgSourcePath: string,
    frameWidth: number,
    frameHeight: number,
    animationState: number,
  ) {
    // Set the source of the image path to be the image using setImageSource
    this.imgSourcePath = imgSourcePath;
    this.setImgSource(imgSourcePath);

    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.animationState = animationState;
  }

  /**
   * Draw this GameItem appearance on the Game Canvas
   * based on rotation and current state of the animation cycle
   *
   * @param ctx the Canvas that needs to be drawn upon each cycle
   * @param transform ---
   */
  public draw(ctx: CanvasRenderingContext2D, transform: Transform): void {
    // Creating a backup of the Game Canvas rendering context in the absolute coordinate system
    ctx.save();

    // Switching the Game Canvas rendering context to the relative coordinate system
    // Moving the origin of the coordinate system to the center of the future GameItem appearance
    ctx.translate(transform.position.x, transform.position.y);
    // Rotating coordinate system to correspond with this GameItem rotation
    ctx.rotate(transform.getRotationInRadians());

    //
    ctx.drawImage(this.imgSource,
      this.frameWidth * this.animationState, 0,
      this.frameWidth, this.frameHeight,
      -this.frameWidth / 2, -this.frameHeight / 2,
      this.frameWidth, this.frameHeight);

    // Returning the Game Canvas rendering context to the absolute coordinate system
    ctx.restore();
  }

  /**
   * Get the path to the Source Image of this GameItem appearance
   *
   * @returns The path to the Source Image of this GameItem appearance
   */
  public getImgSourcePath(): string {
    return this.imgSourcePath;
  }

  /**
   * Get the Source Image of this GameItem appearance
   *
   * @returns The Source Image of this GameItem appearance
   */
  public getImgSource(): HTMLImageElement {
    return this.imgSource;
  }

  /**
   * Get the width of the GameItem appearance
   *
   * @returns The width of the GameItem appearance
   */
  public getFrameWidth(): number {
    return this.frameWidth;
  }

  /**
   * Get the height of the GameItem appearance
   *
   * @returns The height of the GameItem appearance
   */
  public getFrameHeight(): number {
    return this.frameHeight;
  }

  /**
   * Get the current state of this GameItem animation cycle
   *
   * @returns The current state of this GameItem animation cycle
   */
  public getAnimationState(): number {
    return this.animationState;
  }

  /**
   * Set the Source Image of this GameItem appearance
   *
   * @param imgSourcePath The path to the Source Image of this GameItem appearance
   */
  public setImgSource(imgSourcePath: string): void {
    this.imgSource = Graphics.loadNewImage(imgSourcePath);
  }

  /**
   * Set the width of the GameItem appearance
   *
   * @param frameWidth The width of the GameItem appearance
   */
  public setFrameWidth(frameWidth: number): void {
    this.frameWidth = frameWidth;
  }

  /**
   * Set the height of the GameItem appearance
   *
   * @param frameHeight The height of the GameItem appearance
   */
  public setFrameHeight(frameHeight: number): void {
    this.frameHeight = frameHeight;
  }

  /**
   * Set the current state of this GameItem animation cycle
   *
   * @param animationState The current state of this GameItem animation cycle
   */
  public setAnimationState(animationState: number): void {
    this.animationState = animationState;
  }
}
