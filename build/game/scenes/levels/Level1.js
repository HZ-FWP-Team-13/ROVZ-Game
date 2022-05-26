import Level from '../../../engine/SceneModule/Level.js';
import Player from '../../gameItems/Player.js';
import FovOverlay from '../../gameItems/FovOverlay.js';
import Vector2 from '../../../engine/MathModule/Vector2.js';
import Transform from '../../../engine/ComponentsModule/Transform.js';
import Mesh from '../../../engine/ComponentsModule/Mesh.js';
export default class Level1 extends Level {
    player;
    fov;
    constructor(game) {
        super(game);
        let sceneCentre = new Vector2(game.canvas.width / 2, game.canvas.height / 2);
        this.player = new Player(new Transform(sceneCentre), new Mesh('./assets/img/testplayer-old.png', new Vector2(32, 32)));
        this.fov = new FovOverlay(new Transform(sceneCentre), new Mesh('./assets/img/fov.png', new Vector2(6000, 6000)));
    }
    update() {
        this.player.control(this.input);
        this.fov.control(this.input);
        this.fov.transform.position = this.player.transform.position;
        this.fov.transform.rotate(this.player.lastFrameRotationDifference);
        return null;
    }
    render() {
        this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        this.player.mesh.draw(this.game.ctx, this.player.transform);
        this.fov.mesh.draw(this.game.ctx, this.fov.transform);
    }
}
//# sourceMappingURL=Level1.js.map