import GameObject from "./GameObject.js";
import Transform from "../ComponentsModule/Transform";
import Input from "../InputModule/Input";

export default abstract class GameItem extends GameObject {
  // The Transform of the GameItem
  private _transform: Transform;

  /**
   * Create a new GameItem instance
   *
   * @param id The id of the GameObject
   * @param transform The Transform of the GameItem
   */
  public constructor(id: string, transform: Transform) {
    super(id);
    this.transform = transform;
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
  public get transform(): Transform {
    return this._transform;
  }
  /**
   * Set the Transform of this GameItem
   *
   * @param value The Transform of this GameItem
   */
  public set transform(value: Transform) {
    this._transform = value;
  }
}
