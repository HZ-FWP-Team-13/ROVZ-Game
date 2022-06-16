import Game from '../../../engine/CoreModule/Game.js';
import KeyListener from '../../../engine/InputModule/KeyListener.js';
import Scene from '../../../engine/SceneModule/Scene.js';
import Start from './Start.js';

export default class GameWon extends Scene {
  private shouldStart: boolean;

  private keyboard: KeyListener;

  private gradient: CanvasGradient;

  /**
   * Creates a new instance of this class
   *
   * @param game the game object where this scene will be a part of
   */
  public constructor(game: Game) {
    super(game);
    this.keyboard = new KeyListener();
    this.shouldStart = false;
  }

  /**
   * Handles any user input that has happened since the last call
   */
  public processInput(): void {
    if (this.keyboard.isKeyDown(KeyListener.KEY_R)) {
      this.shouldStart = true;
    }

    if (this.keyboard.isKeyDown(KeyListener.KEY_SPACE)) {
      this.shouldStart = true;
      console.log(this.shouldStart);
    }
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
    if (this.shouldStart) {
      return new Start(this.game);
    }
    return null;
  }

  /**
   * Draw the game so the player can see what happened
   */
  public render(): void {
    // Clear the screen
    this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
    // draw text and font styles
    this.game.ctx.fillText('Congratulations, you passed the level!', 100, 200);
    this.game.ctx.font = '85px san-serif';
    // create a gradient
    this.gradient = this.game.ctx.createLinearGradient(0, 0, this.game.canvas.width, 0);
    this.gradient.addColorStop(0, 'red');
    this.gradient.addColorStop(0.5, 'orange');
    this.gradient.addColorStop(1.0, 'yellow');
    // Fill with gradient
    this.game.ctx.fillStyle = this.gradient;
  }
}
