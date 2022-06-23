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
import Goal from '../../gameItems/Goal.js';
import Start from '../screens/Start.js';

export default class Level1 extends Level {
  private background: GameItem;

  // private foreground: GameItem;

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

  // Point Group 1: Green
  private pg1: Vector2[];

  // Point Group 2: Red
  private pg2: Vector2[];

  // Roundabound Group 1: Blue
  private rag1: Vector2[];

  // Train Group 1: Cyan
  private tg1: Vector2[];

  // Train Group 2: Pink
  private tg2: Vector2[];

  // Paths
  private path1: Path;
  private path2: Path;

  private trainpath1: Path;
  private trainpath2: Path;

  // Goal
  private goal: Goal;

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
        './assets/img/level/biglevel.png',
        // The dimensions of the GameItem Mesh
        new Vector2(3000, 3000),
      ),
    );

    // // Spawning the Foreground
    // this.foreground = new GameItem(
    //   // The id of the GameObject
    //   'foreground',
    //   // The Transform of the GameObject
    //   new Transform(),
    //   // The Transform of the GameItem
    //   new Mesh(
    //     // The path11 to the Source Image of the GameItem Mesh
    //     './assets/img/level/ra_fg.png',
    //     // The dimensions of the GameItem Mesh
    //     new Vector2(3000, 3000),
    //   ),
    // );

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

    this.pg1 = [];
    this.pg1.push(
      // 0
      new Vector2(1150, 0),

      // 1 - 3
      new Vector2(1150, 1400),
      new Vector2(1200, 1450),
      new Vector2(1150, 1500),

      // 4 - 6
      new Vector2(1150, 2900),
      new Vector2(1100, 2950),
      new Vector2(1200, 2950),

      // 7 - 9
      new Vector2(2400, 2950),
      new Vector2(2450, 2900),
      new Vector2(2500, 2950),

      // 10 - 11
      new Vector2(3600, 2950),
      new Vector2(3650, 2900),

      // 12 - 14
      new Vector2(3650, 1500),
      new Vector2(3600, 1450),
      new Vector2(3650, 1400),

      // 15
      new Vector2(3650, 0),

      // 16
      new Vector2(2800, 1450),

      // 17
      new Vector2(2450, 1000),

      // 18
      new Vector2(2450, 0),

      // 19
      new Vector2(2200, 1450),

      // 20
      new Vector2(2450, 1700),

      // 21
      new Vector2(0, 2950),
    );

    this.pg2 = [];
    this.pg2.push(
      // 0
      new Vector2(0, 3050),

      // 1 - 3
      new Vector2(1200, 3050),
      new Vector2(1250, 3000),
      new Vector2(1300, 3050),

      // 4 - 6
      new Vector2(2500, 3050),
      new Vector2(2550, 3000),
      new Vector2(2600, 3050),

      // 7 - 8
      new Vector2(3700, 3050),
      new Vector2(3750, 3000),

      // 9 - 11
      new Vector2(3750, 1400),
      new Vector2(3700, 1350),
      new Vector2(3750, 1300),

      // 12
      new Vector2(3750, 0),

      // 13 - 16
      new Vector2(2800, 1350),
      new Vector2(2500, 1100),
      new Vector2(2200, 1350),
      new Vector2(2550, 1700),

      // 17
      new Vector2(2550, 0),

      // 18 - 20
      new Vector2(1250, 1400),
      new Vector2(1200, 1350),
      new Vector2(1250, 1300),

      // 21
      new Vector2(1250, 0),
    );

    this.rag1 = [];
    this.rag1.push(

      new Vector2(2550, 1580),

      new Vector2(2680, 1450),
      new Vector2(2680, 1350),

      new Vector2(2550, 1220),
      new Vector2(2450, 1220),

      new Vector2(2320, 1350),
      new Vector2(2320, 1450),

      new Vector2(2450, 1580),
    );

    this.tg1 = [];
    this.tg1.push(
      new Vector2(4150, -10000),
      new Vector2(4150, 10000),
    );

    this.tg2 = [];
    this.tg2.push(
      new Vector2(4350, 10000),
      new Vector2(4350, -10000),
    );

    this.goal = new Goal('goal', new Vector2(700, 1350));

    // Initalize the array of buildings, then process the amount
    // this.buildings = Factory.buildingFactory(200, 1600, 4);

    this.path1 = new Path();

    // Car path1
    const p1 = this.path1;
    p1.addPoint(this.pg1[0]);
    p1.addPoint(this.pg1[1]);
    p1.addPoint(this.pg1[2]);
    p1.addPoint(this.pg1[19]);
    p1.addPoint(this.rag1[6]);
    p1.addPoint(this.rag1[7]);
    p1.addPoint(this.pg1[20]);
    p1.addPoint(this.pg1[8]);
    p1.addPoint(this.pg1[7]);
    p1.addPoint(this.pg1[6]);
    p1.addPoint(this.pg1[5]);
    p1.addPoint(this.pg1[21]);

    this.path1.setLastPointIndex(this.path1.getPoints().length - 1);

    // Train path 1
    this.trainpath1 = new Path();
    this.trainpath1.addPoint(this.tg1[0]);
    this.trainpath1.addPoint(this.tg1[1]);
    this.trainpath1.setLastPointIndex(1);

    // Train path 2
    this.trainpath2 = new Path();
    this.trainpath2.addPoint(this.tg2[0]);
    this.trainpath2.addPoint(this.tg2[1]);
    this.trainpath2.setLastPointIndex(1);

    // this.path2 = new Path();




    // // Car path2
    // const p2 = this.path2;
    // p2.addPoint(new Vector2(3000 - 1550, 3000 - 2900));
    // p2.addPoint(new Vector2(3000 - 1550, 3000 - 1700));

    // p2.addPoint(new Vector2(3000 - 1700, 3000 - 1550));
    // p2.addPoint(new Vector2(3000 - 1700, 3000 - 1450));

    // p2.addPoint(new Vector2(3000 - 1550, 3000 - 1300));
    // p2.addPoint(new Vector2(3000 - 1450, 3000 - 1300));

    // p2.addPoint(new Vector2(3000 - 1300, 3000 - 1450));
    // p2.addPoint(new Vector2(3000 - 100, 3000 - 1450));

    // this.path2.setLastPointIndex(this.path1.getPoints().length - 1);

    // Create cars
    this.cars = [];
    this.cars.push(
      new Car('car1', this.path1, 0, 'RED'),
      new Car('car2', this.path1, 1, 'BLUE'),
      new Car('car3', this.path1, 7, 'GREEN'),
      // new Car('car3', this.path2, 2, 'GREEN'),
      // new Car('car4', this.path2, 6, 'RED'),
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

    this.goal.getCollider().updatePoints(this.goal.getTransform());

    if (Collider.checkCollision(this.goal, this.player)) {
      return new Start(this.game);
    }

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
      // car.getCollider().draw(this.game.ctx, camera);
    });

    // Draw the paths
    // this.path1.draw(this.game.ctx, camera);
    // this.path2.draw(this.game.ctx, camera);

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
    // this.player.getCollider().draw(this.game.ctx, camera);

    this.goal.getMesh().draw(this.game.ctx, this.goal.getTransform(), camera);

    // // TODO: This is not good.
    // this.game.ctx.drawImage(
    //   // The Source Image of the Background
    //   this.foreground.getMesh().getSourceImage(),
    //   // The position of the frame within the Source Image
    //   camera.getTransform().getPosition().getX() - camera.getFrameDimensions().getX() / 2,
    //   camera.getTransform().getPosition().getY() - camera.getFrameDimensions().getY() / 2,
    //   // The dimensions of the frame within the Source Image
    //   camera.getFrameDimensions().getX(), camera.getFrameDimensions().getY(),
    //   // The position of the frame on the Game Canvas
    //   0, 0,
    //   // The dimensions of the frame on the Game Canvas
    //   camera.getFrameDimensions().getX(), camera.getFrameDimensions().getY(),
    // );

    // Drawing the FovOverlay on the Game Canvas
    this.fov.getMesh().draw(this.game.ctx, this.fov.getTransform(), camera);
  }
}
