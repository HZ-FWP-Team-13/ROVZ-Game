import GameItem from './GameItem.js';
import Input from './Input.js';
export default class FovOverlay extends GameItem {
    input;
    rotationSpeed;
    constructor(ctx, imgSourcePath, xPos, yPos, rotation, frameWidth, frameHeight) {
        super(ctx, imgSourcePath, xPos, yPos, rotation, frameWidth, frameHeight, frameWidth, frameHeight, 0);
        this.input = new Input();
        this.rotationSpeed = 10;
    }
    fovRotation() {
        this.input.processRotationInput();
        this.rotate(this.input.getRotationAxis() * this.rotationSpeed);
    }
}
//# sourceMappingURL=FovOverlay.js.map