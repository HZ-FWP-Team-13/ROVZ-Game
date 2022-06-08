import Level from '../../../engine/SceneModule/Level.js';
import GameItem from '../../../engine/ObjectModule/GameItem.js';
import Player from '../../gameItems/Player.js';
import FovOverlay from '../../gameItems/FovOverlay.js';
import Vector2 from '../../../engine/MathModule/Vector2.js';
import Transform from '../../../engine/ComponentsModule/Transform.js';
import Mesh from '../../../engine/ComponentsModule/Mesh.js';
import Collider from '../../../engine/ComponentsModule/Collider.js';
import Building1 from '../../gameItems/structures/Building1.js';
export default class Level1 extends Level {
    background;
    player;
    fov;
    building;
    constructor(game) {
        super(game);
        this.background = new GameItem('background', new Transform(), new Mesh('./assets/img/background.png', new Vector2(1386, 980)));
        this.player = new Player('player', new Transform(new Vector2(game.canvas.width / 2, game.canvas.height / 2)), new Mesh('./assets/img/testplayer-old.png', new Vector2(32, 32)), new Collider());
        this.fov = new FovOverlay('fov', new Transform(), new Mesh('./assets/img/fov.png', new Vector2(6000, 6000)));
        this.building = new Building1('building1', new Transform(new Vector2(600, 700)), new Mesh('./assets/img/house.png', new Vector2(230, 240)), new Collider());
    }
    update(elapsed) {
        this.player.control(this.input, elapsed);
        this.player.getCollider().updatePoints(this.player.getTransform());
        this.building.getCollider().updatePoints(this.building.getTransform());
        console.log(Collider.checkCollision(this.player, this.building));
        if (Collider.checkCollision(this.player, this.building)) {
            console.log('COLLIDER DO SOMETHING PLEASE...');
        }
        this.fov.control(this.input, elapsed, this.getCamera());
        this.getCamera().getTransform().setPosition(this.player.getTransform().getPosition());
        this.fov.getTransform().setPosition(this.player.getTransform().getPosition());
        this.fov.getTransform().rotate(this.player.lastFrameRotationDifference);
        return null;
    }
    render() {
        this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        this.game.ctx.drawImage(this.background.getMesh().getSourceImage(), this.getCamera().getTransform().getPosition().getX() - this.getCamera().getFrameDimensions().getX() / 2, this.getCamera().getTransform().getPosition().getY() - this.getCamera().getFrameDimensions().getY() / 2, this.getCamera().getFrameDimensions().getX(), this.getCamera().getFrameDimensions().getY(), 0, 0, this.getCamera().getFrameDimensions().getX(), this.getCamera().getFrameDimensions().getY());
        this.player.getMesh().draw(this.game.ctx, this.player.getTransform(), this.getCamera());
        this.player.getCollider().draw(this.game.ctx, this.getCamera());
        this.building.getMesh().draw(this.game.ctx, this.building.getTransform(), this.getCamera());
        this.fov.getMesh().draw(this.game.ctx, this.fov.getTransform(), this.getCamera());
    }
}
//# sourceMappingURL=Level1.js.map