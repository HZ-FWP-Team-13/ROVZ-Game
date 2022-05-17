import Game from './Game.js';
import Graphics from './Graphics.js';
import Input from './Input.js';
import Level from './Level.js';
import Scene from './Scene.js';

export default class Start extends Scene {
  // Input to read the Player controls
  private input: Input;

  /**
   * Create a new Start Scene instance
   *
   * @param game The Game namespace
   */
  public constructor(game: Game) {
    super(game);
    game.reset();
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
   * @returns a new `Scene` object if the game should start animating that scene
   *   on the next animation frame. If the game should just continue with the
   *   current scene, just return `null`
   */
  public update(): Scene {
    if (this.input.readStartInput()) {
      return new Level(this.game);
    }
    return null;
  }

  /**
   * Render this Start Scene to the Game Canvas
   */
  public render(): void {
    // Clearing the screen
    this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
    // Showing the score
    this.game.ctx.drawImage(Graphics.loadNewImage('./assets/img/startscreen.png'),
      0, 0, this.game.canvas.width, this.game.canvas.height);
  }
}
