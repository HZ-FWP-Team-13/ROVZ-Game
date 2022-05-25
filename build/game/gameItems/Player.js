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
        const traction = input.readAxisPressed('verticalMovement');
        const steering = input.readAxisPressed('horizontalMovement');
        if (traction != 0) {
            this.transform.moveRelative(0, traction * this.movementSpeed);
        }
        this.transform.rotate(this.previousFrameRotation = steering * this.rotationSpeed * traction);
    }
    getPreviousFrameRotation() {
        return this.previousFrameRotation;
    }
}
//# sourceMappingURL=Player.js.map