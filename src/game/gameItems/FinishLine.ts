import Transform from '../../engine/ComponentsModule/Transform.js';
import Mesh from '../../engine/ComponentsModule/Mesh.js';
import GamePawn from '../../engine/ObjectModule/GamePawn.js';
import RectCollider from '../../engine/ComponentsModule/RectCollider.js';

export default class FinishLine extends GamePawn {
  /**
   *  create a finishline
   *
   * @param id the id of the finishline
   * @param mesh the mesh of the finishline
   * @param transform the transform of the finishline
   * @param collider the collider of the finishline
   */
  public constructor(id: string, mesh: Mesh, transform: Transform, collider: RectCollider) {
    super(id, transform, mesh, collider);
  }
}
