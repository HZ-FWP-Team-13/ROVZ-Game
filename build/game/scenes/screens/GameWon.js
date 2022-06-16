import KeyListener from '../../../engine/InputModule/KeyListener.js';
import Scene from '../../../engine/SceneModule/Scene.js';
import Start from './Start.js';
export default class GameWon extends Scene {
    shouldStart;
    keyboard;
    constructor(game) {
        super(game);
        this.keyboard = new KeyListener();
        this.shouldStart = false;
    }
    processInput() {
        if (this.keyboard.isKeyDown(KeyListener.KEY_R)) {
            this.shouldStart = true;
        }
        if (this.keyboard.isKeyDown(KeyListener.KEY_SPACE)) {
            this.shouldStart = true;
            console.log(this.shouldStart);
        }
    }
    update() {
        if (this.shouldStart) {
            return new Start(this.game);
        }
        return null;
    }
    render() {
        this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
    }
}
//# sourceMappingURL=GameWon.js.map