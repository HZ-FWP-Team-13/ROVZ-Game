import Scene from './Scene.js';
import InputAxis from '../InputModule/InputAxis.js';
import KeyListener from '../InputModule/KeyListener.js';
export default class Screen extends Scene {
    constructor(game) {
        super(game);
        this.input.editAxises(new Map([
            [
                'horizontalMenuSelect',
                new InputAxis('Select Right', KeyListener.KEY_RIGHT, 'Select Left', KeyListener.KEY_LEFT),
            ],
            [
                'verticalMenuSelect',
                new InputAxis('Select Up', KeyListener.KEY_UP, 'Select Down', KeyListener.KEY_DOWN),
            ],
            [
                'Select',
                new InputAxis('Select', KeyListener.KEY_ENTER),
            ],
        ]));
    }
}
//# sourceMappingURL=Screen.js.map