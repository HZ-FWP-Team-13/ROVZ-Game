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
    playerMovement() {
        this.input.processMovementInput();
        this.moveRelative(0, this.input.getVerticalAxis() * this.movementSpeed);
        if (this.input.getVerticalAxis() != 0) {
            this.rotate(this.input.getHorizontalAxis() * this.rotationSpeed);
        }
    }
}
//# sourceMappingURL=Player.js.map