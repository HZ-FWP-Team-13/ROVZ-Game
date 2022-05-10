import Scene from './Scene.js';
import Player from './Player.js';
import Controls from './Controls.js';
export default class Level extends Scene {
    player;
    controls;
    keyCommands;
    constructor(game) {
        super(game);
        this.controls = new Controls(game, this.game.canvas.width / 2 - 500, (this.game.canvas.height / 8) * 0.5);
        this.player = new Player(game.canvas.width / 2, game.canvas.height / 2);
        this.keyCommands = this.player.getKeyboard();
        this.controls.setDisplay(true);
    }
    processInput() {
        this.player.move(this.game.canvas);
    }
    update() {
        return null;
    }
    render() {
        this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        this.player.getSprite().drawSprite(this.game.ctx, this.player);
    }
    getPlayer() {
        return this.player;
    }
}
//# sourceMappingURL=Level.js.map