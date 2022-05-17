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

    // Create Player
    this.player = new Player(
      // The Game Canvas rendering context, the path to the source image of the Player appearance
      this.game.ctx, './assets/img/testplayer-old.png',
      // The coordinates of the Player on the game canvas
      game.canvas.width / 2, game.canvas.height / 2,
      // The rotation of the Player measured in degrees
      0,
      // The dimensions of the Player appearance
      32, 32,
      // The dimensions of the Player collider
      32, 32,
      // The current state of the Player animation cycle
      0);

    // Create FovOverlay
    this.fov = new FovOverlay(
      // The Game Canvas rendering context, the path to the source image of the Fov appearance
      this.game.ctx, './assets/img/fov.png',
      // The coordinates of the FovOverlay on the game canvas
      game.canvas.width / 2, game.canvas.height / 2,
      // The rotation of the FovOverlay measured in degrees
      0,
      // The dimensions of the FovOverlay appearance
      32, 32);
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
   * Draw the game so the player can see what happened
   */
  public render(): void {
    // Clear the screen
    this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
    this.player.draw();
    this.fov.setXPos(this.player.getXPos());
    this.fov.setYPos(this.player.getYPos());
    this.fov.draw();

    this.player.control();
    this.fov.control();
  }

  /**
   * Get the player details
   *
   * @returns the player details
   */
  public getPlayer(): Player {
    return this.player;
  }
}
