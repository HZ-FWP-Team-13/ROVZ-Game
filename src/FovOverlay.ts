import GameItem from './GameItem.js';
import KeyListener from './KeyListener.js';
import KeyCommands from './KeyCommands.js';

export default class FovOverlay extends GameItem {

  /**
   * Initialize Fov
   *
   * @param xPos xPosition of the fov
   * @param yPos yPostition of the fov
   */
  public constructor(xPos: number, yPos: number) {
    super(6000, 6000, './assets/img/fov.png', 0, 0, 0, 6000);
  }

  /**
   * Draws the fov to the screen
   *
   * @param ctx the rendering context to draw on
   */
  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(this.img, this.xPos - this.img.width / 2, this.yPos -  this.img.height / 2);
  }

  /**
   * @param canvas the canvas to move over, for max x and y positions
   */
   public move(canvas: HTMLCanvasElement): void {}
}
