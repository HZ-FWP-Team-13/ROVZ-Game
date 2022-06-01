import Scene from './Scene.js';
import Camera from '../GraphicsModule/Camera.js';
import InputAxis from '../InputModule/InputAxis.js';
import KeyListener from '../InputModule/KeyListener.js';
import Vector2 from '../MathModule/Vector2.js';
export default class Level extends Scene {
    camera;
    constructor(game) {
        super(game);
        this.camera = new Camera('camera', new Vector2(game.canvas.width, game.canvas.height));
        this.input.editAxises(new Map([
            [
                'horizontalMovement',
                new InputAxis('Move Right', KeyListener.KEY_D, 'Move Left', KeyListener.KEY_A),
            ],
            [
                'verticalMovement',
                new InputAxis('Move Up', KeyListener.KEY_W, 'Move Down', KeyListener.KEY_S),
            ],
        ]));
    }
    getCamera() {
        return this.camera;
    }
    setCamera(value) {
        this.camera = value;
    }
}
//# sourceMappingURL=Level.js.map