import Player from '../../gameItems/Player.js';
import FovOverlay from '../../gameItems/FovOverlay.js';
import Level from '../../../engine/Level.js';
import Input from '../../../engine/Input.js';
export default class Level1 extends Level {
    player;
    fov;
    constructor(game) {
        super(game);
        this.input = new Input();
        this.player = new Player('./assets/img/testplayer-old.png', game.canvas.width / 2, game.canvas.height / 2, 0, 32, 32, 0);
        this.fov = new FovOverlay('./assets/img/fov.png', game.canvas.width / 2, game.canvas.height / 2, 0, 6000, 6000);
    }
    update() {
        this.player.control(this.input);
        this.fov.control(this.input);
        this.fov.transform.position = this.player.transform.position;
        this.fov.transform.rotate(this.player.getPreviousFrameRotation());
        return null;
    }
    render() {
        this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        this.player.mesh.draw(this.game.ctx, this.player.transform);
        this.fov.mesh.draw(this.game.ctx, this.fov.transform);
        this.player.collider.draw(this.game.ctx);
    }
}
//# sourceMappingURL=Level1.js.map