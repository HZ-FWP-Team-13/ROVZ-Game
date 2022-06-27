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
import Train from '../../gameItems/Train.js';
import Building from '../../gameItems/structures/Building.js';
export default class Level1 extends Level {
    background;
    player;
    fov;
    structures;
    vehicles;
    pg1;
    pg2;
    rag1;
    tg1;
    tg2;
    path1;
    path2;
    trainpath1;
    trainpath2;
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
        p1.addPoint(this.pg1[0]);
        p1.addPoint(this.pg1[1]);
        p1.addPoint(this.pg1[2]);
        p1.addPoint(this.pg1[19]);
        p1.addPoint(this.rag1[6]);
        p1.addPoint(this.rag1[7]);
        p1.addPoint(this.pg1[20]);
        p1.addPoint(this.pg1[8]);
        p1.addPoint(this.pg1[7]);
        p1.addPoint(this.pg1[6]);
        p1.addPoint(this.pg1[5]);
        p1.addPoint(this.pg1[21]);
        this.path1.setLastPointIndex(this.path1.getPoints().length - 1);
        this.trainpath1 = new Path();
        this.trainpath1.addPoint(this.tg1[0]);
        this.trainpath1.addPoint(this.tg1[1]);
        this.trainpath1.setLastPointIndex(1);
        this.trainpath2 = new Path();
        this.trainpath2.addPoint(this.tg2[0]);
        this.trainpath2.addPoint(this.tg2[1]);
        this.trainpath2.setLastPointIndex(1);
        this.vehicles = [];
        this.vehicles.push(new Car('car1', this.path1, 0, 'RED'), new Car('car2', this.path1, 1, 'BLUE'), new Car('car3', this.path1, 7, 'GREEN'), new Train('train1', this.trainpath1, 0), new Train('train2', this.trainpath2, 0));
        this.structures = [];
        this.structures.push(new Building('wall_north', new Transform(new Vector2(2900, 0), 0), new Mesh('', new Vector2(5800, 200)), new RectCollider(new Vector2(5800, 200))), new Building('wall_east', new Transform(new Vector2(5800, 2110), 0), new Mesh('', new Vector2(200, 4220)), new RectCollider(new Vector2(200, 4220))), new Building('wall_south', new Transform(new Vector2(2900, 4220), 0), new Mesh('', new Vector2(5800, 200)), new RectCollider(new Vector2(5800, 200))), new Building('wall_west', new Transform(new Vector2(0, 2110), 0), new Mesh('', new Vector2(200, 4220)), new RectCollider(new Vector2(200, 4220))), new Building('forest1', new Transform(new Vector2(510, 360), 0), new Mesh('', new Vector2(1020, 720)), new RectCollider(new Vector2(1020, 720))));
    }
    update(elapsed) {
        this.player.setHitbox(this.player);
        this.player.getHitbox().getCollider().updatePoints(this.player.getHitbox().getTransform());
        if (!this.isColliding(this.vehicles)) {
            this.player.control(this.input, elapsed);
        }
        this.player.control(this.input, elapsed);
        this.fov.control(this.input, elapsed, this.getCamera());
        this.getCamera().getTransform().setPosition(this.player.getTransform().getPosition());
        this.fov.getTransform().setPosition(this.player.getTransform().getPosition());
        this.fov.getTransform().rotate(this.player.lastFrameRotationDifference);
        this.vehicles.forEach((vehicle) => {
            vehicle.update(elapsed);
            Collider.checkCollision(vehicle, this.player);
        });
        this.goal.getCollider().updatePoints(this.goal.getTransform());
        if (Collider.checkCollision(this.goal, this.player)) {
            return new Start(this.game);
        }
        this.isColliding(this.structures);
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
        this.vehicles.forEach((vehicle) => {
            vehicle.getMesh().draw(this.game.ctx, vehicle.getTransform(), camera);
        });
        this.player.getMesh().draw(this.game.ctx, this.player.getTransform(), camera);
        this.goal.getMesh().draw(this.game.ctx, this.goal.getTransform(), camera);
        this.fov.getMesh().draw(this.game.ctx, this.fov.getTransform(), camera);
        this.structures.forEach((structure) => {
            structure.getCollider().draw(this.game.ctx, camera);
        });
    }
}
//# sourceMappingURL=Level1.js.map