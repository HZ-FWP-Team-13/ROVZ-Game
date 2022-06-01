import GameObject from './GameObject.js';
import Transform from '../ComponentsModule/Transform.js';
import Mesh from '../ComponentsModule/Mesh.js';
import Input from '../InputModule/Input.js';
import Camera from '../GraphicsModule/Camera.js';

export default class GameItem extends GameObject {
  // The Mesh of the GameItem
  private mesh: Mesh;

  /**
   * Create a new GameItem instance
   *
   * @param id The id of the GameObject
   * @param transform The Transform of the GameObject
   * @param mesh The Mesh of the GameItem
   */
  public constructor(id: string, transform: Transform, mesh: Mesh) {
    super(id, transform);

    this.mesh = mesh;
  }

  /**
   * Process the Player Input to modify this GameItem
   *
   * @param input The Input matrix of the Scene
   * @param elapsed The time in seconds that has been elapsed since the previous frame
   * @param camera The Camera of the Level
   * @returns null
   */
  public control(input: Input, elapsed: number, camera?: Camera): void {
    return null;
  }

  /**
   * Get the Mesh of this GameItem
   *
   * @returns The Mesh of this GameItem
   */
  public getMesh(): Mesh {
    return this.mesh;
  }

  /**
   * Set the Mesh of this GameItem
   *
   * @param value The Mesh of this GameItem
   */
  public setMesh(value: Mesh): void {
    this.mesh = value;
  }
}
