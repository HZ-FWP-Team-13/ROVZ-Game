import GameItem from './GameItem.js';
import Transform from '../ComponentsModule/Transform.js';
import Mesh from '../ComponentsModule/Mesh.js';
import RectCollider from '../ComponentsModule/RectCollider.js';
import Collider from '../ComponentsModule/Collider.js';

export default class GamePawn extends GameItem {
  // The collider of the GamePawn
  private collider: Collider;

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
   * Create a new instance of a rectangular collider
   */
  public createColliderPoints(): void {
    this.getCollider().generateRectCollider(
      this.getMesh().getDimensions().getX(),
      this.getMesh().getDimensions().getY(),
    );
  }

  /**
   * Get the Collider of this GamePawn
   *
   * @returns The Collider of this GamePawn
   */
  public getCollider(): RectCollider {
    return this.collider;
  }

  /**
   * Set the Collider of this GamePawn
   *
   * @param value The Collider of this GamePawn
   */
  public setCollider(value: Collider): void {
    this.collider = value;
  }
}
