import Collider from '../../engine/ComponentsModule/Collider.js';
import Mesh from '../../engine/ComponentsModule/Mesh.js';
import Transform from '../../engine/ComponentsModule/Transform.js';
import Vector2 from '../../engine/MathModule/Vector2.js';
import GamePawn from '../../engine/ObjectModule/GamePawn.js';

export default class CarTrigger extends GamePawn {
  // Note that this is a draft and should probably be refactored to Trigger with subclass CarTrigger

  private targetSpeed: number;

  private rotationDirection: string;

  /**
   * Create a new Player instance
   *
   * @param id The id of the GameObject
   * @param transform The Transform of the GameObject
   * @param width width of the trigger
   * @param height height of the trigger
   */
  public constructor(id: string, transform: Transform, width: number, height: number,
    targetSpeed: number, rotationDirection: string) {
    super(id, transform, new Mesh('', new Vector2(width, height), 0), new Collider());
    this.targetSpeed = targetSpeed;
    this.rotationDirection = rotationDirection;

    this.getCollider().generateRectCollider(
      this.getMesh().getDimensions().getX(),
      this.getMesh().getDimensions().getY(),
    );
  }

  /**
   * SHUT THE FUCK UP ESLINT GOD FUCKING DAMN
   *
   * @param ctx CTX
   */
  public draw(ctx: CanvasRenderingContext2D) : void {
    ctx.fillStyle = 'orange';
    ctx.beginPath();
    for (let i = 0; i < this.getCollider().getUpdatedPoints().length; i++) {
      ctx.lineTo(
        this.getCollider().getUpdatedPoints()[i].getX(),
        this.getCollider().getUpdatedPoints()[i].getY(),
      );
    }
    ctx.closePath();
    ctx.fill();
  }

  /**
   * @returns Target Speed
   */
  public getTargetSpeed() : number {
    return this.targetSpeed;
  }
}
