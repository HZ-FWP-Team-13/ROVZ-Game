import Screen from '../../../engine/SceneModule/Screen.js';
import Game from '../../../engine/CoreModule/Game.js';
import Scene from '../../../engine/SceneModule/Scene.js';
import Level1 from '../levels/Level1.js';
import StartMenu from '../../gameItems/menus/StartMenu.js';
import Transform from '../../../engine/ComponentsModule/Transform.js';
import Mesh from '../../../engine/ComponentsModule/Mesh.js';
import Vector2 from '../../../engine/MathModule/Vector2.js';

export default class Start extends Screen {
  private startMenu: StartMenu;

  /**
   * Create a new Start Screen instance
   *
   * @param game The Game namespace
   */
  public constructor(game: Game) {
    super(game);
    game.reset();

    this.startMenu = new StartMenu(
      'startmenu',
      new Transform(),
      new Mesh(
        './assets/img/startscreen.png',
        new Vector2(this.game.canvas.width, this.game.canvas.height),
      ),
    );
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
    // this.startMenu.getTransform().setPosition(this.startMenu.getTransform().setPosition());
    // TODO: The start menu
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
    // this.game.ctx.drawImage(Graphics.loadNewImage('./assets/img/startscreen.png'),
    //   0, 0, this.game.canvas.width, this.game.canvas.height);

    this.startMenu.getMesh().drawMenu(this.game.ctx, this.startMenu.getTransform());
  }
}
