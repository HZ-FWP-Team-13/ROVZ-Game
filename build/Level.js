import Scene from './Scene.js';
import Player from './Player.js';
import FovOverlay from './FovOverlay.js';
import Car from './Car.js';
export default class Level extends Scene {
    player;
    cars;
    fov;
    isFovVisible = true;
    constructor(game) {
        super(game);
        this.player = new Player('./assets/img/testplayer-old.png', game.canvas.width / 2, game.canvas.height / 2, 0, 32, 32, 32, 32, 0);
        this.cars = [];
        this.cars.push(this.createNewCar(200, 200, 'RIGHT'));
        this.cars.push(this.createNewCar(400, 400, 'DOWN'));
        this.fov = new FovOverlay('./assets/img/fov.png', game.canvas.width / 2, game.canvas.height / 2, 0, 6000, 6000);
    }
    update() {
        this.player.control();
        this.fov.control();
        this.fov.setXPos(this.player.getXPos());
        this.fov.setYPos(this.player.getYPos());
        this.fov.rotate(this.player.getPreviousFrameRotation());
        this.cars.forEach(car => {
            car.move();
        });
        return null;
    }
    render() {
        let ctx = this.game.ctx;
        ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        this.cars.forEach(car => {
            car.draw(ctx);
        });
        this.player.draw(ctx);
        if (this.isFovVisible) {
            this.fov.draw(ctx);
        }
    }
    createNewCar(xPos, yPos, state) {
        return new Car(xPos, yPos, state);
    }
}
//# sourceMappingURL=Level.js.map