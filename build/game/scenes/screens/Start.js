import Graphics from '../../../engine/Graphics.js';
import Screen from '../../../engine/Screen.js';
import Level1 from '../levels/Level1.js';
export default class Start extends Screen {
    constructor(game) {
        super(game);
        game.reset();
    }
    update() {
        const start = this.input.readAxisTyped('Select');
        if (start) {
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