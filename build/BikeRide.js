import Scene from './Scene.js';
import GameLost from './GameLost.js';
import GameWon from './GameWon.js';
export default class BikeRide extends Scene {
    player;
    keyboard;
    xPos;
    yPos;
    img;
    vehicle;
    finishline;
    processInput() {
        this.player.move(this.game.canvas);
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
    }
    collidesWith(other) {
        return this.xPos < other.getXPos() + other.getImage().width
            && this.xPos + this.img.width > other.getXPos()
            && this.yPos < other.getYPos() + other.getImage().height
            && this.yPos + this.img.height > other.getYPos();
    }
    hasLost() {
        return this.player.collidesWith(this.vehicle);
    }
    hasWon() {
        return this.player.collidesWith(this.finishline);
    }
}
//# sourceMappingURL=BikeRide.js.map