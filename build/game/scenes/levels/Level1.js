import Level from '../../../engine/SceneModule/Level.js';
import GameItem from '../../../engine/ObjectModule/GameItem.js';
import Player from '../../gameItems/Player.js';
import FovOverlay from '../../gameItems/FovOverlay.js';
import Vector2 from '../../../engine/MathModule/Vector2.js';
import Transform from '../../../engine/ComponentsModule/Transform.js';
import Mesh from '../../../engine/ComponentsModule/Mesh.js';
import Collider from '../../../engine/ComponentsModule/Collider.js';
import Car from '../../gameItems/Car.js';
import Path from '../../../engine/AIModule/Path.js';
import RectCollider from '../../../engine/ComponentsModule/RectCollider.js';
export default class Level1 extends Level {
    background;
    player;
    fov;
    cars;
    path;
    constructor(game) {
        super(game);
        this.background = new GameItem('background', new Transform(), new Mesh('./assets/img/background.png', new Vector2(1386, 980)));
        this.player = new Player('player', new Transform(new Vector2(game.canvas.width / 2, game.canvas.height / 2)), new Mesh('./assets/img/player/cyclist.png', new Vector2(28, 78), 4), new RectCollider(new Vector2(28, 78)));
        this.fov = new FovOverlay('fov', new Transform(), new Mesh('./assets/img/fov.png', new Vector2(6000, 6000)));
        this.path = new Path();
        const p = this.path;
        p.addPoint(new Vector2(0, 200));
        p.addPoint(new Vector2(600, 300));
        p.addPoint(new Vector2(-100, 500));
        this.cars = [];
        this.cars.push(new Car('car1', this.path, 0, new Mesh('assets/img/cars/car_red.png', new Vector2(64, 128), 0), new RectCollider(new Vector2(64, 128))), new Car('car2', this.path, 2, new Mesh('assets/img/cars/car_blue.png', new Vector2(64, 128), 0), new RectCollider(new Vector2(64, 128))));
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
            Collider.checkCollision(car, this.player);
        });
        return null;
    }
    render() {
        const camera = this.getCamera();
        this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        this.game.ctx.drawImage(this.background.getMesh().getSourceImage(), camera.getTransform().getPosition().getX() - camera.getFrameDimensions().getX() / 2, camera.getTransform().getPosition().getY() - camera.getFrameDimensions().getY() / 2, camera.getFrameDimensions().getX(), camera.getFrameDimensions().getY(), 0, 0, camera.getFrameDimensions().getX(), camera.getFrameDimensions().getY());
        this.cars.forEach((car) => {
            car.getMesh().draw(this.game.ctx, car.getTransform(), camera);
            car.getCollider().draw(this.game.ctx, camera);
        });
        this.path.draw(this.game.ctx, camera);
        this.player.getMesh().draw(this.game.ctx, this.player.getTransform(), camera);
        this.player.getCollider().draw(this.game.ctx, camera);
        this.fov.getMesh().draw(this.game.ctx, this.fov.getTransform(), camera);
    }
}
//# sourceMappingURL=Level1.js.map