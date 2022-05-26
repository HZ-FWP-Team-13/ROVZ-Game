import Level from '../../../engine/SceneModule/Level.js';
import Player from '../../gameItems/Player.js';
import FovOverlay from '../../gameItems/FovOverlay.js';
import Game from '../../../engine/CoreModule/Game.js';
import Vector2 from '../../../engine/MathModule/Vector2.js';
import Transform from '../../../engine/ComponentsModule/Transform.js';
import Mesh from '../../../engine/ComponentsModule/Mesh.js';
import Scene from '../../../engine/SceneModule/Scene.js';

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

    let sceneCentre: Vector2 = new Vector2(game.canvas.width / 2, game.canvas.height / 2);

    // Spawning the Player
    this.player = new Player(
      new Transform(
        // The coordinates of the Player Transform
        sceneCentre
      ),
      new Mesh(
        // The path to the Source Image of the Player Mesh
        './assets/img/testplayer-old.png',
        // The dimensions of the Player Mesh
        new Vector2 (32, 32)
      )
    );

    // Spawning the FovOverlay
    this.fov = new FovOverlay(
      new Transform(
        // The position of the FovOverlay Transform
        sceneCentre
      ),
      new Mesh(
        // The path to the Source Image of the FovOverlay Mesh
        './assets/img/fov.png',
        // The dimensions of the FovOverlay Mesh
        new Vector2 (6000, 6000)
      )
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
    this.fov.transform.rotate(this.player.lastFrameRotationDifference);

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
