import Screen from '../../../engine/SceneModule/Screen.js';
import Game from '../../../engine/CoreModule/Game.js';
import Transform from '../../../engine/ComponentsModule/Transform.js';
import Scene from '../../../engine/SceneModule/Scene.js';
import Level1 from '../levels/Level1.js';
import Mesh from '../../../engine/ComponentsModule/Mesh.js';
import Vector2 from '../../../engine/MathModule/Vector2.js';
import GameItem from '../../../engine/ObjectModule/GameItem.js';
import StartMenu from '../../gameItems/menus/StartMenu.js';
import HowToPlay from './HowToPlay.js';

export default class Start extends Screen {
  private titleImage: GameItem;

  // The Menu of the Start Screen
  private menu: StartMenu;

  /**
   * Create a new Start Screen instance
   *
   * @param game The Game namespace
   */
  public constructor(game: Game) {
    super(game);

    this.titleImage = new GameItem(
      // The id of the GameObject
      'titleImage',
      // The Transform of the GameObject
      new Transform(new Vector2(game.canvas.width / 2, game.canvas.height / 2 - 100)),
      // The Transform of the GameItem
      new Mesh(
        // The path to the Source Image of the GameItem Mesh
        './assets/img/titleBike.png',
        // The dimensions of the GameItem Mesh
        new Vector2(574, 376),
      ),
    );

    // Spawning the Menu
    this.menu = new StartMenu(
      new Map<string, Transform>([
        [
          'play',
          new Transform(new Vector2(game.canvas.width / 2, game.canvas.height / 2 + 200)),
        ],
        [
          'howToPlay',
          new Transform(new Vector2(game.canvas.width / 2, game.canvas.height / 2 + 260)),
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
      if (hoveredOption === 'howToPlay') {
        return new HowToPlay(this.game);
      }
    }
    return null;
  }

  /**
   * Render this Start Scene to the Game Canvas
   */
  public render(): void {
    // Clearing the screen
    this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
    this.game.ctx.fillStyle = 'black';
    this.game.ctx.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);

    this.game.ctx.textAlign = 'center';
    this.titleImage.getMesh().draw(this.game.ctx, this.titleImage.getTransform());
    this.menu.draw(this.game.ctx);

    // this.game.ctx.drawImage(Graphics.loadNewImage('./assets/img/startscreen.png'),
    //   0, 0, this.game.canvas.width, this.game.canvas.height);
  }
}
