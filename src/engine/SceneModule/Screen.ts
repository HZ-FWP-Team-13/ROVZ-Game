import Game from '../CoreModule/Game.js';
import InputAxis from '../InputModule/InputAxis.js';
import KeyListener from '../InputModule/KeyListener.js';
import Scene from './Scene.js';

export default abstract class Screen extends Scene {
  /**
   * Create a new Screen instance
   *
   * @param game The Game namespace
   */
  public constructor(game: Game) {
    super(game);

    // The default Screen Input Axises
    this.input.editAxises(
      new Map<string, InputAxis>([
        [
          'horizontalMenuSelect',
          new InputAxis(
            'Select Right', KeyListener.KEY_RIGHT,
            'Select Left', KeyListener.KEY_LEFT
          )
        ],
        [
          'verticalMenuSelect',
          new InputAxis(
            'Select Up', KeyListener.KEY_UP,
            'Select Down', KeyListener.KEY_DOWN
          )
        ],
        [
          'Select',
          new InputAxis(
            'Select', KeyListener.KEY_ENTER
          )
        ]
      ])
    );
  }
}
