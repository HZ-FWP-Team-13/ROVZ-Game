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
import Car from '../../gameItems/Car.js';
import Path from '../../../engine/AIModule/Path.js';

export default class Level1 extends Level {
  private background: GameItem;

  // Player Character
  private player: Player;

  // FovOverlay
  private fov: FovOverlay;

  // Car Array
  private cars: Car[];

  // Path
  private path: Path;

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

    this.path = new Path();

    // Car path
    let p = this.path;
    p.addPoint(new Vector2(0, 200));
    p.addPoint(new Vector2(600, 300));
    p.addPoint(new Vector2(-100, 500));

    // Create cars
    this.cars = [];
    this.cars.push(
      new Car('car1', this.path, 0, new Mesh('assets/img/car_placeholder.png', new Vector2(60, 133), 0), new Collider()),
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
    this.player.update(elapsed);

    // Providing Player Control over the Player Character and FOV
    this.player.control(this.input, elapsed);
    this.fov.control(this.input, elapsed, this.getCamera());

    // Preserving the position of the Camera relative to the Player Character
    this.getCamera().getTransform().setPosition(this.player.getTransform().getPosition());
    // Preserving the position of the FovOverlay relative to the Player Character
    this.fov.getTransform().setPosition(this.player.getTransform().getPosition());

    // Preserving the rotation of the FovOverlay relative to the Player Character
    this.fov.getTransform().rotate(this.player.lastFrameRotationDifference);

    // Update all cars
    this.cars.forEach((car) => {
      car.update(elapsed);
    });

    return null;
  }

  /**
   * Render this Level Scene to the Game Canvas
   */
  public render(): void {
    const camera = this.getCamera();
    // Clearing the screen
    this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
    // console.log(this.getCamera().getTransform().getPosition().getX());
    // console.log(this.getCamera().getTransform().getPosition().getY());
    // Drawing the Background to the Game Canvas
    this.game.ctx.drawImage(
      // The Source Image of the Background
      this.background.getMesh().getSourceImage(),
      // The position of the frame within the Source Image
      camera.getTransform().getPosition().getX() - camera.getFrameDimensions().getX() / 2,
      camera.getTransform().getPosition().getY() - camera.getFrameDimensions().getY() / 2,
      // The dimensions of the frame within the Source Image
      camera.getFrameDimensions().getX(), camera.getFrameDimensions().getY(),
      // The position of the frame on the Game Canvas
      0, 0,
      // The dimensions of the frame on the Game Canvas
      camera.getFrameDimensions().getX(), camera.getFrameDimensions().getY(),
    );

    // Draw the car
    this.cars.forEach((car) => {
      car.getMesh().draw(this.game.ctx, car.getTransform(), camera);
    });

    // Draw the path
    this.path.draw(this.game.ctx, camera);

    // Drawing the Player Character on the Game Canvas
    this.player.getMesh().draw(this.game.ctx, this.player.getTransform(), camera);
    this.player.getCollider().draw(this.game.ctx, camera);
    // Drawing the FovOverlay on the Game Canvas
    this.fov.getMesh().draw(this.game.ctx, this.fov.getTransform(), camera);
  }
}
