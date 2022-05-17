import GameItem from './GameItem.js';
import Input from './Input.js';
export default class FovOverlay extends GameItem {
    input;
    rotationSpeed;
    constructor(imgSourcePath, xPos, yPos, rotation, frameWidth, frameHeight) {
        super(imgSourcePath, xPos, yPos, rotation, frameWidth, frameHeight, frameWidth, frameHeight, 0);
        this.input = new Input();
        this.rotationSpeed = 1;
    }
    control() {
        this.rotate(this.input.readRotationInput() * this.rotationSpeed);
    }
}
//# sourceMappingURL=FovOverlay.js.map