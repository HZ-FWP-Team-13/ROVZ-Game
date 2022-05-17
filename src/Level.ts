import Game from './Game.js';
import Scene from './Scene.js';
import Player from './Player.js';
import FovOverlay from './FovOverlay.js';
import Car from './Car.js';

export default class Level extends Scene {
  // Player Character
  private player: Player;

  // Cars
  private cars: Car[];


  // FovOverlay
  private fov: FovOverlay;

  // DEBUG STUFF
  private isFovVisible: boolean = true;

  /**
   * Create a new Level Scene instance
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
      // The dimensions of the Player Character collider
      32, 32,
      // The current state of the Player Character animation cycle
      0,
    );


    // Car array
    this.cars = [];

    this.cars.push(this.createNewCar(200, 200, 'RIGHT'));
    this.cars.push(this.createNewCar(400, 400, 'DOWN'));

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
    this.player.control();
    // Providing Player Control over the FovOverlay
    this.fov.control();

    // Preserving the position of the FovOverlay relative to the Player Character
    this.fov.setXPos(this.player.getXPos());
    this.fov.setYPos(this.player.getYPos());

    // Preserving the rotation of the FovOverlay relative to the Player Character
    this.fov.rotate(this.player.getPreviousFrameRotation());


    // Moving the cars
    this.cars.forEach(car => {
      car.move();
    });

    return null;
  }

  /**
   * Render this Level Scene to the Game Canvas
   */
  public render(): void {
    let ctx = this.game.ctx;
    // Clearing the screen
    ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);

    this.cars.forEach(car => {
      car.draw(ctx);
    });

    // Drawing the Player Character on the Game Canvas
    this.player.draw(ctx);


    // Drawing the FovOverlay on the Game Canvas

    if(this.isFovVisible) {
      this.fov.draw(ctx);
    }
  }

  public createNewCar(xPos: number, yPos: number, state: string) {
    return new Car(xPos, yPos, state);
  }
}
