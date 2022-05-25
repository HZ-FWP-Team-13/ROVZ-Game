import InputAxis from './InputModule/InputAxis.js';
import KeyListener from './InputModule/KeyListener.js';
import Scene from './Scene.js';
export default class Level extends Scene {
    constructor(game) {
        super(game);
        this.input.editAxises(new Map([
            [
                'horizontalMovement',
                new InputAxis('Move Right', KeyListener.KEY_D, 'Move Left', KeyListener.KEY_A)
            ],
            [
                'verticalMovement',
                new InputAxis('Move Up', KeyListener.KEY_W, 'Move Down', KeyListener.KEY_S)
            ]
        ]));
    }
}
//# sourceMappingURL=Level.js.map