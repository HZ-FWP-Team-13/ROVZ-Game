import Mesh from '../../../engine/ComponentsModule/Mesh.js';
import Transform from '../../../engine/ComponentsModule/Transform.js';
import Vector2 from '../../../engine/MathModule/Vector2.js';
import Button from '../../../engine/UIModule/Button.js';
import Menu from '../../../engine/UIModule/Menu.js';
export default class GameOverMenu extends Menu {
    constructor(buttonsTransforms) {
        super('startMenu', new Transform(), new Map([
            [
                'play',
                new Button('play', new Transform(), new Mesh('./assets/img/longButton.png', new Vector2(200, 50)), 'Opnieuw Spelen'),
            ],
            [
                'returnToTitle',
                new Button('returnToTitle', new Transform(), new Mesh('./assets/img/longButton.png', new Vector2(200, 50)), 'Terug naar Titel'),
            ],
        ]));
        this.getOptions().forEach((value, key) => {
            value.setTransform(buttonsTransforms.get(key));
        });
    }
}
//# sourceMappingURL=GameOverMenu%20copy.js.map