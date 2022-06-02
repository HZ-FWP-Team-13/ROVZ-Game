import Transform from '../ComponentsModule/Transform.js';
import Mesh from '../ComponentsModule/Mesh.js';
import Collider from '../ComponentsModule/Collider.js';
import GamePawn from './GamePawn.js';

export default class MenuButton extends GamePawn {
  // The collider of the GamePawn

  /**
   * Create a new GameItem instance
   *
   * @param id The id of the GameObject
   * @param transform The Transform of the GameObject
   * @param mesh The Mesh of the GameItem
   * @param collider The Collider of the GamePawn
   */
  public constructor(id: string, transform: Transform, mesh: Mesh, collider: Collider) {
    super(id, transform, mesh, collider);
  }
}
