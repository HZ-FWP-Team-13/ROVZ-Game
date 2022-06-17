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
import Goal from '../../gameItems/Goal.js';
import Start from '../screens/Start.js';
export default class Level1 extends Level {
    background;
    foreground;
    player;
    fov;
    cars;
    path1;
    path2;
    goal;
    constructor(game) {
        super(game);
        this.background = new GameItem('background', new Transform(), new Mesh('./assets/img/level/ra_bg.png', new Vector2(3000, 3000)));
        this.foreground = new GameItem('foreground', new Transform(), new Mesh('./assets/img/level/ra_fg.png', new Vector2(3000, 3000)));
        this.player = new Player('player', new Transform(new Vector2(1634, 2500)), new Mesh('./assets/img/player/cyclist.png', new Vector2(28, 78)), new RectCollider(new Vector2(28, 78)));
        this.fov = new FovOverlay('fov', new Transform(), new Mesh('./assets/img/fov.png', new Vector2(6000, 6000)));
        this.goal = new Goal('goal', new Vector2(700, 1350));
        this.path1 = new Path();
        const p1 = this.path1;
        p1.addPoint(new Vector2(1550, 2900));
        p1.addPoint(new Vector2(1550, 1700));
        p1.addPoint(new Vector2(1700, 1550));
        p1.addPoint(new Vector2(1700, 1450));
        p1.addPoint(new Vector2(1550, 1300));
        p1.addPoint(new Vector2(1450, 1300));
        p1.addPoint(new Vector2(1300, 1450));
        p1.addPoint(new Vector2(100, 1450));
        this.path1.setLastPointIndex(this.path1.getPoints().length - 1);
        this.path2 = new Path();
        const p2 = this.path2;
        p2.addPoint(new Vector2(3000 - 1550, 3000 - 2900));
        p2.addPoint(new Vector2(3000 - 1550, 3000 - 1700));
        p2.addPoint(new Vector2(3000 - 1700, 3000 - 1550));
        p2.addPoint(new Vector2(3000 - 1700, 3000 - 1450));
        p2.addPoint(new Vector2(3000 - 1550, 3000 - 1300));
        p2.addPoint(new Vector2(3000 - 1450, 3000 - 1300));
        p2.addPoint(new Vector2(3000 - 1300, 3000 - 1450));
        p2.addPoint(new Vector2(3000 - 100, 3000 - 1450));
        this.path2.setLastPointIndex(this.path1.getPoints().length - 1);
        this.cars = [];
        this.cars.push(new Car('car1', this.path1, 0, 'RED'), new Car('car2', this.path1, 1, 'BLUE'), new Car('car3', this.path2, 2, 'GREEN'), new Car('car4', this.path2, 6, 'RED'));
    }
    update(elapsed) {
        this.player.setHitbox(this.player);
        this.player.getHitbox().getCollider().updatePoints(this.player.getHitbox().getTransform());
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
        this.goal.getCollider().updatePoints(this.goal.getTransform());
        if (Collider.checkCollision(this.goal, this.player)) {
            return new Start(this.game);
        }
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
        });
        this.player.getMesh().draw(this.game.ctx, this.player.getTransform(), camera);
        this.goal.getMesh().draw(this.game.ctx, this.goal.getTransform(), camera);
        this.game.ctx.drawImage(this.foreground.getMesh().getSourceImage(), camera.getTransform().getPosition().getX() - camera.getFrameDimensions().getX() / 2, camera.getTransform().getPosition().getY() - camera.getFrameDimensions().getY() / 2, camera.getFrameDimensions().getX(), camera.getFrameDimensions().getY(), 0, 0, camera.getFrameDimensions().getX(), camera.getFrameDimensions().getY());
        this.fov.getMesh().draw(this.game.ctx, this.fov.getTransform(), camera);
    }
}
//# sourceMappingURL=Level1.js.map