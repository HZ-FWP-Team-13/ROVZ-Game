import Game from '../../../engine/Game.js';
import Scene from '../../../engine/Scene.js';
import Player from '../../gameItems/Player.js';
import FovOverlay from '../../gameItems/FovOverlay.js';
// import GameItem from '../../../engine/GameItem.js';
import Level from '../../../engine/Level.js';
import Input from '../../../engine/Input.js';
import Polygon from '../../../engine/experimenting/Polygon.js';

export default class Level1 extends Level {
  // Polygons
  private poly1: Polygon;
  private poly2: Polygon;

  /**
   * Create a new Level Scene instance
   *
   * @param game The Game namespace
   */
  public constructor(game: Game) {
    super(game);

    // Create polygon 1
    this.poly1 = new Polygon(150 - 100, 100 - 100, 0);
    this.poly1.addNewPoint(-10, -10);
    this.poly1.addNewPoint(10, -10);
    this.poly1.addNewPoint(10, 10);
    this.poly1.addNewPoint(-10, 10);

    // Create polygon 2
    this.poly2 = new Polygon(300, 500, 0);
    this.poly2.addNewPoint(-100, -100);
    this.poly2.addNewPoint(100, -100);
    this.poly2.addNewPoint(100, 100);
    this.poly2.addNewPoint(-100, 100);

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

    return null;
  }

  /**
   * Render this Level Scene to the Game Canvas
   */
  public render(): void {
    let ctx = this.game.ctx;
    // Clearing the screen
    ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);

    // Drawing polygons
    this.poly1.draw(ctx);
    this.poly2.draw(ctx);
  }
}
