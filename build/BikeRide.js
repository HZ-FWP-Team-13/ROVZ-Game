import Player from './Player.js';
import Scene from './Scene.js';
import KeyListener from './KeyListener.js';
import GameLost from './GameLost.js';
import GameWon from './GameWon.js';
import Vehicle from './Vehicle.js';
import FinishLine from './FinishLine.js';
export default class BikeRide extends Scene {
    player;
    keyboard;
    xPos;
    yPos;
    img;
    car;
    finishLine;
    keyCommands;
    shouldStart;
    constructor(game) {
        super(game);
        this.keyboard = new KeyListener();
        this.shouldStart = false;
        this.player = new Player(game.canvas.width / 2, game.canvas.height / 2);
        this.car = new Vehicle(100, 100);
        this.finishLine = new FinishLine(1000, 1000);
        this.keyCommands = this.player.getKeyboard();
    }
    processInput() {
        this.player.move(this.game.canvas);
        if (this.keyboard.isKeyDown(KeyListener.KEY_R)) {
            this.shouldStart = true;
            console.log(this.shouldStart);
        }
    }
    update() {
        this.keyboard.onFrameStart();
        if (this.hasWon()) {
            return new GameWon(this.game);
        }
        if (this.hasLost()) {
            return new GameLost(this.game);
        }
        return null;
    }
    render() {
        this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        this.player.getSprite().drawSprite(this.game.ctx, this.player);
        this.car.draw(this.game.ctx);
        this.finishLine.draw(this.game.ctx);
    }
    collidesWith(other) {
        return this.xPos < other.getXPos() + other.getImage().width
            && this.xPos + this.img.width > other.getXPos()
            && this.yPos < other.getYPos() + other.getImage().height
            && this.yPos + this.img.height > other.getYPos();
    }
    hasLost() {
        return this.player.collidesWith(this.car);
    }
    hasWon() {
        return this.player.collidesWith(this.finishLine);
    }
}
//# sourceMappingURL=BikeRide.js.map