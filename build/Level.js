import Scene from './Scene.js';
import Player from './Player.js';
import FovOverlay from './FovOverlay.js';
export default class Level extends Scene {
    player;
    fov;
    keyCommands;
    constructor(game) {
        super(game);
        this.player = new Player(game.canvas.width / 2, game.canvas.height / 2);
        this.fov = new FovOverlay(game.canvas.width / 2, game.canvas.height / 2);
        this.keyCommands = this.player.getKeyboard();
    }
    processInput() {
        this.player.move(this.game.canvas);
    }
    update() {
        return null;
    }
    render() {
        this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        this.player.draw(this.game.ctx);
        this.fov.setXPos(this.player.getXPos());
        this.fov.setYPos(this.player.getYPos());
        this.fov.draw(this.game.ctx);
    }
    getPlayer() {
        return this.player;
    }
}
//# sourceMappingURL=Level.js.map