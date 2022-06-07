import Menu from '../../../engine/ObjectModule/Menu.js';
import Transform from '../../../engine/ComponentsModule/Transform.js';
import Mesh from '../../../engine/ComponentsModule/Mesh.js';
import Input from '../../../engine/InputModule/Input.js';
import MouseListener from '../../../engine/InputModule/MouseListener.js';

export default class StartMenu extends Menu {
  private input: Input;

  private mouseListener: MouseListener;

  /**
   * Create a new GameItem instance
   *
   * @param id The id of the GameObject
   * @param transform The Position and rotation of the gameobjects
   * @param mesh The image cut of the GameItem
   */
  public constructor(id: string, transform: Transform, mesh: Mesh) {
    super(id, transform, mesh);
    this.input = new Input();
    this.mouseListener = new MouseListener();
  }

  /**
   * logs the clicks either true or false
   */
  public logClicks():boolean {
    if (this.input.getMouse().getMouseButtons() === 1) {
      this.mouseListener.getMouseInAction();
      console.log('yay you clicked');
      return true;
    }
    return false;
  }
}
