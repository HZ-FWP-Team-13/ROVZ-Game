import GameItem from './GameItem.js';
import Transform from '../ComponentsModule/Transform.js';
import Mesh from '../ComponentsModule/Mesh.js';

export default class Menu extends GameItem {
  /**
   * Create a new GameItem instance
   *
   * @param id The id of the GameObject
   * @param transform The Transform of the GameObject
   * @param mesh The Mesh of the GameItem
   */
  public constructor(id: string, transform: Transform, mesh: Mesh) {
    super(id, transform, mesh);
  }
}
