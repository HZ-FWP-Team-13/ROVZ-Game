import GameObject from "../ObjectModule/GameObject.js";
import Transform from "../ComponentsModule/Transform.js";

export default class Camera extends GameObject {
  /**
   * Create a new Camera instance
   *
   * @param id The id of the GameObject
   * @param transform The Transform of the Camera
   */
  public constructor(id: string, transform: Transform) {
    super(id, transform);
  }
}
