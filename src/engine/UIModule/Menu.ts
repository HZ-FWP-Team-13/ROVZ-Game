import GameObject from '../ObjectModule/GameObject.js';
import Button from './Button.js';
import Transform from '../ComponentsModule/Transform.js';
import Input from '../InputModule/Input.js';

export default class Menu extends GameObject {
  // The Buttons of the Menu
  private options: Map<string, Button>;

  /**
   * Create a new Menu instance
   *
   * @param id The id of the GameObject
   * @param transform The Transform of the GameObject
   * @param options The Buttons of the Menu
   */
  public constructor(id: string, transform: Transform, options: Map<string, Button>) {
    super(id, transform);
    this.options = options;
  }

  /**
   * Update this Menu
   *
   * @param input The Input matrix of the Scene
   * @returns The Button that the Mouse hovers over
   */
  public update(input: Input): string {
    let hoveredOption: string = '';
    this.options.forEach((option) => {
      // Changing the Button appearance when the Mouse hovers over it
      if (option.getMouseTrigger().checkMouseHover(
        input,
        option,
      )) {
        hoveredOption = option.getId();
        option.getMesh().setSourceImagePath('./assets/img/longButtonHover.png');
      } else {
        option.getMesh().setSourceImagePath('./assets/img/longButton.png');
      }
    });

    return hoveredOption;
  }

  /**
   * Draw this Menu on the Game Canvas
   *
   * @param ctx The Canvas Rendering Context
   * @param font The font of the text (optional)
   */
  public draw(ctx: CanvasRenderingContext2D, font?: string): void {
    ctx.textAlign = 'center';
    ctx.fillStyle = 'black';
    // Setting custom font (if given)
    if (font === undefined) {
      ctx.font = '20px serif';
    } else {
      ctx.font = font;
    }

    // Drawing the Menu Buttons to the Game Canvas
    this.options.forEach((option) => {
      option.draw(ctx);
    });
  }

  /**
   * Get the Buttons of this Menu
   *
   * @returns The Buttons of this Menu
   */
  public getOptions(): Map<string, Button> {
    return this.options;
  }

  /**
   * Set the Buttons of this Menu
   *
   * @param value The Buttons of this Menu
   */
  public setOptions(value: Map<string, Button>): void {
    this.options = value;
  }
}
