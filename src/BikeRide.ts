import Player from './Player.js';
import Scene from './Scene.js';
import KeyListener from './KeyListener';
import GameItem from './GameItem.js';
import GameLost from './GameLost.js';
import GameWon from './GameWon.js';
import Vehicle from './Vehicle.js';
import FinishLine from './FinishLine.js';

export default class BikeRide extends Scene {
  private player: Player;

  private keyboard: KeyListener;

  private xPos: number;

  private yPos: number;

  private img: HTMLImageElement;

  private vehicle: Vehicle;

  private finishline: FinishLine;

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
    this.keyboard.onFrameStart();

    if (this.hasWon()) {
      return new GameWon(this.game);
    }

    if (this.hasLost()) {
      return new GameLost(this.game);
    }

    return null;
  }

  /**
   * Draw the game so the player can see what happened
   */
  public render(): void {
    // Clear the screen
    this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
    this.player.getSprite().drawSprite(this.game.ctx, this.player);
  }

  /**
   *
   * @param other the other GameItem
   * @returns true if this object collides with the specified other object
   */
  public collidesWith(other: GameItem): boolean {
    return this.xPos < other.getXPos() + other.getImage().width
      && this.xPos + this.img.width > other.getXPos()
      && this.yPos < other.getYPos() + other.getImage().height
      && this.yPos + this.img.height > other.getYPos();
  }

  private hasLost(): boolean {
    return this.player.collidesWith(this.vehicle);
  }

  private hasWon(): boolean {
    return this.player.collidesWith(this.finishline);
  }
}
