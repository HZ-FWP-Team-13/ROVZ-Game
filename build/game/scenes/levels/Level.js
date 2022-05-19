import Scene from '../../../engine/Scene.js';
import Player from '../../gameItems/Player.js';
import FovOverlay from '../../gameItems/FovOverlay.js';
import Car from '../../gameItems/Car.js';
export default class Level extends Scene {
    player;
    fov;
    cars;
    constructor(game) {
        super(game);
        this.player = new Player('./assets/img/testplayer-old.png', game.canvas.width / 2, game.canvas.height / 2, 0, 32, 32, 32, 32, 0);
        this.fov = new FovOverlay('./assets/img/fov.png', game.canvas.width / 2, game.canvas.height / 2, 0, 6000, 6000);
        this.cars = [];
        this.cars.push(new Car(1000, 100, 0));
        this.cars.push(new Car(1000, 200, 90));
        this.cars.push(new Car(1000, 1000, 143));
    }
    update() {
        this.player.control();
        this.fov.control();
        this.fov.setXPos(this.player.getXPos());
        this.fov.setYPos(this.player.getYPos());
        this.fov.rotate(this.player.getPreviousFrameRotation());
        this.handleCollisions();
        return null;
    }
    render() {
        this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        this.player.draw(this.game.ctx);
        this.cars.forEach(car => {
            car.draw(this.game.ctx);
        });
    }
    handleCollisions() {
        this.cars.forEach(car => {
            if (this.player.collidesWith(car)) {
                console.log('COLLIDED');
            }
        });
    }
}
//# sourceMappingURL=Level.js.map