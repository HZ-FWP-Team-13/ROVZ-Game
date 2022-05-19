import GameItem from '../../engine/GameItem.js';
import Input from '../../engine/Input.js';
export default class FovOverlay extends GameItem {
    input;
    rotationSpeed;
    constructor(imgSourcePath, xPos, yPos, rotation, frameWidth, frameHeight) {
        super(imgSourcePath, xPos, yPos, rotation, frameWidth, frameHeight, frameWidth, frameHeight, 0);
        this.input = new Input();
        this.rotationSpeed = 1;
    }
    control(input) {
        this.transform.rotate(input.readRotationInput() * this.rotationSpeed);
    }
}
//# sourceMappingURL=FovOverlay.js.map