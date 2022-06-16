import Level from '../../../engine/SceneModule/Level.js';
import GameItem from '../../../engine/ObjectModule/GameItem.js';
import Player from '../../gameItems/Player.js';
import FovOverlay from '../../gameItems/FovOverlay.js';
import Vector2 from '../../../engine/MathModule/Vector2.js';
import Transform from '../../../engine/ComponentsModule/Transform.js';
import Mesh from '../../../engine/ComponentsModule/Mesh.js';
import Collider from '../../../engine/ComponentsModule/Collider.js';
import Factory from '../../Factory.js';
export default class Level1 extends Level {
    background;
    player;
    fov;
    buildings;
    constructor(game) {
        super(game);
        this.background = new GameItem('background', new Transform(), new Mesh('./assets/img/background.png', new Vector2(1386, 980)));
        this.player = new Player('player', new Transform(new Vector2(game.canvas.width / 2, game.canvas.height / 2)), new Mesh('./assets/img/testplayer-old.png', new Vector2(32, 32)), new Collider());
        this.fov = new FovOverlay('fov', new Transform(), new Mesh('./assets/img/fov.png', new Vector2(6000, 6000)));
        this.buildings = Factory.buildingFactory(200, 600, 4);
    }
    update(elapsed) {
        this.player.setHitbox(this.player);
        this.player.getHitbox().getCollider().updatePoints(this.player.getHitbox().getTransform());
        let collided = false;
        this.buildings.forEach((building) => {
            building.getCollider().updatePoints(building.getTransform());
            if (Collider.checkCollision(this.player.getHitbox(), building)) {
                collided = true;
                console.log('You crashed into a building -_-');
                const vector = Vector2.vectorDifference(this.player.getTransform().getPosition(), building.getTransform().getPosition());
                if (vector.getX() > 0) {
                    this.player.getTransform().getPosition().setX(this.player.getTransform().getPosition().getX() + 1);
                }
                else if (vector.getX() < 0) {
                    this.player.getTransform().getPosition().setX(this.player.getTransform().getPosition().getX() - 1);
                }
                if (vector.getY() > 0) {
                    this.player.getTransform().getPosition().setY(this.player.getTransform().getPosition().getY() + 2);
                }
                else if (vector.getY() < 0) {
                    this.player.getTransform().getPosition().setY(this.player.getTransform().getPosition().getY() - 2);
                }
            }
        });
        if (!collided) {
            this.player.control(this.input, elapsed);
        }
        this.player.getCollider().updatePoints(this.player.getTransform());
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
        this.buildings.forEach((building) => {
            building.getMesh().draw(this.game.ctx, building.getTransform(), this.getCamera());
            building.getCollider().draw(this.game.ctx, this.getCamera());
        });
        this.fov.getMesh().draw(this.game.ctx, this.fov.getTransform(), this.getCamera());
    }
}
//# sourceMappingURL=Level1.js.map