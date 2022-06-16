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
import Factory from '../../Factory.js';
export default class Level1 extends Level {
    background;
    player;
    fov;
    buildings;
    cars;
    path1;
    constructor(game) {
        super(game);
        this.background = new GameItem('background', new Transform(), new Mesh('./assets/img/level/roundabout.png', new Vector2(1386, 980)));
        this.player = new Player('player', new Transform(new Vector2(game.canvas.width / 2, game.canvas.height / 2)), new Mesh('./assets/img/player/cyclist.png', new Vector2(28, 78)), new RectCollider(new Vector2(28, 78)));
        this.fov = new FovOverlay('fov', new Transform(), new Mesh('./assets/img/fov.png', new Vector2(6000, 6000)));
        this.buildings = Factory.buildingFactory(200, 1600, 4);
        this.path1 = new Path();
        const p = this.path1;
        p.addPoint(new Vector2(550, 1000));
        p.addPoint(new Vector2(550, 650));
        p.addPoint(new Vector2(650, 550));
        p.addPoint(new Vector2(650, 450));
        p.addPoint(new Vector2(550, 350));
        p.addPoint(new Vector2(450, 350));
        p.addPoint(new Vector2(350, 450));
        p.addPoint(new Vector2(0, 450));
        this.cars = [];
        this.cars.push(new Car('car1', this.path1, 0, new Mesh('assets/img/cars/car_red.png', new Vector2(64, 128), 0), new RectCollider(new Vector2(64, 128))), new Car('car2', this.path1, 2, new Mesh('assets/img/cars/car_blue.png', new Vector2(64, 128), 0), new RectCollider(new Vector2(64, 128))));
    }
    update(elapsed) {
        this.player.setHitbox(this.player);
        this.player.getHitbox().getCollider().updatePoints(this.player.getHitbox().getTransform());
        if (!this.isColliding(this.buildings)) {
            this.player.control(this.input, elapsed);
        }
        if (!this.isColliding(this.cars)) {
            this.player.control(this.input, elapsed);
        }
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
    isColliding(objects) {
        let collided = false;
        objects.forEach((object) => {
            collided = true;
            object.getCollider().updatePoints(object.getTransform());
            if (Collider.checkCollision(this.player.getHitbox(), object)) {
                console.log('You crashed into a building -_-');
                const vector = Vector2.vectorDifference(this.player.getTransform().getPosition(), object.getTransform().getPosition());
                if (vector.getX() > 0) {
                    this.player.getTransform().getPosition().setX(this.player.getTransform().getPosition().getX() + 3);
                }
                else if (vector.getX() < 0) {
                    this.player.getTransform().getPosition().setX(this.player.getTransform().getPosition().getX() - 3);
                }
                if (vector.getY() > 0) {
                    this.player.getTransform().getPosition().setY(this.player.getTransform().getPosition().getY() + 3);
                }
                else if (vector.getY() < 0) {
                    this.player.getTransform().getPosition().setY(this.player.getTransform().getPosition().getY() - 3);
                }
            }
        });
        return collided;
    }
    render() {
        const camera = this.getCamera();
        this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        this.game.ctx.drawImage(this.background.getMesh().getSourceImage(), camera.getTransform().getPosition().getX() - camera.getFrameDimensions().getX() / 2, camera.getTransform().getPosition().getY() - camera.getFrameDimensions().getY() / 2, camera.getFrameDimensions().getX(), camera.getFrameDimensions().getY(), 0, 0, camera.getFrameDimensions().getX(), camera.getFrameDimensions().getY());
        this.cars.forEach((car) => {
            car.getMesh().draw(this.game.ctx, car.getTransform(), camera);
            car.getCollider().draw(this.game.ctx, camera);
        });
        this.path1.draw(this.game.ctx, camera);
        this.buildings.forEach((building) => {
            building.getMesh().draw(this.game.ctx, building.getTransform(), this.getCamera());
            building.getCollider().draw(this.game.ctx, this.getCamera());
        });
        this.player.getMesh().draw(this.game.ctx, this.player.getTransform(), camera);
        this.player.getCollider().draw(this.game.ctx, camera);
        this.fov.getMesh().draw(this.game.ctx, this.fov.getTransform(), camera);
    }
}
//# sourceMappingURL=Level1.js.map