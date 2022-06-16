import Collider from '../../../engine/ComponentsModule/Collider.js';
import Mesh from '../../../engine/ComponentsModule/Mesh.js';
import Transform from '../../../engine/ComponentsModule/Transform.js';
import GamePawn from '../../../engine/ObjectModule/GamePawn.js';

export default class Building extends GamePawn {
  /**
   * Create a new Building instance
   *
   * @param id The id of the GameObject
   * @param transform The Transform of the GameObject
   * @param mesh The Mesh of the GameItem
   * @param collider The Collider of the GamePawn
   */
  public constructor(id: string, transform: Transform, mesh: Mesh, collider: Collider) {
    super(id, transform, mesh, collider);

    this.createColliderPoints();
  }
}
