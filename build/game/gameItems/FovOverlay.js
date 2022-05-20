import GameItem from '../../engine/GameItem.js';
export default class FovOverlay extends GameItem {
    rotationSpeed;
    constructor(imgSourcePath, xPos, yPos, rotation, frameWidth, frameHeight) {
        super(imgSourcePath, xPos, yPos, rotation, frameWidth, frameHeight, 0);
        this.rotationSpeed = 1;
    }
    control(input) {
        const fovRotation = input.readAxisInput('fovRotation');
        this.transform.rotate(fovRotation * this.rotationSpeed);
    }
}
//# sourceMappingURL=FovOverlay.js.map