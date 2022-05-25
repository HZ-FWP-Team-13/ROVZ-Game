import Vector2 from '../../engine/experimenting/Vector2.js';
import GameItem from '../../engine/GameItem.js';
export default class FovOverlay extends GameItem {
    rotationSpeed;
    constructor(imgSourcePath, xPos, yPos, rotation, frameWidth, frameHeight) {
        super(imgSourcePath, xPos, yPos, rotation, frameWidth, frameHeight, 0);
        this.rotationSpeed = 1;
    }
    control(input) {
        let toCursor = new Vector2(0, -1);
        if (input.getMouseInAction()) {
            toCursor = Vector2.vectorDifference(this.getTransform().position, input.getMousePosition());
            toCursor.y *= -1;
        }
        const toCursorSlope = Math.atan(toCursor.x / toCursor.y) * (180 / Math.PI) + (toCursor.y > 0 ? 180 : 0);
        this.transform.setRotation(toCursorSlope);
    }
}
//# sourceMappingURL=FovOverlay.js.map