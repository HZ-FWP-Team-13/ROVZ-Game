import GameItem from '../../engine/GameObjectModule/GameItem.js';
import Vector2 from '../../engine/MathModule/Vector2.js';
export default class FovOverlay extends GameItem {
    rotationSpeed;
    constructor(transform, mesh) {
        super(transform, mesh);
        this.rotationSpeed = 1;
    }
    control(input) {
        let toCursor = new Vector2(0, -1);
        if (input.mouse.mouseInAction) {
            toCursor = Vector2.vectorDifference(this.transform.position, input.mouse.mousePosition);
            toCursor.y *= -1;
        }
        const toCursorSlope = Math.atan(toCursor.x / toCursor.y) * (180 / Math.PI) + (toCursor.y > 0 ? 180 : 0);
        this.transform.rotation = toCursorSlope;
    }
}
//# sourceMappingURL=FovOverlay.js.map