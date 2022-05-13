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
    triggers;
    constructor(game) {
        super(game);
        this.controls = new Controls(game, this.game.canvas.width / 2 - 500, (this.game.canvas.height / 8) * 0.5);
        this.player = new Player(game.canvas.width / 2, game.canvas.height / 2);
        this.car = new Car(300, 300, 'UP');
        this.triggers = [];
        this.triggers.push(this.createStateTrigger(300, 300, 50, 50, 'UP'));
        this.triggers.push(this.createStateTrigger(300, 0, 50, 50, 'RIGHT'));
        this.triggers.push(this.createStateTrigger(1000, 0, 50, 50, 'DOWN'));
        this.triggers.push(this.createStateTrigger(1000, 300, 50, 50, 'LEFT'));
        this.keyCommands = this.player.getKeyboard();
        this.controls.setDisplay(true);
    }
    processInput() {
        this.player.move(this.game.canvas);
    }
    update() {
        this.car.move();
        this.triggers.forEach(trigger => {
            this.car.collidesWithTrigger(trigger);
        });
        return null;
    }
    render() {
        let ctx = this.game.ctx;
        let canvas = this.game.canvas;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.triggers.forEach(trigger => {
            trigger.draw(ctx);
        });
        this.player.getSprite().drawSprite(ctx, this.player);
        this.car.draw(ctx);
    }
    getPlayer() {
        return this.player;
    }
    createStateTrigger(x, y, width, height, direction) {
        return new StateTrigger(x, y, width, height, direction);
    }
}
//# sourceMappingURL=Level.js.map