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
import GamePawn from '../../../engine/ObjectModule/GamePawn.js';
import Goal from '../../gameItems/Goal.js';
import PathedEntity from '../../gameItems/Vehicle.js';
import Train from '../../gameItems/Train.js';
import Building from '../../gameItems/structures/Building.js';
import GameOver from '../screens/GameOver.js';

export default class Level1 extends Level {
  private background: GameItem;

  private foreground: GameItem;

  // Player Character
  private player: Player;

  // FovOverlay
  private fov: FovOverlay;

  // Buildings
  private structures: Building[];

  // Car Array
  private vehicles: PathedEntity[];

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

  private path3: Path;

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
        // The path to the Source Image of the GameItem Mesh
        './assets/img/levels/1/bg.png',
        // The dimensions of the GameItem Mesh
        new Vector2(5800, 4220),
      ),
    );

    // Spawning the Foreground
    this.foreground = new GameItem(
      'foreground',
      new Transform(),
      new Mesh(
        './assets/img/levels/1/fg.png',
        new Vector2(5800, 4220),
      ),
    );

    // Spawning the Player
    this.player = new Player(
      // The id of the GameObject
      'player',
      // The Transform of the GameObject
      new Transform(
        // The coordinates of the Player Transform
        new Vector2(2500, 3700),
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

      // 22
      new Vector2(3650, 1300),
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
      new Vector2(1300, 1350),
      new Vector2(1250, 1300),

      // 21
      new Vector2(1250, 0),

      // 22
      new Vector2(3600, 1330),
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
      new Vector2(4150, -2000),
      new Vector2(4150, 5000),
    );

    this.tg2 = [];
    this.tg2.push(
      new Vector2(4350, 5000),
      new Vector2(4350, -2000),
    );

    const goalpos = Math.random();

    this.goal = new Goal('goal', new Vector2(0, 0));

    if (goalpos >= 0.5) {
      this.goal.getTransform().setPosition(new Vector2(600, 1400));
    } else this.goal.getTransform().setPosition(new Vector2(5100, 600));

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

    this.path2 = new Path();

    // Car path2
    const p2 = this.path2;
    p2.addPoint(this.pg2[0]);
    p2.addPoint(this.pg2[1]);
    p2.addPoint(this.pg2[3]);
    p2.addPoint(this.pg2[4]);
    p2.addPoint(this.pg2[5]);
    p2.addPoint(this.pg2[16]);
    p2.addPoint(this.rag1[0]);
    p2.addPoint(this.pg1[16]);
    p2.addPoint(this.pg1[13]);
    p2.addPoint(this.pg2[9]);
    p2.addPoint(this.pg2[11]);
    p2.addPoint(this.pg2[12]);

    this.path2.setLastPointIndex(this.path2.getPoints().length - 1);

    this.path3 = new Path();
    const p3 = this.path3;
    p3.addPoint(this.pg1[15]);
    p3.addPoint(this.pg1[22]);
    p3.addPoint(this.pg2[22]);
    p3.addPoint(this.pg2[13]);
    p3.addPoint(this.rag1[2]);
    p3.addPoint(this.rag1[3]);
    p3.addPoint(this.rag1[4]);
    p3.addPoint(this.rag1[5]);
    p3.addPoint(this.pg2[15]);
    p3.addPoint(this.pg2[19]);
    p3.addPoint(this.pg2[20]);
    p3.addPoint(this.pg2[21]);

    this.path3.setLastPointIndex(this.path2.getPoints().length - 1);

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

    // Create cars
    this.vehicles = [];
    this.vehicles.push(
      new Car('car1', this.path1, 0, 'RED'),
      new Car('car2', this.path1, 1, 'BLUE'),
      new Car('car3', this.path1, 7, 'GREEN'),
      new Car('car4', this.path2, 1, 'RED'),
      new Car('car5', this.path2, 4, 'BLUE'),
      new Car('car6', this.path2, 7, 'GREEN'),
      new Car('car7', this.path3, 2, 'RED'),
      new Car('car8', this.path3, 5, 'BLUE'),
      new Car('car9', this.path3, 9, 'GREEN'),
      new Train('train1', this.trainpath1, 0),
      new Train('train2', this.trainpath2, 0),
    );

    // Create buildings
    this.structures = [];
    this.structures.push(
      new Building(
        'wall_north',
        new Transform(new Vector2(2900, 0), 0),
        new Mesh('', new Vector2(5800, 200)),
        new RectCollider(new Vector2(5800, 200)),
      ),
      new Building(
        'wall_east',
        new Transform(new Vector2(5800, 2110), 0),
        new Mesh('', new Vector2(200, 4220)),
        new RectCollider(new Vector2(200, 4220)),
      ),

      new Building(
        'wall_south',
        new Transform(new Vector2(2900, 4220), 0),
        new Mesh('', new Vector2(5800, 200)),
        new RectCollider(new Vector2(5800, 200)),
      ),

      new Building(
        'wall_west',
        new Transform(new Vector2(0, 2110), 0),
        new Mesh('', new Vector2(200, 4220)),
        new RectCollider(new Vector2(200, 4220)),
      ),

      new Building(
        'clip_1a',
        new Transform(new Vector2(560, 510), 0),
        new Mesh('', new Vector2(920, 820)),
        new RectCollider(new Vector2(920, 820)),
      ),

      new Building(
        'clip_1b',
        new Transform(new Vector2(150, 1420), 0),
        new Mesh('', new Vector2(120, 1020)),
        new RectCollider(new Vector2(120, 1020)),
      ),

      new Building(
        'clip_1c',
        new Transform(new Vector2(560, 2370), 0),
        new Mesh('', new Vector2(920, 900)),
        new RectCollider(new Vector2(920, 900)),
      ),

      new Building(
        'clip_1d',
        new Transform(new Vector2(920, 1060), 0),
        new Mesh('', new Vector2(200, 330)),
        new RectCollider(new Vector2(200, 330)),
      ),

      new Building(
        'clip_1e',
        new Transform(new Vector2(920, 1780), 0),
        new Mesh('', new Vector2(200, 330)),
        new RectCollider(new Vector2(200, 330)),
      ),

      new Building(
        'clip_2a',
        new Transform(new Vector2(1050, 3650), 0),
        new Mesh('', new Vector2(1900, 940)),
        new RectCollider(new Vector2(1900, 940)),
      ),

      new Building(
        'clip_2b',
        new Transform(new Vector2(2500, 4060), 0),
        new Mesh('', new Vector2(1000, 120)),
        new RectCollider(new Vector2(1000, 120)),
      ),

      new Building(
        'clip_2c',
        new Transform(new Vector2(3500, 3650), 0),
        new Mesh('', new Vector2(1000, 940)),
        new RectCollider(new Vector2(1000, 940)),
      ),

      new Building(
        'clip_2d',
        new Transform(new Vector2(2152, 3280), 0),
        new Mesh('', new Vector2(300, 200)),
        new RectCollider(new Vector2(300, 200)),
      ),

      new Building(
        'clip_2e',
        new Transform(new Vector2(2850, 3280), 0),
        new Mesh('', new Vector2(300, 200)),
        new RectCollider(new Vector2(300, 200)),
      ),

      new Building(
        'clip_3a',
        new Transform(new Vector2(1790, 660), 0),
        new Mesh('', new Vector2(820, 1120)),
        new RectCollider(new Vector2(820, 1120)),
      ),

      new Building(
        'clip_3b',
        new Transform(new Vector2(2260, 600), 0),
        new Mesh('', new Vector2(120, 1000)),
        new RectCollider(new Vector2(120, 1000)),
      ),

      new Building(
        'clip_4a',
        new Transform(new Vector2(2740, 600), 0),
        new Mesh('', new Vector2(120, 1000)),
        new RectCollider(new Vector2(120, 1000)),
      ),

      new Building(
        'clip_4b',
        new Transform(new Vector2(3160, 660), 0),
        new Mesh('', new Vector2(720, 1120)),
        new RectCollider(new Vector2(720, 1120)),
      ),

      new Building(
        'clip_5',
        new Transform(new Vector2(3940, 660), 0),
        new Mesh('', new Vector2(120, 1120)),
        new RectCollider(new Vector2(120, 1120)),
      ),

      new Building(
        'clip_6',
        new Transform(new Vector2(560, 2470), 0),
        new Mesh('', new Vector2(920, 700)),
        new RectCollider(new Vector2(920, 700)),
      ),

      new Building(
        'clip_7a',
        new Transform(new Vector2(1790, 2200), 0),
        new Mesh('', new Vector2(820, 1240)),
        new RectCollider(new Vector2(820, 1240)),
      ),

      new Building(
        'clip_7b',
        new Transform(new Vector2(2260, 2260), 0),
        new Mesh('', new Vector2(120, 1120)),
        new RectCollider(new Vector2(120, 1120)),
      ),

      new Building(
        'clip_8a',
        new Transform(new Vector2(2740, 2260), 0),
        new Mesh('', new Vector2(120, 1120)),
        new RectCollider(new Vector2(120, 1120)),
      ),

      new Building(
        'clip_8b',
        new Transform(new Vector2(3160, 2200), 0),
        new Mesh('', new Vector2(720, 1240)),
        new RectCollider(new Vector2(720, 1240)),
      ),

      new Building(
        'clip_9a',
        new Transform(new Vector2(3940, 2200), 0),
        new Mesh('', new Vector2(120, 1240)),
        new RectCollider(new Vector2(120, 1240)),
      ),

      new Building(
        'clip_9b',
        new Transform(new Vector2(4710, 2200), 0),
        new Mesh('', new Vector2(420, 1240)),
        new RectCollider(new Vector2(420, 1240)),
      ),

      new Building(
        'clip_10a',
        new Transform(new Vector2(4890, 3650), 0),
        new Mesh('', new Vector2(780, 940)),
        new RectCollider(new Vector2(780, 940)),
      ),

      new Building(
        'clip_10b',
        new Transform(new Vector2(5490, 2850), 0),
        new Mesh('', new Vector2(420, 2540)),
        new RectCollider(new Vector2(420, 2540)),
      ),

      new Building(
        'clip_11a',
        new Transform(new Vector2(4600, 660), 0),
        new Mesh('', new Vector2(200, 1120)),
        new RectCollider(new Vector2(200, 1120)),
      ),

      new Building(
        'clip_11b',
        new Transform(new Vector2(5100, 160), 0),
        new Mesh('', new Vector2(800, 120)),
        new RectCollider(new Vector2(800, 120)),
      ),

      new Building(
        'clip_11c',
        new Transform(new Vector2(5600, 660), 0),
        new Mesh('', new Vector2(200, 1120)),
        new RectCollider(new Vector2(200, 1120)),
      ),

      new Building(
        'clip_11d',
        new Transform(new Vector2(4848, 1125), 0),
        new Mesh('', new Vector2(296, 190)),
        new RectCollider(new Vector2(296, 190)),
      ),

      new Building(
        'clip_11e',
        new Transform(new Vector2(5350, 1125), 0),
        new Mesh('', new Vector2(300, 190)),
        new RectCollider(new Vector2(300, 190)),
      ),
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

    if (!this.isColliding(this.vehicles)) {
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
    this.vehicles.forEach((vehicle) => {
      vehicle.update(elapsed);

      Collider.checkCollision(vehicle, this.player);
    });

    this.goal.getCollider().updatePoints(this.goal.getTransform());

    if (Collider.checkCollision(this.goal, this.player)) {
      return new GameOver(this.game, 'WIN');
    }

    // if (this.isColliding(this.vehicles)) {
    //   return new GameOver(this.game, 'LOSS');
    // }

    if (this.isColliding(this.vehicles)) {
      return new GameOver(this.game, 'LOSS');
    }

    this.isColliding(this.structures);

    return null;
  }

  /**
   *  Function that returns if the player is colliding or not with any gameitems given
   *
   * @param objects an Array of objects
   * @returns the state of the collission
   */
  public isColliding(objects: GamePawn[]): boolean {
    // FIXME: Intersecting structures will cause the player to get
    // pushed inside of the collider without a way to escape.

    // Check to see if the building and the player are colliding
    // And update the point on which the building is at
    let collided: boolean = false;

    objects.forEach((object) => {
      object.getCollider().updatePoints(object.getTransform());
      // console.log(building);
      if (Collider.checkCollision(this.player.getHitbox(), object)) {
        console.log(object);
        collided = true;
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
    this.vehicles.forEach((vehicle) => {
      vehicle.getMesh().draw(this.game.ctx, vehicle.getTransform(), camera);
      // car.getCollider().draw(this.game.ctx, camera);
    });

    // Drawing the Player Character on the Game Canvas
    this.player.getMesh().draw(this.game.ctx, this.player.getTransform(), camera);
    // this.player.getCollider().draw(this.game.ctx, camera);

    this.goal.getMesh().draw(this.game.ctx, this.goal.getTransform(), camera);

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

    // // Drawing building colliders
    // this.structures.forEach((structure) => {
    //   structure.getCollider().draw(this.game.ctx, camera);
    // });
  }
}
