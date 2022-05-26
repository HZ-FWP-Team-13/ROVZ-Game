import Game from '../CoreModule/Game.js';
import InputAxis from '../InputModule/InputAxis.js';
import KeyListener from '../InputModule/KeyListener.js';
import Scene from './Scene.js';

export default abstract class Level extends Scene {
  /**
   * Create a new Level instance
   *
   * @param game The Game namespace
   */
  public constructor(game: Game) {
    super(game);

    // The default Level Input Axises
    this.input.editAxises(
      new Map<string, InputAxis>([
        [
          'horizontalMovement',
          new InputAxis(
            'Move Right', KeyListener.KEY_D,
            'Move Left', KeyListener.KEY_A
          )
        ],
        [
          'verticalMovement',
          new InputAxis(
            'Move Up', KeyListener.KEY_W,
            'Move Down', KeyListener.KEY_S
          )
        ]
      ])
    );
  }
}
