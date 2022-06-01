import Level from '../../../engine/SceneModule/Level.js';
import GameItem from '../../../engine/ObjectModule/GameItem.js';
import Player from '../../gameItems/Player.js';
import FovOverlay from '../../gameItems/FovOverlay.js';
import Vector2 from '../../../engine/MathModule/Vector2.js';
import Transform from '../../../engine/ComponentsModule/Transform.js';
import Mesh from '../../../engine/ComponentsModule/Mesh.js';
import Collider from '../../../engine/ComponentsModule/Collider.js';
import Car from '../../gameItems/Car.js';
export default class Level1 extends Level {
    background;
    player;
    fov;
    car;
    constructor(game) {
        super(game);
        this.background = new GameItem('background', new Transform(), new Mesh('./assets/img/background.png', new Vector2(1386, 980)));
        this.player = new Player('player', new Transform(new Vector2(game.canvas.width / 2, game.canvas.height / 2)), new Mesh('./assets/img/testplayer-old.png', new Vector2(32, 32)), new Collider());
        this.fov = new FovOverlay('fov', new Transform(), new Mesh('./assets/img/fov.png', new Vector2(6000, 6000)));
        this.car = new Car('car', new Transform(new Vector2(100, 100), 0, new Vector2(1, 1)), new Mesh('./assets/img/car_placeholder.png', new Vector2(64, 142)), new Collider());
    }
    update(elapsed) {
        this.player.control(this.input, elapsed);
        this.car.update(elapsed);
        this.player.getCollider().updatePoints(this.player.getTransform());
        this.car.getCollider().updatePoints(this.car.getTransform());
        this.fov.control(this.input, elapsed, this.getCamera());
        this.getCamera().getTransform().setPosition(this.player.getTransform().getPosition());
        this.fov.getTransform().setPosition(this.player.getTransform().getPosition());
        this.fov.getTransform().rotate(this.player.lastFrameRotationDifference);
        return null;
    }
    render() {
        this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        this.game.ctx.drawImage(this.background.getMesh().getSourceImage(), this.getCamera().getTransform().getPosition().getX()
            - this.getCamera().getFrameDimensions().getX() / 2, this.getCamera().getTransform().getPosition().getY()
            - this.getCamera().getFrameDimensions().getY() / 2, this.getCamera().getFrameDimensions().getX(), this.getCamera().getFrameDimensions().getY(), 0, 0, this.getCamera().getFrameDimensions().getX(), this.getCamera().getFrameDimensions().getY());
        this.player.getMesh().draw(this.game.ctx, this.player.getTransform(), this.getCamera());
        this.player.getCollider().draw(this.game.ctx, this.getCamera());
        this.car.getMesh().draw(this.game.ctx, this.car.getTransform(), this.getCamera());
        this.car.getCollider().draw(this.game.ctx, this.getCamera());
        this.fov.getMesh().draw(this.game.ctx, this.fov.getTransform(), this.getCamera());
    }
}
//# sourceMappingURL=Level1.js.map