import Scene from './Scene.js';
import Camera from '../GraphicsModule/Camera.js';
import Game from '../CoreModule/Game.js';
import InputAxis from '../InputModule/InputAxis.js';
import KeyListener from '../InputModule/KeyListener.js';
import Vector2 from '../MathModule/Vector2.js';

export default abstract class Level extends Scene {
  // The Camera of the Level
  private _camera: Camera;

  /**
   * Create a new Level instance
   *
   * @param game The Game namespace
   */
  public constructor(game: Game) {
    super(game);

    this.camera = new Camera("camera", new Vector2(game.canvas.width, game.canvas.height));

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

  /**
   * Get the Camera of this Level
   *
   * @returns The Camera of this Level
   */
   public get camera(): Camera {
    return this._camera;
  }
  /**
   * Set the Camera of this Level
   *
   * @param value The Camera of this Level
   */
  public set camera(value: Camera) {
    this._camera = value;
  }
}
