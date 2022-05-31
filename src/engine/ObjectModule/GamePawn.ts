import GameItem from "./GameItem.js";
import Transform from "../ComponentsModule/Transform.js";
import Mesh from "../ComponentsModule/Mesh.js";
import Collider from "../ComponentsModule/Collider.js";

export default class GamePawn extends GameItem {
  // The collider of the GamePawn
  private _collider: Collider;

  /**
   * Create a new GameItem instance
   *
   * @param id The id of the GameObject
   * @param transform The Transform of the GameObject
   * @param mesh The Mesh of the GameItem
   * @param collider The Collider of the GamePawn
   */
   public constructor(id: string, transform: Transform, mesh: Mesh, collider: Collider) {
    super(id, transform, mesh);

    this.collider = collider;
  }

  /**
   * Get the Collider of this GamePawn
   *
   * @returns The Collider of this GamePawn
   */
  public get collider(): Collider {
    return this._collider;
  }
  /**
   * Set the Collider of this GamePawn
   *
   * @param value The Collider of this GamePawn
   */
  public set collider(value: Collider) {
    this._collider = value;
  }
}
