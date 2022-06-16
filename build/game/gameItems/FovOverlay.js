import GameItem from '../../engine/ObjectModule/GameItem.js';
import Vector2 from '../../engine/MathModule/Vector2.js';
import Mathematics from '../../engine/MathModule/Mathematics.js';
export default class FovOverlay extends GameItem {
    rotationSpeed;
    constructor(id, transform, mesh) {
        super(id, transform, mesh);
        this.rotationSpeed = 1;
    }
    control(input, elapsed, camera) {
        let toCursor = new Vector2(0, -1);
        if (input.getMouse().getMouseInAction()) {
            toCursor = Vector2.vectorsSum(input.getMouse().getMousePosition(), camera.getTransform().getPosition());
            toCursor = Vector2.vectorDifference(toCursor, new Vector2(camera.getFrameDimensions().getX() / 2, camera.getFrameDimensions().getY() / 2));
            toCursor = Vector2.vectorDifference(this.getTransform().getPosition(), toCursor);
            toCursor.setY(toCursor.getY() * -1);
        }
        let toCursorSlope = Mathematics.degrees(Math.atan(toCursor.getX() / toCursor.getY()));
        toCursorSlope += (toCursor.getY() > 0 ? 180 : 0);
        this.getTransform().setRotation(toCursorSlope);
    }
}
//# sourceMappingURL=FovOverlay.js.map