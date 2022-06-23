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
    player;
    fov;
    cars;
    pg1;
    pg2;
    rag1;
    tg1;
    tg2;
    path1;
    path2;
    goal;
    constructor(game) {
        super(game);
        this.background = new GameItem('background', new Transform(), new Mesh('./assets/img/level/biglevel.png', new Vector2(3000, 3000)));
        this.player = new Player('player', new Transform(new Vector2(1634, 2500)), new Mesh('./assets/img/player/cyclist.png', new Vector2(28, 78)), new RectCollider(new Vector2(28, 78)));
        this.fov = new FovOverlay('fov', new Transform(), new Mesh('./assets/img/fov.png', new Vector2(6000, 6000)));
        this.pg1 = [];
        this.pg1.push(new Vector2(1150, 0), new Vector2(1150, 1400), new Vector2(1200, 1450), new Vector2(1150, 1500), new Vector2(1150, 2900), new Vector2(1100, 2950), new Vector2(1200, 2950), new Vector2(2400, 2950), new Vector2(2450, 2900), new Vector2(2500, 2950), new Vector2(3600, 2950), new Vector2(3650, 2900), new Vector2(3650, 1500), new Vector2(3600, 1450), new Vector2(3650, 1400), new Vector2(3650, 0), new Vector2(2800, 1450), new Vector2(2450, 1000), new Vector2(2450, 0), new Vector2(2200, 1450), new Vector2(2450, 1700), new Vector2(0, 2950));
        this.pg2 = [];
        this.pg2.push(new Vector2(0, 3050), new Vector2(1200, 3050), new Vector2(1250, 3000), new Vector2(1300, 3050), new Vector2(2500, 3050), new Vector2(2550, 3000), new Vector2(2600, 3050), new Vector2(3700, 3050), new Vector2(3750, 3000), new Vector2(3750, 1400), new Vector2(3700, 1350), new Vector2(3750, 1300), new Vector2(3750, 0), new Vector2(2800, 1350), new Vector2(2500, 1100), new Vector2(2200, 1350), new Vector2(2550, 1700), new Vector2(2550, 0), new Vector2(1250, 1400), new Vector2(1200, 1350), new Vector2(1250, 1300), new Vector2(1250, 0));
        this.rag1 = [];
        this.rag1.push(new Vector2(2550, 1580), new Vector2(2680, 1450), new Vector2(2680, 1350), new Vector2(2550, 1220), new Vector2(2450, 1220), new Vector2(2320, 1350), new Vector2(2320, 1450), new Vector2(2450, 1580));
        this.tg1 = [];
        this.tg1.push(new Vector2(4150, -10000), new Vector2(4150, 10000));
        this.tg2 = [];
        this.tg2.push(new Vector2(4350, 10000), new Vector2(4350, -10000));
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
        this.fov.getMesh().draw(this.game.ctx, this.fov.getTransform(), camera);
    }
}
//# sourceMappingURL=Level1.js.map