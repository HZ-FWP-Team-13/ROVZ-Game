import GameItem from '../ObjectModule/GameItem.js';
import MouseTrigger from '../ComponentsModule/MouseTrigger.js';
import Transform from '../ComponentsModule/Transform.js';
import Mesh from '../ComponentsModule/Mesh.js';
import Vector2 from '../MathModule/Vector2.js';

export default class Button extends GameItem {
  // The text of the Button
  private text: string;

  // MouseTrigger Component
  private mouseTrigger: MouseTrigger;

  /**
   * Create a new Button instance
   *
   * @param id The id of the GameObject
   * @param transform The Transform of the GameObject
   * @param mesh The Mesh of the GameItem
   * @param text The text of the Button
   */
  public constructor(id: string, transform: Transform, mesh: Mesh, text: string) {
    super(id, transform, mesh);
    this.text = text;
    this.mouseTrigger = new MouseTrigger();
  }

  /**
   * Draw this Button on the Game Canvas
   *
   * @param ctx The Canvas Rendering Context
   */
  public draw(ctx: CanvasRenderingContext2D): void {
    // Drawing the Mesh of a Button on the Game Canvas
    this.getMesh().draw(ctx, this.getTransform());

    // Drawing the text of the Button on the Game Canvas
    const { width } = ctx.measureText(this.text);
    ctx.fillText(
      this.text,
      this.getTransform().getPosition().getX() - width / 2,
      this.getTransform().getPosition().getY() + 5,
    );
  }

  /**
   * Get the text of this Button
   *
   * @returns The text of this Button
   */
  public getText(): string {
    return this.text;
  }

  /**
   * Set the text of this Button
   *
   * @param value The text of this Button
   */
  public setText(value: string): void {
    this.text = value;
  }

  /**
   * Get the MouseTrigger of this Button
   *
   * @returns The MouseTrigger of this Button
   */
  public getMouseTrigger(): MouseTrigger {
    return this.mouseTrigger;
  }
}
