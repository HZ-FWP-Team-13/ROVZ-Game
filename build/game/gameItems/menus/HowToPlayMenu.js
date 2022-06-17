import Mesh from '../../../engine/ComponentsModule/Mesh.js';
import Transform from '../../../engine/ComponentsModule/Transform.js';
import Vector2 from '../../../engine/MathModule/Vector2.js';
import Button from '../../../engine/UIModule/Button.js';
import Menu from '../../../engine/UIModule/Menu.js';
export default class HowToPlayMenu extends Menu {
    constructor(buttonsTransforms) {
        super('howToPlayMenu', new Transform(), new Map([
            [
                'gotIt',
                new Button('gotIt', new Transform(), new Mesh('./assets/img/longButton.png', new Vector2(200, 50)), 'Got it!'),
            ],
        ]));
        this.getOptions().forEach((value, key) => {
            value.setTransform(buttonsTransforms.get(key));
        });
    }
}
//# sourceMappingURL=HowToPlayMenu.js.map