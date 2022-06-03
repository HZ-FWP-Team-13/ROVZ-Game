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
    cars;
    carTriggers;
    constructor(game) {
        super(game);
        this.background = new GameItem('background', new Transform(), new Mesh('./assets/img/background.png', new Vector2(1386, 980)));
        this.player = new Player('player', new Transform(new Vector2(game.canvas.width / 2, game.canvas.height / 2)), new Mesh('./assets/img/testplayer-old.png', new Vector2(32, 32)), new Collider());
        this.fov = new FovOverlay('fov', new Transform(), new Mesh('./assets/img/fov.png', new Vector2(6000, 6000)));
        this.cars = [];
        this.cars.push(new Car('car1', new Transform(new Vector2(300, 300), 180, new Vector2(1, 1)), new Mesh('', new Vector2(100, 100), 0), new Collider()));
    }
    update(elapsed) {
        this.player.update(elapsed);
        this.player.control(this.input, elapsed);
        this.fov.control(this.input, elapsed, this.getCamera());
        this.getCamera().getTransform().setPosition(this.player.getTransform().getPosition());
        this.fov.getTransform().setPosition(this.player.getTransform().getPosition());
        this.fov.getTransform().rotate(this.player.lastFrameRotationDifference);
        this.cars.forEach((car) => {
            car.update(elapsed);
        });
        return null;
    }
    render() {
        const camera = this.getCamera();
        this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        this.game.ctx.drawImage(this.background.getMesh().getSourceImage(), camera.getTransform().getPosition().getX() - camera.getFrameDimensions().getX() / 2, camera.getTransform().getPosition().getY() - camera.getFrameDimensions().getY() / 2, camera.getFrameDimensions().getX(), camera.getFrameDimensions().getY(), 0, 0, camera.getFrameDimensions().getX(), camera.getFrameDimensions().getY());
        this.cars.forEach((car) => {
            car.getMesh().draw(this.game.ctx, car.getTransform(), camera);
        });
        this.player.getMesh().draw(this.game.ctx, this.player.getTransform(), camera);
        this.player.getCollider().draw(this.game.ctx, camera);
        this.fov.getMesh().draw(this.game.ctx, this.fov.getTransform(), camera);
    }
}
//# sourceMappingURL=Level1.js.map