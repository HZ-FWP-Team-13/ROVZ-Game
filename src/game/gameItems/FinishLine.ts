import GameItem from '../../engine/ObjectModule/GameItem.js';
import Transform from '../../engine/ComponentsModule/Transform';
import Mesh from '../../engine/ComponentsModule/Mesh.js';

export default class FinishLine extends GameItem {
  /**
   *  create a finishline
   * @param mesh
   * @param transform
   */
  public constructor(mesh: Mesh, transform: Transform) {
    super('./assets/img/testplayer.png', transform, mesh);
  }
}
