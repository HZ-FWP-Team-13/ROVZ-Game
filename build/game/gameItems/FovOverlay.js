import GameItem from '../../engine/CoreModule/GameItem.js';
import Vector2 from '../../engine/MathModule/Vector2.js';
import Mathematics from '../../engine/MathModule/Mathematics.js';
export default class FovOverlay extends GameItem {
    _mesh;
    rotationSpeed;
    constructor(id, transform, mesh) {
        super(id, transform);
        this.mesh = mesh;
        this.rotationSpeed = 1;
    }
    control(input) {
        let toCursor = new Vector2(0, -1);
        if (input.mouse.mouseInAction) {
            toCursor = Vector2.vectorDifference(this.transform.position, input.mouse.mousePosition);
            toCursor.y *= -1;
        }
        const toCursorSlope = Mathematics.degress(Math.atan(toCursor.x / toCursor.y)) + (toCursor.y > 0 ? 180 : 0);
        this.transform.rotation = toCursorSlope;
    }
    get mesh() {
        return this._mesh;
    }
    set mesh(mesh) {
        this._mesh = mesh;
    }
}
//# sourceMappingURL=FovOverlay.js.map