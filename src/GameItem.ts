import Graphics from './Graphics.js';

export default abstract class GameItem {
  // The Game Canvas rendering context
  protected ctx: CanvasRenderingContext2D;

  // The path to the source image of the GameItem appearance
  protected imgSourcePath: string;

  // The source image of the GameItem appearance
  protected imgSource: HTMLImageElement;

  // The X coordinate of the GameItem on the game canvas
  protected xPos: number;

  // The Y coordinate of the GameItem on the game canvas
  protected yPos: number;

  // The rotation of the GameItem measured in degrees
  protected rotation: number;

  // The width of the GameItem appearance
  protected frameWidth: number;

  // The height of the GameItem appearance
  protected frameHeight: number;

  // The width of the GameItem collider
  protected colliderWidth: number;

  // The height of the GameItem collider
  protected colliderHeight: number;

  // The current state of the GameItem animation cycle
  protected animationState: number;

  /**
   * Create a new GameItem instance
   *
   * @param ctx The Game Canvas rendering context
   * @param imgSourcePath The path to the source image of the GameItem appearance
   *
   * @param xPos The X coordinate of the GameItem on the game canvas
   * @param yPos The Y coordinate of the GameItem on the game canvas
   *
   * @param rotation The rotation of the GameItem measured in degrees
   *
   * @param frameWidth The width of the GameItem appearance
   * @param frameHeight The height of the GameItem appearance
   *
   * @param colliderWidth The width of the GameItem collider
   * @param colliderHeight The height of the GameItem collider
   *
   * @param animationState The current state of the GameItem animation cycle
   */
  public constructor(
    ctx: CanvasRenderingContext2D, imgSourcePath: string,
    xPos: number, yPos: number,
    rotation: number,
    frameWidth: number, frameHeight: number,
    colliderWidth: number = frameWidth, colliderHeight: number = frameHeight,
    animationState: number = 0) {

    this.ctx = ctx;
    this.imgSourcePath = imgSourcePath;
    this.imgSource = Graphics.loadNewImage(imgSourcePath);

    this.xPos = xPos;
    this.yPos = yPos;

    this.rotation = rotation;

    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    // [TODO]
    this.colliderWidth = colliderWidth;
    this.colliderHeight = colliderHeight;

    this.animationState = animationState;
  }

  /**
   * Move this GameItem across the Game Canvas within the absolute coordinate system
   *
   * @param dXAbs Deviation of the X coordinate of this GameItem in the absolute coordinate system
   * @param dYAbs Deviation of the Y coordinate of this GameItem in the absolute coordinate system
   * @param dR Deviation of the rotation of this GameItem
   */
  public moveAbsolute(dXAbs: number, dYAbs: number, dR: number = 0): void {
    this.xPos += dXAbs;
    this.yPos += dYAbs;
    if (dR != 0) {
      this.rotate(dR);
    }
  }

  /**
   * Rotate this GameItem by the given angle measured in degrees
   *
   * @param dR Deviation of the rotation of this GameItem
   */
  public rotate(dR: number): void {
    this.rotation += dR;
  }

  /**
   * Move this GameItem across the Game Canvas within the relative coordinate system
   *
   * @param dXRel Deviation of the X coordinate of this GameItem in the relative coordinate system
   * @param dYRel Deviation of the Y coordinate of this GameItem in the relative coordinate system
   */
  public moveRelative(dXRel: number, dYRel: number): void {
    // Distance to the movement destination
    let dist = Math.sqrt(dXRel**2 + dYRel**2);

    // Slope of the movement vector in the relative coordinate system
    let moveSlopeRel= Math.atan(dXRel/dYRel);
    // Slope of the movement vector in the absolute coordinate system
    let moveSlopeAbs = moveSlopeRel + this.getRotationInRadians();

    // Deviation of the X coordinate in the absolute coordinate system
    let dXAbs = dist * Math.sin(moveSlopeAbs);
    // Deviation of the Y coordinate in the absolute coordinate system
    let dYAbs = dist * Math.cos(moveSlopeAbs);

    this.moveAbsolute(dXAbs, dYAbs);
  }

  /**
   * Draw this GameItem appearance on the Game Canvas
   * based on rotation and current state of the animation cycle
   */
  public draw(): void {
    // Creation of a backup of the Game Canvas rendering context in the absolute coordinate system
    this.ctx.save();

    // Switching the Game Canvas rendering context to the relative coordinate system
    // Moving the origin of the coordinate system to the center of the future GameItem appearance
    this.ctx.translate(this.xPos, this.yPos);
    // Rotating coordinate system to correspond with this GameItem appearance rotation
    this.ctx.rotate(this.getRotationInRadians());

    this.ctx.drawImage(this.imgSource,
      this.frameWidth * this.animationState, this.frameHeight,
      this.frameWidth, this.frameHeight,
      -this.frameWidth / 2, -this.frameHeight / 2,
      this.frameWidth, this.frameHeight);

    // Return of the Game Canvas rendering context to the absolute coordinate system
    this.ctx.restore();
  }

  /**
   * Get the path to the source image of this GameItem appearance
   *
   * @returns The path to the source image of this GameItem appearance
   */
  public getImgSourcePath(): string {
    return this.imgSourcePath;
  }

  /**
   * Get the source image of this GameItem appearance
   *
   * @returns The source image of this GameItem appearance
   */
  public getImgSource(): HTMLImageElement {
    return this.imgSource;
  }

  /**
   * Get the X coordinate of this GameItem
   *
   * @returns The X coordinate of this GameItem
   */
  public getXPos(): number {
    return this.xPos;
  }

  /**
   * Get the Y coordinate of this GameItem
   *
   * @returns The Y coordinate of this GameItem
   */
  public getYPos(): number {
    return this.yPos;
  }

  /**
   * Get the rotation of this GameItem measured in degrees
   *
   * @returns The rotation of this GameItem measured in degrees
   */
  public getRotation(): number {
    return this.rotation;
  }

  /**
   * Get the rotation of this GameItem measured in radians
   *
   * @returns The rotation of this GameItem measured in radians
   */
   public getRotationInRadians(): number {
    return this.rotation / 180 * Math.PI;
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
   * Get the width of the GameItem collider
   *
   * @returns The width of the GameItem collider
   */
   public getColliderWidth(): number {
    return this.colliderWidth;
  }

  /**
   * Get the height of the GameItem collider
   *
   * @returns The height of the GameItem collider
   */
  public getColliderHeight(): number {
    return this.colliderHeight;
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
   * Set the X coordinate of this GameItem
   *
   * @param xPos The X coordinate of this GameItem
   */
  public setXPos(xPos: number): void {
    this.xPos = xPos;
  }

  /**
   * Set the Y coordinate of this GameItem
   *
   * @param yPosition The Y coordinate of this GameItem
   */
  public setYPos(yPos: number): void {
    this.yPos = yPos;
  }

  /**
   * Set the rotation of this GameItem measured in degrees
   *
   * @param rotation The rotation of this GameItem measured in degrees
   */
  public setRotation(rotation: number): void {
    this.rotation = rotation;
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
   * Set the width of the GameItem collider
   *
   * @param colliderWidth The width of the GameItem collider
   */
   public setColiderWidth(colliderWidth: number): void {
    this.colliderWidth = colliderWidth;
  }

  /**
   * Set the height of the GameItem collider
   *
   * @param colliderHeight The height of the GameItem collider
   */
  public setColiderHeight(colliderHeight: number): void {
    this.colliderHeight = colliderHeight;
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
