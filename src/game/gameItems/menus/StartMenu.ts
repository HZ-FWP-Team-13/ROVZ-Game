import Menu from '../../../engine/ObjectModule/Menu.js';
import Transform from '../../../engine/ComponentsModule/Transform.js';
import Mesh from '../../../engine/ComponentsModule/Mesh.js';

export default class StartMenu extends Menu {
  /**
   * Create a new GameItem instance
   *
   * @param id The id of the GameObject
   * @param transform The Position and rotation of the gameobjects
   * @param mesh The image cut of the GameItem
   */
  public constructor(id: string, transform: Transform, mesh: Mesh) {
    super(id, transform, mesh);
  }
}
