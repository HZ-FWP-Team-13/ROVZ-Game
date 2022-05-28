import Player from '../../gameItems/Player.js';
import FovOverlay from '../../gameItems/FovOverlay.js';
import Level from '../../../engine/Level.js';
import Input from '../../../engine/Input.js';
import Collider from '../../../engine/experimenting/Collider.js';
export default class Level1 extends Level {
    player;
    player2;
    fov;
    constructor(game) {
        super(game);
        this.input = new Input();
        this.player = new Player('./assets/img/testplayer.png', game.canvas.width / 2, game.canvas.height / 2, 0, 32, 32, 0);
        this.fov = new FovOverlay('./assets/img/fov.png', game.canvas.width / 2, game.canvas.height / 2, 0, 6000, 6000);
        this.player2 = new Player('./assets/img/testplayer.png', game.canvas.width / 3, game.canvas.height / 3, 0, 32, 32, 0);
    }
    update() {
        this.player.control(this.input);
        this.fov.control(this.input);
        this.fov.transform.position = this.player.transform.position;
        this.fov.transform.rotate(this.player.getPreviousFrameRotation());
        this.player2.collider.updatePoints(this.player2.transform);
        if (Collider.checkCollision(this.player, this.player2)) {
            console.log('true');
        }
        else {
            console.log('false');
        }
        return null;
    }
    render() {
        this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        this.player.mesh.draw(this.game.ctx, this.player.transform);
        this.player2.mesh.draw(this.game.ctx, this.player2.transform);
        this.fov.mesh.draw(this.game.ctx, this.fov.transform);
        this.player.collider.draw(this.game.ctx);
    }
}
//# sourceMappingURL=Level1.js.map