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
import Building1 from '../../gameItems/structures/Building1.js';

export default class Level1 extends Level {
  private background: GameItem;

  // Player Character
  private player: Player;

  // FovOverlay
  private fov: FovOverlay;

  private building: Building1;

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
      'background',
      // The Transform of the GameObject
      new Transform(),
      // The Transform of the GameItem
      new Mesh(
        // The path to the Source Image of the GameItem Mesh
        './assets/img/background.png',
        // The dimensions of the GameItem Mesh
        new Vector2(1386, 980),
      ),
    );

    // Spawning the Player
    this.player = new Player(
      // The id of the GameObject
      'player',
      // The Transform of the GameObject
      new Transform(
        // The coordinates of the Player Transform
        new Vector2(game.canvas.width / 2, game.canvas.height / 2),
      ),
      // The Mesh of the GameItem
      new Mesh(
        // The path to the Source Image of the GameItem Mesh
        './assets/img/testplayer-old.png',
        // The dimensions of the GameItem Mesh
        new Vector2(32, 32),
      ),
      // The Collider of the GamePawn
      new Collider(),
    );

    // Spawning the FovOverlay
    this.fov = new FovOverlay(
      // The id of the GameObject
      'fov',
      // The Transform of the GameObject
      new Transform(),
      // The Mesh of the GameItem
      new Mesh(
        // The path to the Source Image of the FovOverlay Mesh
        './assets/img/fov.png',
        // The dimensions of the FovOverlay Mesh
        new Vector2(6000, 6000),
      ),
    );

    this.building = new Building1(
      // The id of the GameObject
      'building1',
      // The Transform of the GameObject
      new Transform(
        new Vector2(600, 700),
      ),
      // The Mesh of the GameItem
      new Mesh(
        // The path to the Source Image of the FovOverlay Mesh
        './assets/img/house.png',
        // The dimensions of the GameItem Mesh
        new Vector2(230, 240),
      ),
      new Collider(),
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
    this.player.getCollider().updatePoints(this.player.getTransform());

    this.building.getCollider().updatePoints(this.building.getTransform());

    console.log(Collider.checkCollision(this.player, this.building));
    // Check to see if the building and the player are colliding
    if (Collider.checkCollision(this.player, this.building)) {
      console.log('COLLIDER DO SOMETHING PLEASE...');
    }

    // Providing Player Control over the FovOverlay
    this.fov.control(this.input, elapsed, this.getCamera());

    // Preserving the position of the Camera relative to the Player Character
    this.getCamera().getTransform().setPosition(this.player.getTransform().getPosition());
    // Preserving the position of the FovOverlay relative to the Player Character
    this.fov.getTransform().setPosition(this.player.getTransform().getPosition());

    // Preserving the rotation of the FovOverlay relative to the Player Character
    this.fov.getTransform().rotate(this.player.lastFrameRotationDifference);

    return null;
  }

  /**
   * Render this Level Scene to the Game Canvas
   */
  public render(): void {
    // Clearing the screen
    this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
    // console.log(this.getCamera().getTransform().getPosition().getX());
    // console.log(this.getCamera().getTransform().getPosition().getY());
    // Drawing the Background to the Game Canvas
    this.game.ctx.drawImage(
      // The Source Image of the Background
      this.background.getMesh().getSourceImage(),
      // The position of the frame within the Source Image
      this.getCamera().getTransform().getPosition().getX() - this.getCamera().getFrameDimensions().getX() / 2,
      this.getCamera().getTransform().getPosition().getY() - this.getCamera().getFrameDimensions().getY() / 2,
      // The dimensions of the frame within the Source Image
      this.getCamera().getFrameDimensions().getX(), this.getCamera().getFrameDimensions().getY(),
      // The position of the frame on the Game Canvas
      0, 0,
      // The dimensions of the frame on the Game Canvas
      this.getCamera().getFrameDimensions().getX(), this.getCamera().getFrameDimensions().getY(),
    );

    // Drawing the Player Character on the Game Canvas
    this.player.getMesh().draw(this.game.ctx, this.player.getTransform(), this.getCamera());
    this.player.getCollider().draw(this.game.ctx, this.getCamera());

    this.building.getMesh().draw(this.game.ctx, this.building.getTransform(), this.getCamera());

    // Drawing the FovOverlay on the Game Canvas
    this.fov.getMesh().draw(this.game.ctx, this.fov.getTransform(), this.getCamera());
  }
}
