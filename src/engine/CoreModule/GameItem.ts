import GameObject from "./GameObject.js";
import Transform from "../ComponentsModule/Transform";
import Mesh from "../ComponentsModule/Mesh";
import Input from "../InputModule/Input";

export default abstract class GameItem extends GameObject {
  // The Mesh of the GameItem
  public _mesh: Mesh;

  /**
   * Create a new GameItem instance
   *
   * @param mesh The Mesh of the GameItem
   */
  public constructor(transform: Transform, mesh: Mesh) {
    super(transform);
    this.mesh = mesh;
  }

  /**
   * Process the Player Input to modify this GameItem
   *
   * @param input of the keys when moving
   */
  public abstract control(input: Input): void;

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
