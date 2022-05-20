import Graphics from '../../../engine/Graphics.js';
import Input from '../../../engine/InputModule/Input.js';
import InputAxis from '../../../engine/InputModule/InputAxis.js';
import KeyListener from '../../../engine/InputModule/KeyListener.js';
import Screen from '../../../engine/Screen.js';
import Level1 from '../levels/Level1.js';
export default class Start extends Screen {
    keyListener;
    constructor(game) {
        super(game);
        game.reset();
        this.keyListener = new KeyListener();
        this.input = new Input(new Map([
            ['startKey', new InputAxis(KeyListener.KEY_S)]
        ]));
    }
    update() {
        const fovRotation = this.input.readAxisInput('startKey');
        if (fovRotation) {
            return new Level1(this.game);
        }
        return null;
    }
    render() {
        this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        this.game.ctx.drawImage(Graphics.loadNewImage('./assets/img/startscreen.png'), 0, 0, this.game.canvas.width, this.game.canvas.height);
    }
}
//# sourceMappingURL=Start.js.map