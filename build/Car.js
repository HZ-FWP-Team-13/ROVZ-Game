import Game from "./Game.js";
export default class Car {
    xPos;
    yPos;
    image;
    state;
    rotation;
    constructor(xPos, yPos, state) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.image = Game.loadNewImage('./assets/img/car.png');
        this.state = state;
        this.rotation = 0;
    }
    draw(ctx) {
        ctx.save();
        ctx.translate(this.xPos, this.yPos);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.drawImage(this.image, 0 - this.image.width / 2, 0 - this.image.height / 2);
        ctx.restore();
    }
    move() {
        switch (this.state) {
            case 'UP': {
                this.yPos -= 3;
                this.rotation = 0;
                break;
            }
            case 'DOWN': {
                this.yPos += 3;
                this.rotation = 180;
                break;
            }
            case 'RIGHT': {
                this.xPos += 3;
                this.rotation = 90;
                break;
            }
            case 'LEFT': {
                this.xPos -= 3;
                this.rotation = 270;
                break;
            }
            case 'IDLE': {
                break;
            }
            case 'IDLE': {
                break;
            }
        }
    }
    setState(state) {
        this.state = state;
    }
    setXPos(xPos) {
        this.xPos = xPos;
    }
    setYPos(yPos) {
        this.yPos = yPos;
    }
    getXPos() {
        return this.xPos;
    }
    getYPos() {
        return this.yPos;
    }
    getImageWidth() {
        return this.image.width;
    }
    getImageHeight() {
        return this.image.height;
    }
    getTopBound() {
        return this.yPos - this.image.height / 2;
    }
    getBottomBound() {
        return this.yPos + this.image.height / 2;
    }
    getLeftBound() {
        return this.xPos - this.image.width / 2;
    }
    getRightBound() {
        return this.xPos + this.image.width / 2;
    }
    collidesWithTrigger(trigger) {
        if ((this.getRightBound() >= trigger.getLeftBound()
            && this.getLeftBound() <= trigger.getRightBound())
            && (this.getTopBound() <= trigger.getBottomBound() && this.getBottomBound() >= trigger.getTopBound())) {
            console.log(`${this} collided with ${trigger}`);
            this.state = trigger.getState();
        }
    }
}
//# sourceMappingURL=Car.js.map