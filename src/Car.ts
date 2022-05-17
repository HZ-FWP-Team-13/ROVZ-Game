import Game from "./Game.js";
import StateTrigger from "./StateTrigger.js";
export default class Car {
  // NOTE: I have yet to extend this from GameItem, since I'm having some trouble understanding it and
  // because I wanted to try out something with rotation to see if it works.

  private xPos: number;
  private yPos: number;
  private image: HTMLImageElement;
  private state: string; // Maybe we could use ENUMS here?
  private rotation: number;

  /** STATES FOR CAR
   *  UP, DOWN, LEFT, RIGHT: Driving in the given direction
   *  IDLE: Car doesn't move
   */

  public constructor(xPos: number, yPos: number, state: string) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.image = Game.loadNewImage('./assets/img/car.png');
    this.state = state;
    this.rotation = 0;
  }

  /**
   * @param ctx 2D rendering context for the canvas drawing surface
   */
   public draw(ctx: CanvasRenderingContext2D): void {
    // The 'root' of the gameobject sits at its center rather than its top left corner
    ctx.save();
    ctx.translate(this.xPos, this.yPos);
    ctx.rotate(this.rotation * Math.PI / 180);

    ctx.drawImage(
      this.image,
      -this.image.width / 2,
      -this.image.height / 2,
    );

    ctx.restore();
  }

  public move() {
    switch(this.state) {
      case 'UP': {
        this.yPos -= 3; // Replace with velocity
        this.rotation = 0;
        break;
      }

      case 'DOWN': {
        this.yPos += 3;
        this.rotation = 180;
        break;
      }

      case 'RIGHT': {
        this.xPos += 3;
        this.rotation = 90;
        break;
      }

      case 'LEFT': {
        this.xPos -= 3;
        this.rotation = 270;
        break;
      }

      case 'IDLE': {
        break;
      }

      case 'IDLE': {
        break;
      }
    }
  }

  public setState(state: string) : void {
    this.state = state;
  }


  /**
   * Sets a new x position for the GameObject
   *
   * @param xPos New x position
   */
  public setXPos(xPos: number) : void {
    this.xPos = xPos;
  }

  /**
   * Sets a new y position for the GameObject
   *
   * @param yPos New y position
   */
  public setYPos(yPos: number) : void {
    this.yPos = yPos;
  }

  /**
   * @returns current x position
   */
  public getXPos(): number {
    return this.xPos;
  }

  /**
   * @returns current y position
   */
  public getYPos(): number {
    return this.yPos;
  }

  /**
   *
   * @returns image width in pixels
   */
  public getImageWidth(): number {
    return this.image.width;
  }

  /**
   *
   * @returns image height in pixels
   */
  public getImageHeight(): number {
    return this.image.height;
  }

  /**
   * @returns top bound
   */
  public getTopBound(): number {
    return this.yPos - this.image.height / 2;
  }


  /**
   * @returns bottom bound
   */
   public getBottomBound(): number {
    return this.yPos + this.image.height / 2;
  }

  /**
   * @returns left bound of the object
   */
   public getLeftBound(): number {
    return this.xPos - this.image.width / 2;
  }

  /**
   * @returns right bound of the object
   */
  public getRightBound(): number {
    return this.xPos + this.image.width / 2;
  }


  // TODO: THIS DOES NOT ACCOUNT FOR ROTATION OR NON-SQUARE IMAGES
  // TODO: REFACTOR IT IN SUCH A WAY THAT CAR AND STATETRIGGER ARE SUB-CLASSES OF GAMEITEM
  // (STATETRIGGER MIGHT ALSO NEED TO BE REFACTORED AS A SUB-CLASS OF TRIGGER, WE'LL SEE)

  /**
   * Changes the state of the object when colliding with a trigger
   * @param trigger
   */
  public collidesWithTrigger(trigger: StateTrigger) : void {
    if (
      (this.getRightBound() >= trigger.getLeftBound()
        && this.getLeftBound() <= trigger.getRightBound())
      && (this.getTopBound() <= trigger.getBottomBound() && this.getBottomBound() >= trigger.getTopBound())
    ) {
      console.log(`${this} collided with ${trigger}`);
      this.state = trigger.getState();
    }
  }
}

