import Level from '../../../engine/SceneModule/Level.js';
import GameItem from '../../../engine/ObjectModule/GameItem.js';
import Player from '../../gameItems/Player.js';
import FovOverlay from '../../gameItems/FovOverlay.js';
import Vector2 from '../../../engine/MathModule/Vector2.js';
import Transform from '../../../engine/ComponentsModule/Transform.js';
import Mesh from '../../../engine/ComponentsModule/Mesh.js';
import Collider from '../../../engine/ComponentsModule/Collider.js';
export default class Level1 extends Level {
    background;
    player;
    fov;
    constructor(game) {
        super(game);
        this.background = new GameItem("background", new Transform(), new Mesh('./assets/img/background.png', new Vector2(1386, 980)));
        this.player = new Player("player", new Transform(new Vector2(game.canvas.width / 2, game.canvas.height / 2)), new Mesh('./assets/img/testplayer-old.png', new Vector2(32, 32)), new Collider());
        this.fov = new FovOverlay("fov", new Transform(), new Mesh('./assets/img/fov.png', new Vector2(6000, 6000)));
    }
    update(elapsed) {
        this.player.control(this.input, elapsed);
        this.player.collider.updatePoints(this.player.transform);
        this.fov.control(this.input, elapsed, this.camera);
        this.camera.transform.position = this.player.transform.position;
        this.fov.transform.position = this.player.transform.position;
        this.fov.transform.rotate(this.player.lastFrameRotationDifference);
        return null;
    }
    render() {
        this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        this.game.ctx.drawImage(this.background.mesh.sourceImage, this.camera.transform.position.x - this.camera.frameDimensions.x / 2, this.camera.transform.position.y - this.camera.frameDimensions.y / 2, this.camera.frameDimensions.x, this.camera.frameDimensions.y, 0, 0, this.camera.frameDimensions.x, this.camera.frameDimensions.y);
        this.player.mesh.draw(this.game.ctx, this.player.transform, this.camera);
        this.player.collider.draw(this.game.ctx, this.camera);
        this.fov.mesh.draw(this.game.ctx, this.fov.transform, this.camera);
    }
}
//# sourceMappingURL=Level1.js.map