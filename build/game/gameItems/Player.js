import GameItem from '../../engine/GameItem.js';
export default class Player extends GameItem {
    movementSpeed;
    rotationSpeed;
    previousFrameRotation;
    constructor(imgSourcePath, xPos, yPos, rotation, frameWidth, frameHeight, animationState = 0) {
        super(imgSourcePath, xPos, yPos, rotation, frameWidth, frameHeight, animationState);
        this.movementSpeed = 1;
        this.rotationSpeed = 1;
    }
    control(input) {
        input.readVerticalInput();
        if (input.getVerticalAxis() != 0) {
            this.transform.moveRelative(0, input.getVerticalAxis() * this.movementSpeed);
        }
        this.transform.rotate(this.previousFrameRotation =
            input.readHorizontalInput() * this.rotationSpeed * input.getVerticalAxis());
    }
    getPreviousFrameRotation() {
        return this.previousFrameRotation;
    }
}
//# sourceMappingURL=Player.js.map