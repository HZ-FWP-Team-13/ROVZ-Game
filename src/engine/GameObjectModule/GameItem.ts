import Transform from '../ComponentsModule/Transform.js';
import Mesh from '../ComponentsModule/Mesh.js';
import Input from '../InputModule/Input.js';

export default abstract class GameItem {
  // The Transform of the GameItem
  public _transform: Transform;

  // The Mesh of the GameItem
  public _mesh: Mesh;

  /**
   * Create a new GameItem instance
   *
   * @param transform The Transform of the GameItem
   * @param mesh The Mesh of the GameItem
   */
  public constructor(transform: Transform, mesh: Mesh) {
    this.transform = transform;
    this.mesh = mesh;
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
  get transform(): Transform {
    return this._transform;
  }

  /**
   * Set the Transform of this GameItem
   *
   * @param transform The Transform of this GameItem
   */
  set transform(transform: Transform) {
    this._transform = transform;
  }

  /**
   * Get the Mesh of this GameItem
   *
   * @returns The Mesh of this GameItem
   */
  get mesh(): Mesh {
    return this._mesh;
  }

  /**
   * Set the Mesh of this GameItem
   *
   * @param mesh The Mesh of this GameItem
   */
  set mesh(mesh: Mesh) {
    this._mesh = mesh;
  }
}
