import Game from '../../../engine/Game.js';
import Graphics from '../../../engine/Graphics.js';
import Scene from '../../../engine/Scene.js';
import Screen from '../../../engine/Screen.js';
import Level1 from '../levels/Level1.js';

export default class Start extends Screen {
  /**
   * Create a new Start Screen instance
   *
   * @param game The Game namespace
   */
  public constructor(game: Game) {
    super(game);
    game.reset();
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
    if (this.input.readAxisTyped('Select')) {
      return new Level1(this.game);
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
