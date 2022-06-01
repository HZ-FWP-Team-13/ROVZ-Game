import Screen from '../../../engine/SceneModule/Screen.js';
import Level1 from '../levels/Level1.js';
import Graphics from '../../../engine/GraphicsModule/Graphics.js';
export default class Start extends Screen {
    constructor(game) {
        super(game);
        game.reset();
    }
    update() {
        if (this.input.readAxisTyped('Select')) {
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