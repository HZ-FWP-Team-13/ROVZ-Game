import Level from '../../../engine/SceneModule/Level.js';
import GameItem from '../../../engine/ObjectModule/GameItem.js';
import Player from '../../gameItems/Player.js';
import FovOverlay from '../../gameItems/FovOverlay.js';
import Game from '../../../engine/CoreModule/Game.js';
import Vector2 from '../../../engine/MathModule/Vector2.js';
import Transform from '../../../engine/ComponentsModule/Transform.js';
import Mesh from '../../../engine/ComponentsModule/Mesh.js';
import Collider from '../../../engine/ComponentsModule/Collider.js';
import Scene from '../../../engine/SceneModule/Scene.js';

export default class Level1 extends Level {
  private background: GameItem;

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

    // Spawning the Background
    this.background = new GameItem(
      // The id of the GameObject
      "background",
      // The Transform of the GameObject
      new Transform(),
      // The Transform of the GameItem
      new Mesh(
        // The path to the Source Image of the GameItem Mesh
        './assets/img/background.png',
        // The dimensions of the GameItem Mesh
        new Vector2 (1386, 980)
      )
    );

    // Spawning the Player
    this.player = new Player(
      // The id of the GameObject
      "player",
      // The Transform of the GameObject
      new Transform(
        // The coordinates of the Player Transform
        new Vector2(game.canvas.width / 2, game.canvas.height / 2)
      ),
      // The Mesh of the GameItem
      new Mesh(
        // The path to the Source Image of the GameItem Mesh
        './assets/img/testplayer-old.png',
        // The dimensions of the GameItem Mesh
        new Vector2 (32, 32)
      ),
      // The Collider of the GamePawn
      new Collider()
    );

    // Spawning the FovOverlay
    this.fov = new FovOverlay(
      // The id of the GameObject
      "fov",
      // The Transform of the GameObject
      new Transform(),
      // The Mesh of the GameItem
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
   * @param elapsed the time in seconds that has been elapsed since the previous frame
   * @returns a new `Scene` object if the game should start animating that scene
   *   on the next animation frame. If the game should just continue with the
   *   current scene, just return `null`
   */
  public update(elapsed: number): Scene {
    // Providing Player Control over the Player Character
    this.player.control(this.input, elapsed);

    // We should probably do an update method in GameItem and just update all GameItems
    this.player.collider.updatePoints(this.player.transform);

    // Providing Player Control over the FovOverlay
    this.fov.control(this.input, elapsed, this.camera);

    // Preserving the position of the Camera relative to the Player Character
    this.camera.transform.position = this.player.transform.position;
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

    // Drawing the Background to the Game Canvas
    this.game.ctx.drawImage(
      // The Source Image of the Background
      this.background.mesh.sourceImage,
      // The position of the frame within the Source Image
      this.camera.transform.position.x - this.camera.frameDimensions.x / 2,
      this.camera.transform.position.y - this.camera.frameDimensions.y / 2,
      // The dimensions of the frame within the Source Image
      this.camera.frameDimensions.x, this.camera.frameDimensions.y,
      // The position of the frame on the Game Canvas
      0, 0,
      // The dimensions of the frame on the Game Canvas
      this.camera.frameDimensions.x, this.camera.frameDimensions.y
    );

    // Drawing the Player Character on the Game Canvas
    this.player.mesh.draw(this.game.ctx, this.player.transform, this.camera);
    this.player.collider.draw(this.game.ctx, this.camera);
    // Drawing the FovOverlay on the Game Canvas
    this.fov.mesh.draw(this.game.ctx, this.fov.transform, this.camera);
  }
}
