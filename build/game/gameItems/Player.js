import GameItem from '../../engine/GameItem.js';
import Input from '../../engine/Input.js';
export default class Player extends GameItem {
    input;
    movementSpeed;
    rotationSpeed;
    previousFrameRotation;
    constructor(imgSourcePath, xPos, yPos, rotation, frameWidth, frameHeight, colliderWidth = frameWidth, colliderHeight = frameHeight, animationState = 0) {
        super(imgSourcePath, xPos, yPos, rotation, frameWidth, frameHeight, colliderWidth, colliderHeight, animationState);
        this.input = new Input();
        this.movementSpeed = 1;
        this.rotationSpeed = 1;
    }
    control() {
        this.input.readVerticalInput();
        if (this.input.getVerticalAxis() != 0) {
            this.moveRelative(0, this.input.getVerticalAxis() * this.movementSpeed);
        }
        this.rotate(this.previousFrameRotation =
            this.input.readHorizontalInput() * this.rotationSpeed * this.input.getVerticalAxis());
    }
    getPreviousFrameRotation() {
        return this.previousFrameRotation;
    }
}
//# sourceMappingURL=Player.js.map