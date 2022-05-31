import GameItem from '../../engine/ObjectModule/GameItem.js';
import Vector2 from '../../engine/MathModule/Vector2.js';
import Mathematics from '../../engine/MathModule/Mathematics.js';
export default class FovOverlay extends GameItem {
    rotationSpeed;
    constructor(id, transform, mesh) {
        super(id, transform, mesh);
        this.rotationSpeed = 1;
    }
    control(input, elapsed) {
        let toCursor = new Vector2(0, -1);
        if (input.mouse.mouseInAction) {
            toCursor = Vector2.vectorDifference(this.transform.position, input.mouse.mousePosition);
            toCursor.y *= -1;
        }
        const toCursorSlope = Mathematics.degrees(Math.atan(toCursor.x / toCursor.y)) + (toCursor.y > 0 ? 180 : 0);
        this.transform.rotation = toCursorSlope;
    }
}
//# sourceMappingURL=FovOverlay.js.map