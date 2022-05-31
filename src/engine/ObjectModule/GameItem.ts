import GameObject from "./GameObject.js";
import Transform from "../ComponentsModule/Transform.js";
import Mesh from "../ComponentsModule/Mesh.js";
import Input from "../InputModule/Input.js";

export default abstract class GameItem extends GameObject {
  // The Mesh of the GameItem
  private _mesh: Mesh;

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
   * @param input of the keys when moving
   * @param elapsed the time in ms that has been elapsed since the previous frame
   */
  public abstract control(input: Input, elapsed: number): void;

  /**
   * Get the Mesh of this GameItem
   *
   * @returns The Mesh of this GameItem
   */
  public get mesh(): Mesh {
    return this._mesh;
  }
  /**
   * Set the Mesh of this GameItem
   *
   * @param value The Mesh of this GameItem
   */
  public set mesh(value: Mesh) {
    this._mesh = value;
  }
}
