import Game from './Game.js';
import Scene from './Scene.js';
import Player from './Player.js';
import KeyCommands from './KeyCommands.js';
import Controls from './Controls.js';
import Car from './Car.js';
import StateTrigger from './StateTrigger.js';


export default class Level extends Scene {
  // Player
  private player: Player;

  private controls: Controls;

  private keyCommands: KeyCommands;

  private car : Car;

  private triggers: StateTrigger[];

  /**
   * Creates a new instance of this class
   *
   * @param game the game object where this scene will be a part of
   */
  public constructor(game: Game) {
    super(game);

    // Create new controls
    this.controls = new Controls(
      game,
      this.game.canvas.width / 2 - 500, // xPosition
      (this.game.canvas.height / 8) * 0.5,
    );

    // Create player
    this.player = new Player(
      game.canvas.width / 2,
      game.canvas.height / 2,
    );


    // Create car
    this.car = new Car(300, 300, 'UP');

    // Create triggers
    this.triggers = [];

    this.triggers.push(this.createStateTrigger(300, 300, 50, 50, 'UP'));
    this.triggers.push(this.createStateTrigger(300, 0, 50, 50, 'RIGHT'));
    this.triggers.push(this.createStateTrigger(1000, 0, 50, 50, 'DOWN'));
    this.triggers.push(this.createStateTrigger(1000, 300, 50, 50, 'LEFT'));

    this.keyCommands = this.player.getKeyboard();

    this.controls.setDisplay(true);
  }

  /**
   * Handles any user input that has happened since the last call
   */
  public processInput(): void {
    // Move the player
    this.player.move(this.game.canvas);
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
    this.car.move();

    this.triggers.forEach(trigger => {
      this.car.collidesWithTrigger(trigger);
    });

    return null;
  }

  /**
   * Draw the game so the player can see what happened
   */
  public render(): void {
    let ctx = this.game.ctx;
    let canvas = this.game.canvas;
    // Clear the screen
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.triggers.forEach(trigger => {
      trigger.draw(ctx);
    });

    this.player.getSprite().drawSprite(ctx, this.player);
    this.car.draw(ctx);
  }

  /**
   * Get the player details
   *
   * @returns the player details
   */
  public getPlayer(): Player {
    return this.player;
  }


  public createStateTrigger(x : number, y : number, width : number, height: number, direction : string) : StateTrigger{
    return new StateTrigger(x, y, width, height, direction);
  }

}
