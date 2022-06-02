import Collider from './Collider.js';
import GamePawn from '../ObjectModule/GamePawn.js';
import MouseListener from '../InputModule/MouseListener';

export default class MouseCollider extends Collider {
  /**
   *
   * @param gameItem the button
   * @param mouse the mouse duh
   * @returns true if this object collides with the specified other object
   */
  // eslint-disable-next-line class-methods-use-this
  public mouseCollides(gameItem: GamePawn, mouse: MouseListener): boolean {
    return gameItem.getTransform().getPosition().getX() < mouse.getMousePosition().getX()
        && gameItem.getTransform().getPosition().getX()
        + gameItem.getMesh().getSourceImage().width > mouse.getMousePosition().getX()
        && gameItem.getTransform().getPosition().getY() < mouse.getMousePosition().getY()
        && gameItem.getTransform().getPosition().getY()
        + gameItem.getMesh().getSourceImage().height > mouse.getMousePosition().getY();
  }
}
