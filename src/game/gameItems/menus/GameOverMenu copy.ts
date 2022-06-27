import Mesh from '../../../engine/ComponentsModule/Mesh.js';
import Transform from '../../../engine/ComponentsModule/Transform.js';
import Vector2 from '../../../engine/MathModule/Vector2.js';
import Button from '../../../engine/UIModule/Button.js';
import Menu from '../../../engine/UIModule/Menu.js';

export default class GameOverMenu extends Menu {
  /**
   * Create a new StartMenu instance
   *
   * @param buttonsTransforms The Tranfroms of the StartMenu Buttons
   */
  public constructor(buttonsTransforms: Map<string, Transform>) {
    super(
      // The id of the GameObject
      'startMenu',
      // The Transform of the GameObject
      new Transform(),
      // The Buttons of the Menu
      new Map<string, Button>([
        [
          'play',
          new Button(
            // The id of the GameObject
            'play',
            // The Transform of the GameObject
            new Transform(),
            // The Transform of the GameItem
            new Mesh(
              // The path to the Source Image of the GameItem Mesh
              './assets/img/longButton.png',
              // The dimensions of the GameItem Mesh
              new Vector2(200, 50),
            ),
            'Opnieuw Spelen',
          ),
        ],
        [
          'returnToTitle',
          new Button(
            // The id of the GameObject
            'returnToTitle',
            // The Transform of the GameObject
            new Transform(),
            // The Transform of the GameItem
            new Mesh(
              // The path to the Source Image of the GameItem Mesh
              './assets/img/longButton.png',
              // The dimensions of the GameItem Mesh
              new Vector2(200, 50),
            ),
            'Terug naar Titel',
          ),
        ],
      ]),
    );

    this.getOptions().forEach((value: Button, key: string) => {
      value.setTransform(buttonsTransforms.get(key));
    });
  }
}
