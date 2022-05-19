import Graphics from '../../../engine/Graphics.js';
import Input from '../../../engine/Input.js';
import Screen from '../../../engine/Screen.js';
import PolygonLevel from '../levels/PolygonLevel.js';
export default class Start extends Screen {
    constructor(game) {
        super(game);
        game.reset();
        this.input = new Input();
    }
    update() {
        if (this.input.readStartInput()) {
            return new PolygonLevel(this.game);
        }
        return null;
    }
    render() {
        this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        this.game.ctx.drawImage(Graphics.loadNewImage('./assets/img/startscreen.png'), 0, 0, this.game.canvas.width, this.game.canvas.height);
    }
}
//# sourceMappingURL=Start.js.map