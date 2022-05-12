export default class StateTrigger {

  private x: number;
  private y: number;
  private width: number;
  private height: number;

  private state: string;

  public constructor(x: number, y: number, width: number, height: number, state: string) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.state = state;
  }

  // TODO: This can probably be tidied up to be consistent with how rectangles are drawn (i.e. x, y, width, height).
  public draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height)
    ctx.stroke();
  }

  public getState() : string {
    return this.state;
  }

  /**
   * @returns top bound
   */
   public getTopBound(): number {
    return this.y;
  }


  /**
   * @returns bottom bound
   */
   public getBottomBound(): number {
    return this.y + this.height;
  }

  /**
   * @returns left bound of the object
   */
   public getLeftBound(): number {
    return this.x;
  }

  /**
   * @returns right bound of the object
   */
  public getRightBound(): number {
    return this.x + this.width;
  }

}
