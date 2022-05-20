import Transform from './experimenting/Transform.js';
import Input from './Input.js';
import Mesh from './Mesh.js';

export default abstract class GameItem {
  // Transforms
  public transform: Transform;

  // The X coordinate of the GameItem on the game canvas
  // protected xPos: number;

  // The Y coordinate of the GameItem on the game canvas
  // protected yPos: number;

  // The rotation of the GameItem measured in degrees
  // protected rotation: number;

  // All the variables and functions to show an item on the screen
  public mesh: Mesh;

  /**
   * Create a new GameItem instance
   *
   * @param imgSourcePath The path to the Source Image of the GameItem appearance
   * @param xPos The X coordinate of the GameItem on the game canvas
   * @param yPos The Y coordinate of the GameItem on the game canvas
   * @param rotation The rotation of the GameItem measured in degrees
   * @param frameWidth The width of the GameItem appearance
   * @param frameHeight The height of the GameItem appearance
   * @param animationState The current state of the GameItem animation cycle
   */
  public constructor(
    imgSourcePath: string,
    xPos: number, yPos: number,
    rotation: number,
    frameWidth: number, frameHeight: number,
    animationState: number = 0,
  ) {
    this.transform = new Transform(xPos, yPos, rotation);
    this.mesh = new Mesh(imgSourcePath, frameWidth, frameHeight, animationState);
  }

  // /**
  //    * Move this GameItem across the Game Canvas within the absolute coordinate system
  //    *
  //    * @param dXAbs Deviation of the X coordinate of this GameItem in the absolute coordinate system
  //    * @param dYAbs Deviation of the Y coordinate of this GameItem in the absolute coordinate system
  //    * @param dR Deviation of the rotation of this GameItem
  //    */
  //   public moveAbsolute(dXAbs: number, dYAbs: number, dR: number = 0): void {
  //     this.xPos += dXAbs;
  //     this.yPos += dYAbs;
  //     this.rotate(dR);
  //   }

  // /**
  //  * Rotate this GameItem by the given angle measured in degrees
  //  *
  //  * @param dR Deviation of the rotation of this GameItem
  //  */
  // public rotate(dR: number): void {
  //   this.rotation += dR;
  // }

  // /**
  //  * Move this GameItem across the Game Canvas within the relative coordinate system
  //  *
  //  * @param dXRel Deviation of the X coordinate of this GameItem in the relative coordinate system
  //  * @param dYRel Deviation of the Y coordinate of this GameItem in the relative coordinate system
  //  */
  // public moveRelative(dXRel: number, dYRel: number): void {
  //   // Distance to the movement destination
  //   const dist = Math.sqrt(dXRel ** 2 + dYRel ** 2) * (dXRel >= 0 ? 1 : -1) * (dYRel >= 0 ? 1 : -1);

  //   // Slope of the movement vector in the relative coordinate system
  //   const moveSlopeRel = Math.atan(dXRel / dYRel);
  //   // Slope of the movement vector in the absolute coordinate system
  //   const moveSlopeAbs = moveSlopeRel + this.getRotationInRadians();

  //   // Deviation of the X coordinate in the absolute coordinate system
  //   const dXAbs = dist * Math.sin(moveSlopeAbs);
  //   // Deviation of the Y coordinate in the absolute coordinate system
  //   const dYAbs = dist * Math.cos(moveSlopeAbs);

  //   console.log(Math.atan(dXRel / dYRel));

  //   // Moving this GameItem across the Game Canvas within the absolute coordinate system
  //   this.moveAbsolute(dXAbs, -dYAbs);
  // }

  /**
   * Process the Player Input to modify this GameItem
   *
   * @param input of the keys when moving
   */
  public abstract control(input: Input): void;

  /**
   * Get the X coordinate of this GameItem
   *
   * @returns The X coordinate of this GameItem
   */
  public getXPos(): number {
    return this.transform.position.x;
  }

  /**
   * Get the Y coordinate of this GameItem
   *
   * @returns The Y coordinate of this GameItem
   */
  public getYPos(): number {
    return this.transform.position.y;
  }

  /**
   * Get the rotation of this GameItem measured in degrees
   *
   * @returns The rotation of this GameItem measured in degrees
   */
  public getRotation(): number {
    return this.transform.orientation;
  }

  // /**
  //  * Get the rotation of this GameItem measured in radians
  //  *
  //  * @returns The rotation of this GameItem measured in radians
  //  */
  // public getRotationInRadians(): number {
  //   return (this.rotation / 180) * Math.PI;
  // }

  /**
   * Set the X coordinate of this GameItem
   *
   * @param xPos The X coordinate of this GameItem
   */
  public setXPos(xPos: number): void {
    this.transform.position.x = xPos;
  }

  /**
   * Set the Y coordinate of this GameItem
   *
   * @param yPos The Y coordinate of this GameItem
   */
  public setYPos(yPos: number): void {
    this.transform.position.y = yPos;
  }

  /**
   * Set the rotation of this GameItem measured in degrees
   *
   * @param rotation The rotation of this GameItem measured in degrees
   */
  public setRotation(rotation: number): void {
    this.transform.orientation = rotation;
  }

  public getTransform(): Transform {
    return this.transform;
  }
}
