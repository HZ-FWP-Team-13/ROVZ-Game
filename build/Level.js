import Scene from './Scene.js';
import Player from './Player.js';
import FovOverlay from './FovOverlay.js';
export default class Level extends Scene {
    player;
    fov;
    constructor(game) {
        super(game);
        this.player = new Player(this.game.ctx, './assets/img/testplayer-old.png', game.canvas.width / 2, game.canvas.height / 2, 0, 32, 32, 32, 32, 0);
        this.fov = new FovOverlay(this.game.ctx, './assets/img/fov.png', game.canvas.width / 2, game.canvas.height / 2, 0, 32, 32);
    }
    update() {
        return null;
    }
    render() {
        this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        this.player.draw();
        this.fov.setXPos(this.player.getXPos());
        this.fov.setYPos(this.player.getYPos());
        this.fov.draw();
        this.player.control();
        this.fov.control();
    }
    getPlayer() {
        return this.player;
    }
}
//# sourceMappingURL=Level.js.map