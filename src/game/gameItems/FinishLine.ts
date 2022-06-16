import Transform from '../../engine/ComponentsModule/Transform';
import Mesh from '../../engine/ComponentsModule/Mesh.js';
import GamePawn from '../../engine/ObjectModule/GamePawn';
import RectCollider from '../../engine/ComponentsModule/RectCollider';

export default class FinishLine extends GamePawn {
  /**
   *  create a finishline
   * @param id
   * @param mesh
   * @param transform
   * @param collider
   */
  public constructor(id: string, mesh: Mesh, transform: Transform, collider: RectCollider) {
    super(id, transform, mesh, collider);
  }
}
