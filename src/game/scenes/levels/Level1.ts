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
import RectCollider from '../../../engine/ComponentsModule/RectCollider.js';
import Building from '../../gameItems/structures/Building.js';
import Factory from '../../Factory.js';
import GamePawn from '../../../engine/ObjectModule/GamePawn.js';

export default class Level1 extends Level {
  private background: GameItem;

  private foreground: GameItem;

  // Player Character
  private player: Player;

  // FovOverlay
  private fov: FovOverlay;

  // Buildings Array
  // private buildings: Building[];

  // Car Array
  private cars: Car[];

  // Pathpoints
  // private pathPoints: Vector2[];

  // Paths
  private path1: Path;

  // Paths
  private path2: Path;

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
        // The path11 to the Source Image of the GameItem Mesh
        './assets/img/level/ra_bg.png',
        // The dimensions of the GameItem Mesh
        new Vector2(3000, 3000),
      ),
    );

    // Spawning the Background
    this.foreground = new GameItem(
      // The id of the GameObject
      'foreground',
      // The Transform of the GameObject
      new Transform(),
      // The Transform of the GameItem
      new Mesh(
        // The path11 to the Source Image of the GameItem Mesh
        './assets/img/level/ra_fg.png',
        // The dimensions of the GameItem Mesh
        new Vector2(3000, 3000),
      ),
    );

    // Spawning the Player
    this.player = new Player(
      // The id of the GameObject
      'player',
      // The Transform of the GameObject
      new Transform(
        // The coordinates of the Player Transform
        new Vector2(1634, 2500),
      ),
      // The Mesh of the GameItem
      new Mesh(
        // The path to the Source Image of the GameItem Mesh
        './assets/img/player/cyclist.png',
        // The dimensions of the GameItem Mesh
        new Vector2(28, 78),
      ),
      // The Collider of the GamePawn
      new RectCollider(new Vector2(28, 78)),
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

    // Initalize the array of buildings, then process the amount
    // this.buildings = Factory.buildingFactory(200, 1600, 4);

    this.path1 = new Path();

    // Car path1
    const p1 = this.path1;
    p1.addPoint(new Vector2(1550, 2900));
    p1.addPoint(new Vector2(1550, 1700));

    p1.addPoint(new Vector2(1700, 1550));
    p1.addPoint(new Vector2(1700, 1450));

    p1.addPoint(new Vector2(1550, 1300));
    p1.addPoint(new Vector2(1450, 1300));

    p1.addPoint(new Vector2(1300, 1450));
    p1.addPoint(new Vector2(100, 1450));

    this.path1.setLastPointIndex(this.path1.getPoints().length - 1);

    this.path2 = new Path();

    // Car path2
    const p2 = this.path2;
    p2.addPoint(new Vector2(3000 - 1550, 3000 - 2900));
    p2.addPoint(new Vector2(3000 - 1550, 3000 - 1700));

    p2.addPoint(new Vector2(3000 - 1700, 3000 - 1550));
    p2.addPoint(new Vector2(3000 - 1700, 3000 - 1450));

    p2.addPoint(new Vector2(3000 - 1550, 3000 - 1300));
    p2.addPoint(new Vector2(3000 - 1450, 3000 - 1300));

    p2.addPoint(new Vector2(3000 - 1300, 3000 - 1450));
    p2.addPoint(new Vector2(3000 - 100, 3000 - 1450));

    this.path2.setLastPointIndex(this.path1.getPoints().length - 1);

    // Create cars
    this.cars = [];
    this.cars.push(
      new Car('car1', this.path1, 0, 'RED'),
      new Car('car2', this.path1, 1, 'BLUE'),
      new Car('car3', this.path2, 2, 'GREEN'),
      new Car('car4', this.path2, 6, 'RED'),
      // new Car('car2', this.path1, 2, new Mesh('assets/img/cars/car_blue.png', new Vector2(64, 128), 0), new RectCollider(new Vector2(64, 128))),
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
    this.player.setHitbox(this.player);
    this.player.getHitbox().getCollider().updatePoints(this.player.getHitbox().getTransform());

    // if (!this.isColliding(this.buildings)) {
    //   this.player.control(this.input, elapsed);
    // }

    if (!this.isColliding(this.cars)) {
      this.player.control(this.input, elapsed);
    }

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

      Collider.checkCollision(car, this.player);
    });

    return null;
  }

  /**
   *  Function that returns if the player is colliding or not with any gameitems given
   *
   * @param objects an Array of objects
   * @returns the state of the collission
   */
  public isColliding(objects: GamePawn[]): boolean {
    // Check to see if the building and the player are colliding
    // And update the point on which the building is at
    let collided: boolean = false;

    objects.forEach((object) => {
      collided = true;
      object.getCollider().updatePoints(object.getTransform());
      // console.log(building);
      if (Collider.checkCollision(this.player.getHitbox(), object)) {
        console.log('You crashed into a building -_-');
        // TODO: Gain control of the character after running into a building,
        // while not being able to move forward
        //
        // ALSO, we need to detect which side the player is facing of the object,
        // so we can calculate which x and y need to be changed

        const vector: Vector2 = Vector2.vectorDifference(
          this.player.getTransform().getPosition(),
          object.getTransform().getPosition(),
        );

        if (vector.getX() > 0) {
          // When the player touches the right side
          this.player.getTransform().getPosition().setX(
            this.player.getTransform().getPosition().getX() + 3,
          );
        } else if (vector.getX() < 0) {
          // When the player touches the left side
          this.player.getTransform().getPosition().setX(
            this.player.getTransform().getPosition().getX() - 3,
          );
        }
        if (vector.getY() > 0) {
          // When the player touches the top side
          this.player.getTransform().getPosition().setY(
            this.player.getTransform().getPosition().getY() + 3,
          );
        } else if (vector.getY() < 0) {
          // When the player touches the bottom side
          this.player.getTransform().getPosition().setY(
            this.player.getTransform().getPosition().getY() - 3,
          );
        }
      }
    });
    return collided;
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
      car.getCollider().draw(this.game.ctx, camera);
    });

    // Draw the paths
    this.path1.draw(this.game.ctx, camera);
    this.path2.draw(this.game.ctx, camera);

    // // Drawing the buildings on the Game Canvas
    // this.buildings.forEach((building) => {
    //   building.getMesh().draw(
    //     this.game.ctx,
    //     building.getTransform(),
    //     this.getCamera(),
    //   );

    //   building.getCollider().draw(this.game.ctx, this.getCamera());
    // });

    // Drawing the Player Character on the Game Canvas
    this.player.getMesh().draw(this.game.ctx, this.player.getTransform(), camera);
    this.player.getCollider().draw(this.game.ctx, camera);

    // TODO: This is not good.
    this.game.ctx.drawImage(
      // The Source Image of the Background
      this.foreground.getMesh().getSourceImage(),
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

    // Drawing the FovOverlay on the Game Canvas
    this.fov.getMesh().draw(this.game.ctx, this.fov.getTransform(), camera);
  }
}
