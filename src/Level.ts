import Game from './Game.js';
import Scene from './Scene.js';
import Player from './Player.js';
import FovOverlay from './FovOverlay.js';

export default class Level extends Scene {
  // Player
  private player: Player;

  // FovOverlay
  private fov: FovOverlay;

  /**
   * Creates a new instance of this class
   *
   * @param game the game object where this scene will be a part of
   */
  public constructor(game: Game) {
    super(game);

    // Spawning the Player
    this.player = new Player(
      // The path to the source image of the Player appearance
      './assets/img/testplayer-old.png',
      // The coordinates of the Player on the game canvas
      game.canvas.width / 2, game.canvas.height / 2,
      // The rotation of the Player measured in degrees
      0,
      // The dimensions of the Player appearance
      32, 32,
      // The dimensions of the Player collider
      32, 32,
      // The current state of the Player animation cycle
      0,
    );

    // Spawning the FovOverlay
    this.fov = new FovOverlay(
      // The path to the source image of the Fov appearance
      './assets/img/fov.png',
      // The coordinates of the FovOverlay on the game canvas
      game.canvas.width / 2, game.canvas.height / 2,
      // The rotation of the FovOverlay measured in degrees
      0,
      // The dimensions of the FovOverlay appearance
      6000,
      6000,
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
    this.player.control();
    this.fov.rotate(this.player.getPreviousFrameRotation());
    this.fov.control();


    return null;
  }

  /**
   * Draw the game so the player can see what happened
   */
  public render(): void {
    // Clear the screen
    this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
    this.player.draw(this.game.ctx);

    this.fov.setXPos(this.player.getXPos());
    this.fov.setYPos(this.player.getYPos());
    this.fov.draw(this.game.ctx);
  }
}
