import Scene from './Scene.js';
import Player from './Player.js';
import Controls from './Controls.js';
import Car from './Car.js';
import StateTrigger from './StateTrigger.js';
export default class Level extends Scene {
    player;
    controls;
    keyCommands;
    car;
    trigger;
    constructor(game) {
        super(game);
        this.controls = new Controls(game, this.game.canvas.width / 2 - 500, (this.game.canvas.height / 8) * 0.5);
        this.player = new Player(game.canvas.width / 2, game.canvas.height / 2);
        this.car = new Car(300, 300, 'UP');
        this.trigger = new StateTrigger(300, 300, 50, 50, 'RIGHT');
        this.keyCommands = this.player.getKeyboard();
        this.controls.setDisplay(true);
        console.log(this.car.getLeftBound(), this.car.getRightBound(), this.car.getTopBound(), this.car.getBottomBound());
        console.log(this.trigger.getLeftBound(), this.trigger.getRightBound(), this.trigger.getTopBound(), this.trigger.getBottomBound());
    }
    processInput() {
        this.player.move(this.game.canvas);
    }
    update() {
        this.car.move();
        this.car.collidesWithTrigger(this.trigger);
        return null;
    }
    render() {
        let ctx = this.game.ctx;
        let canvas = this.game.canvas;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.trigger.draw(ctx);
        this.player.getSprite().drawSprite(ctx, this.player);
        this.car.draw(ctx);
    }
    getPlayer() {
        return this.player;
    }
}
//# sourceMappingURL=Level.js.map