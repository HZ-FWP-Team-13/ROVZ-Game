import Game from "./Game.js";
import GameItem from "./GameItem.js";
// import StateTrigger from "./StateTrigger.js";
export default class Car extends GameItem {

  // NOTE: I have yet to extend this from GameItem, since I'm having some trouble understanding it and
  // because I wanted to try out something with rotation to see if it works.


  private state: string; // Maybe we could use ENUMS here?

  /** STATES FOR CAR
   *  UP, DOWN, LEFT, RIGHT: Driving in the given direction
   *  IDLE: Car doesn't move
   */

  public constructor(xPos: number, yPos: number, state: string) {
    super('./assets/img/placeholder_car.png', xPos, yPos, 0, 128, 128, 128, 128, 0);
    this.state = state;
  }


  public control(): void {
    return null;
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

  // TODO: THIS DOES NOT ACCOUNT FOR ROTATION OR NON-SQUARE IMAGES
  // TODO: REFACTOR IT IN SUCH A WAY THAT CAR AND STATETRIGGER ARE SUB-CLASSES OF GAMEITEM
  // (STATETRIGGER MIGHT ALSO NEED TO BE REFACTORED AS A SUB-CLASS OF TRIGGER, WE'LL SEE)

  /**
   * Changes the state of the object when colliding with a trigger
   * @param trigger
   */
  /**
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
  */
}

