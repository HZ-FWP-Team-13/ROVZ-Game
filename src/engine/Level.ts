import Game from './Game.js';
import Scene from './Scene.js';

export default abstract class Level extends Scene {
  /**
   * Create a new Screen instance
   *
   * @param game The Game namespace
   */
  public constructor(game: Game) {
    super(game);
  }
}
