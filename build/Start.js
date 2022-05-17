import Graphics from './Graphics.js';
import Input from './Input.js';
import Level from './Level.js';
import Scene from './Scene.js';
export default class Start extends Scene {
    input;
    constructor(game) {
        super(game);
        game.reset();
        this.input = new Input();
    }
    update() {
        if (this.input.readStartInput()) {
            return new Level(this.game);
        }
        return null;
    }
    render() {
        this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        this.game.ctx.drawImage(Graphics.loadNewImage('./assets/img/startscreen.png'), 0, 0, this.game.canvas.width, this.game.canvas.height);
    }
}
//# sourceMappingURL=Start.js.map