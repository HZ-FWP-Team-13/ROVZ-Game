import Transform from '../ComponentsModule/Transform.js';
import Mesh from '../ComponentsModule/Mesh.js';
import Input from '../InputModule/Input.js';

export default abstract class GameObject {
  // The Transform of the GameObject
  public _transform: Transform;

  // The Mesh of the GameObject
  public _mesh: Mesh;

  /**
   * Create a new GameObject instance
   *
   * @param transform The Transform of the GameObject
   * @param mesh The Mesh of the GameObject
   */
  public constructor(transform: Transform, mesh: Mesh) {
    this.transform = transform;
    this.mesh = mesh;
  }

  /**
   * Process the Player Input to modify this GameObject
   *
   * @param input of the keys when moving
   */
  public abstract control(input: Input): void;

  /**
   * Get the Transform of this GameObject
   *
   * @returns The Transform of this GameObject
   */
  get transform(): Transform {
    return this._transform;
  }

  /**
   * Set the Transform of this GameObject
   *
   * @param transform The Transform of this GameObject
   */
  set transform(transform: Transform) {
    this._transform = transform;
  }

  /**
   * Get the Mesh of this GameObject
   *
   * @returns The Mesh of this GameObject
   */
  get mesh(): Mesh {
    return this._mesh;
  }

  /**
   * Set the Mesh of this GameObject
   *
   * @param mesh The Mesh of this GameObject
   */
  set mesh(mesh: Mesh) {
    this._mesh = mesh;
  }
}
