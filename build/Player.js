import GameItem from './GameItem.js';
import Input from './Input.js';
export default class Player extends GameItem {
    input;
    movementSpeed;
    rotationSpeed;
    constructor(ctx, imgSourcePath, xPos, yPos, rotation, frameWidth, frameHeight, colliderWidth = frameWidth, colliderHeight = frameHeight, animationState = 0) {
        super(ctx, imgSourcePath, xPos, yPos, rotation, frameWidth, frameHeight, colliderWidth, colliderHeight, animationState);
        this.input = new Input();
        this.movementSpeed = 10;
        this.rotationSpeed = 10;
    }
    control() {
        this.moveRelative(0, this.input.readVerticalInput() * this.movementSpeed);
        this.rotate(this.input.readHorizontalInput() * this.rotationSpeed * -this.input.getVerticalAxis());
    }
}
//# sourceMappingURL=Player.js.map