import Game from './Game.js';
import Scene from './Scene.js';

export default abstract class Level extends Scene {
  public constructor(game: Game) {
    super(game);
  }
}
