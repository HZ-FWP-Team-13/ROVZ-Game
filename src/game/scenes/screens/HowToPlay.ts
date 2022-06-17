import Screen from '../../../engine/SceneModule/Screen.js';
import Game from '../../../engine/CoreModule/Game.js';
import Transform from '../../../engine/ComponentsModule/Transform.js';
import Scene from '../../../engine/SceneModule/Scene.js';
import Vector2 from '../../../engine/MathModule/Vector2.js';
import HowToPlayMenu from '../../gameItems/menus/HowToPlayMenu.js';
import Start from './Start.js';
import Graphics from '../../../engine/GraphicsModule/Graphics.js';

export default class HowToPlay extends Screen {
  // The Menu of the HowToPlay Screen
  private menu: HowToPlayMenu;

  /**
   * Create a new HowToPlay Screen instance
   *
   * @param game The Game namespace
   */
  public constructor(game: Game) {
    super(game);

    // Spawning the Menu
    this.menu = new HowToPlayMenu(
      new Map<string, Transform>([
        [
          'gotIt',
          new Transform(new Vector2(game.canvas.width / 2, game.canvas.height / 2 + 200)),
        ],
      ]),
    );

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
    const hoveredOption = this.menu.update(this.input);
    if (this.input.getMouse().getMouseButtons() === 1) {
      this.input.getMouse().setMouseButtons(0);
      if (hoveredOption === 'gotIt') {
        return new Start(this.game);
      }
    }
    return null;
  }

  /**
   * Render this HowToPlay Screen to the Game Canvas
   */
  public render(): void {
    // Clearing the screen
    this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
    this.game.ctx.fillStyle = 'black';
    this.game.ctx.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);

    this.game.ctx.fillStyle = 'white';
    let text: string = 'Naar voren / achteren fietsen';
    this.game.ctx.fillText(
      text,
      this.game.canvas.width / 2 - 250,
      this.game.canvas.height / 2 - 200,
    );

    this.game.ctx.drawImage(
      Graphics.loadNewImage('./assets/img/w.png'),
      this.game.canvas.width / 2 + 100,
      this.game.canvas.height / 2 - 200 - 69 / 2,
      69, 69,
    );

    this.game.ctx.drawImage(
      Graphics.loadNewImage('./assets/img/s.png'),
      this.game.canvas.width / 2 + 200,
      this.game.canvas.height / 2 - 200 - 69 / 2,
      69, 69,
    );

    text = 'Sturen';
    this.game.ctx.fillText(
      text,
      this.game.canvas.width / 2 - 250,
      this.game.canvas.height / 2 - 70,
    );

    this.game.ctx.drawImage(
      Graphics.loadNewImage('./assets/img/a.png'),
      this.game.canvas.width / 2 + 100,
      this.game.canvas.height / 2 - 70 - 69 / 2,
      69, 69,
    );

    this.game.ctx.drawImage(
      Graphics.loadNewImage('./assets/img/d.png'),
      this.game.canvas.width / 2 + 200,
      this.game.canvas.height / 2 - 70 - 69 / 2,
      69, 69,
    );

    text = 'Kijken';
    this.game.ctx.fillText(
      text,
      this.game.canvas.width / 2 - 250,
      this.game.canvas.height / 2 + 60,
    );

    this.game.ctx.drawImage(
      Graphics.loadNewImage('./assets/img/mouse.png'),
      this.game.canvas.width / 2 + 151,
      this.game.canvas.height / 2 + 60 - 69 / 2,
      69, 69,
    );

    this.menu.draw(this.game.ctx);

    // this.game.ctx.drawImage(Graphics.loadNewImage('./assets/img/startscreen.png'),
    //   0, 0, this.game.canvas.width, this.game.canvas.height);
  }
}
