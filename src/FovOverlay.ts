import GameItem from './GameItem.js';

export default class FovOverlay extends GameItem {

  /**
   * Create a new FovOverlay instance
   *
   * @param ctx The Game Canvas rendering context
   *
   * @param xPos The X coordinate of the FovOverlay on the game canvas
   * @param yPos The Y coordinate of the FovOverlay on the game canvas
   */
   public constructor(ctx: CanvasRenderingContext2D, xPos: number, yPos: number) {
    super(ctx, './assets/img/fov.png', xPos, yPos, 0, 6000, 6000);
  }
}
