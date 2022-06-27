import Component from './Component.js';
import GameItem from '../ObjectModule/GameItem.js';
import Input from '../InputModule/Input.js';
import Camera from '../GraphicsModule/Camera.js';
import Vector2 from '../MathModule/Vector2.js';

export default class MouseTrigger extends Component {
  // The state of the MouseTrigger
  private state: boolean;

  /**
   * Create a new MouseTrigger instance
   */
  public constructor() {
    super('mouseTrigger');
  }

  /**
   * Get `true` if the Mouse hovers over the GameItem
   *
   * @param input The Input matrix of this Scene
   * @param gameItem The GameItem
   * @param camera The Camera of the Level
   * @returns `true` if the Mouse hovers over the GameItem
   */
  public checkMouseHover(input: Input, gameItem: GameItem, camera?: Camera): boolean {
    // The position of the Mouse in coordinates relative to the Screen
    const mousePosition: Vector2 = input.getMouse().getMousePosition();

    const position: Vector2 = gameItem.getTransform().getPosition();
    const halfedDimensions: Vector2 = new Vector2(
      gameItem.getMesh().getDimensions().getX() / 2,
      gameItem.getMesh().getDimensions().getY() / 2,
    );

    const a: Vector2 = Vector2.vectorDifference(position, halfedDimensions);
    const b: Vector2 = Vector2.vectorsSum(position, halfedDimensions);

    const aTest: Vector2 = Vector2.vectorDifference(mousePosition, a);
    const bTest: Vector2 = Vector2.vectorDifference(b, mousePosition);

    // Checking wether the Mouse lies within the GameItem Mesh
    if (aTest.getX() >= 0 && aTest.getY() >= 0 && bTest.getX() >= 0 && bTest.getY() >= 0) {
      this.state = true;
    } else {
      this.state = false;
    }
    return this.state;
  }
}
