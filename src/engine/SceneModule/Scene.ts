import Game from '../CoreModule/Game.js';
import Input from '../InputModule/Input.js';

/**
 * A superclass for objects that must be able to be animated by a `GameLoop`.
 *
 * Implementing classes must override the three methods `update(elapsed)` and `render()`.
 *
 * @see GameLoop
 * @author BugSlayer
 */
export default abstract class Scene {
  protected readonly game: Game;

  // The Input matrix of the Scene
  protected input: Input;

  /**
   * Keeping the gameitems map here after testing to bring it back when needed.
   */
  // protected gameItems: Map<string, GameObject>;

  /**
   * Create a new Scene instance
   *
   * @param game The Game namespace
   */
  public constructor(game: Game) {
    this.game = game;
    this.input = new Input();
  }

  /**
   * Advances the game simulation one step. It may run AI and physics (usually
   * in that order). The return value of this method determines what the `GameLoop`
   * that is animating this object will do next. If `null` is returned, the
   * GameLoop will render this scene and proceeds to the next animation frame.
   * If this methods returns a `Scene` (subclass) object, it will NOT render this
   * scene but will start considering that object as the current scene to animate.
   * In other words, by returning a Scene object, you can set the next scene to
   * animate.
   *
   * @param elapsed the time in seconds that has been elapsed since the previous frame
   * @returns a new `Scene` object if the game should start animating that scene
   *   on the next animation frame. If the game should just continue with the
   *   current scene, just return `null`
   */
  public abstract update(elapsed: number): Scene;

  /**
   * Render this Scene to the Game Canvas
   */
  public abstract render(): void;
}
