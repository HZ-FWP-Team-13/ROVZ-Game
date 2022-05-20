import Transform from './experimenting/Transform.js';
import Input from './Input.js';
import Mesh from './Mesh.js';

export default abstract class GameItem {
  // Transforms
  public transform: Transform;

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

  /**
   * Process the Player Input to modify this GameItem
   *
   * @param input of the keys when moving
   */
  public abstract control(input: Input): void;

  /**
   * Get the Transform of this GameItem
   *
   * @returns The Transform of this GameItem
   */
  public getTransform(): Transform {
    return this.transform;
  }
}
