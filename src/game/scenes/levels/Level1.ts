import Game from '../../../engine/Game.js';
import Scene from '../../../engine/Scene.js';
import Player from '../../gameItems/Player.js';
import FovOverlay from '../../gameItems/FovOverlay.js';
import Level from '../../../engine/Level.js';
import KeyListener from '../../../engine/InputModule/KeyListener.js';
import InputAxis from '../../../engine/InputModule/InputAxis.js';

export default class Level1 extends Level {
  // Player Character
  private player: Player;

  // FovOverlay
  private fov: FovOverlay;

  /**
   * Create a new Level1 Level instance
   *
   * @param game The Game namespace
   */
  public constructor(game: Game) {
    super(game);

    // Spawning the Player Character
    this.player = new Player(
      // The path to the Source Image of the Player Character appearance
      './assets/img/testplayer-old.png',
      // The coordinates of the Player Character on the game canvas
      game.canvas.width / 2, game.canvas.height / 2,
      // The rotation of the Player Character measured in degrees
      0,
      // The dimensions of the Player Character appearance
      32, 32,
      // The current state of the Player Character animation cycle
      0,
    );

    // Spawning the FovOverlay
    this.fov = new FovOverlay(
      // The path to the Source Image of the Fov appearance
      './assets/img/fov.png',
      // The coordinates of the FovOverlay on the game canvas
      game.canvas.width / 2, game.canvas.height / 2,
      // The rotation of the FovOverlay measured in degrees
      0,
      // The dimensions of the FovOverlay appearance
      6000, 6000,
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
    // Providing Player Control over the Player Character
    this.player.control(this.input);
    // Providing Player Control over the FovOverlay
    this.fov.control(this.input);

    // Preserving the position of the FovOverlay relative to the Player Character
    this.fov.transform.position = this.player.transform.position;

    // Preserving the rotation of the FovOverlay relative to the Player Character
    this.fov.transform.rotate(this.player.getPreviousFrameRotation());

    return null;
  }

  /**
   * Render this Level Scene to the Game Canvas
   */
  public render(): void {
    // Clearing the screen
    this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);

    // Drawing the Player Character on the Game Canvas
    this.player.mesh.draw(this.game.ctx, this.player.transform);
    // Drawing the FovOverlay on the Game Canvas
    this.fov.mesh.draw(this.game.ctx, this.fov.transform);
  }
}
