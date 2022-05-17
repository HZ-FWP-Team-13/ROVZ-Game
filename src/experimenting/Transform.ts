import Orientation from "./Orientation";
import Position from "./Position";
import Scale from "./Scale";

export default class Transform {
  private position: Position;
  private orientation: Orientation;
  private scale: Scale;

  /**
   * Create a new Transform instance
   */
  public constructor() {
    this.position = new Position();
    this.orientation = new Orientation();
    this.scale = new Scale();
  }
}
