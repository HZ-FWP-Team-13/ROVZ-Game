import Screen from '../../../engine/SceneModule/Screen.js';
import Game from '../../../engine/CoreModule/Game.js';
import Transform from '../../../engine/ComponentsModule/Transform.js';
import Scene from '../../../engine/SceneModule/Scene.js';
import Level1 from '../levels/Level1.js';
import Vector2 from '../../../engine/MathModule/Vector2.js';
import StartMenu from '../../gameItems/menus/StartMenu.js';
import HowToPlay from './HowToPlay.js';
import GameOverMenu from '../../gameItems/menus/GameOverMenu copy.js';
import Start from './Start.js';

export default class GameOver extends Screen {
  // The Menu of the Start Screen
  private menu: StartMenu;

  private state: string;

  /**
   * Create a new Start Screen instance
   *
   * @param game The Game namespace
   * @param state Gamestate: 'WIN' or 'LOSS'
   */
  public constructor(game: Game, state: string) {
    super(game);
    this.state = state;

    const textXPos = this.game.canvas.width / 2;
    const textYPos = this.game.canvas.height / 2;

    // Spawning the Menu
    this.menu = new GameOverMenu(
      new Map<string, Transform>([
        [
          'play',
          new Transform(new Vector2(textXPos, textYPos + 200)),
        ],
        [
          'returnToTitle',
          new Transform(new Vector2(textXPos, textYPos + 260)),
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
      if (hoveredOption === 'play') {
        return new Level1(this.game);
      }
      if (hoveredOption === 'returnToTitle') {
        return new Start(this.game);
      }
    }
    return null;
  }

  /**
   * Render this Start Scene to the Game Canvas
   */
  public render(): void {
    const { ctx } = this.game;

    // Clearing the screen
    ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);

    this.menu.draw(this.game.ctx);

    const textXPos = this.game.canvas.width / 2;
    const textYPos = this.game.canvas.height / 2;

    ctx.textAlign = 'center';

    if (this.state === 'LOSS') {
      ctx.fillStyle = 'red';
      const text: string = 'GAME OVER!';
      ctx.fillText(
        text,
        textXPos,
        textYPos,
      );
    } else if (this.state === 'WIN') {
      ctx.fillStyle = 'green';
      const text: string = 'LEVEL VOLTOOD!';
      ctx.fillText(
        text,
        textXPos,
        textYPos,
      );
    }

    // this.game.ctx.drawImage(Graphics.loadNewImage('./assets/img/startscreen.png'),
    //   0, 0, this.game.canvas.width, this.game.canvas.height);
  }
}
