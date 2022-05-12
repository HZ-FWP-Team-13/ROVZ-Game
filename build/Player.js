import GameItem from './GameItem.js';
import KeyListener from './KeyListener.js';
import KeyCommands from './KeyCommands.js';
export default class Player extends GameItem {
    xVel;
    yVel;
    keyCommands;
    constructor(xPos, yPos) {
        super(32, 32, './assets/img/testplayer.png', xPos, yPos, 5, 128);
        this.xVel = 3;
        this.yVel = 3;
        this.currentAnimation = 'idle-down';
        this.keyCommands = new KeyCommands();
    }
    draw(ctx) {
        this.getSprite().drawSprite(ctx, this);
    }
    move(canvas) {
        const minX = 0;
        const maxX = canvas.width - this.img.width;
        const minY = 0;
        const maxY = canvas.height - this.img.height;
        if (this.keyCommands.getKeys().isKeyDown(KeyListener.KEY_RIGHT) && this.xPos < maxX) {
            this.xPos += this.xVel;
            this.getSprite().setAnimation('walk-right');
            if (this.xPos > maxX) {
                this.xPos = maxX;
            }
        }
        else if (this.keyCommands.getKeys().isKeyTyped(KeyListener.KEY_RIGHT)
            && !this.keyCommands.getKeys().isKeyDown(KeyListener.KEY_RIGHT)) {
            this.getSprite().setAnimation('idle-right');
        }
        if (this.keyCommands.getKeys().isKeyDown(KeyListener.KEY_LEFT) && this.xPos > minX) {
            this.xPos -= this.xVel;
            this.getSprite().setAnimation('walk-left');
            if (this.xPos < minX) {
                this.xPos = minX;
            }
        }
        else if (this.keyCommands.getKeys().isKeyTyped(KeyListener.KEY_LEFT)
            && !this.keyCommands.getKeys().isKeyDown(KeyListener.KEY_LEFT)) {
            this.getSprite().setAnimation('idle-left');
        }
        if (this.keyCommands.getKeys().isKeyDown(KeyListener.KEY_UP) && this.yPos > minY) {
            this.yPos -= this.yVel;
            this.getSprite().setAnimation('walk-up');
            if (this.yPos < minY) {
                this.yPos = minY;
            }
        }
        else if (this.keyCommands.getKeys().isKeyTyped(KeyListener.KEY_UP)
            && !this.keyCommands.getKeys().isKeyDown(KeyListener.KEY_UP)) {
            this.getSprite().setAnimation('idle-up');
        }
        if (this.keyCommands.getKeys().isKeyDown(KeyListener.KEY_DOWN) && this.yPos < maxY) {
            this.yPos += this.yVel;
            this.getSprite().setAnimation('walk-down');
            if (this.yPos > maxY) {
                this.yPos = maxY;
            }
        }
        else if (this.keyCommands.getKeys().isKeyTyped(KeyListener.KEY_DOWN)
            && !this.keyCommands.getKeys().isKeyDown(KeyListener.KEY_DOWN)) {
            this.getSprite().setAnimation('idle-down');
        }
    }
    collidesWith(other) {
        return this.xPos < other.getXPos() + other.getImage().width
            && this.xPos + this.img.width > other.getXPos()
            && this.yPos < other.getYPos() + other.getImage().height
            && this.yPos + this.img.height > other.getYPos();
    }
    increaseSpeed(size) {
        this.xVel += size;
        this.yVel += size;
    }
    getKeyboard() {
        return this.keyCommands;
    }
}
//# sourceMappingURL=Player.js.map