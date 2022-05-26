import Vector2 from "../MathModule/Vector2.js";
import Trigonometry from "../MathModule/Trigonometry.js";
export default class Transform {
    _position;
    _rotation;
    _scale;
    constructor(position = Vector2.zero, rotation = 0, scale = Vector2.one) {
        this.position = position;
        this.rotation = rotation;
        this.scale = scale;
    }
    translate(dXRel, dYRel) {
        const dist = Math.sqrt(dXRel ** 2 + dYRel ** 2) * (dXRel >= 0 ? 1 : -1) * (dYRel >= 0 ? 1 : -1);
        const moveSlopeRel = Math.atan(dXRel / dYRel);
        const moveSlopeAbs = moveSlopeRel + Trigonometry.radians(this.rotation);
        const dXAbs = dist * Math.sin(moveSlopeAbs);
        const dYAbs = -dist * Math.cos(moveSlopeAbs);
        const vectorDAbs = new Vector2(dXAbs, dYAbs);
        this.moveAbsolute(vectorDAbs);
    }
    moveAbsolute(vectorDAbs) {
        this.position = Vector2.vectorsSum(this.position, vectorDAbs);
    }
    rotate(dR) {
        this.rotation += dR;
    }
    get position() {
        return this._position;
    }
    set position(position) {
        this._position = position;
    }
    get rotation() {
        return this._rotation;
    }
    set rotation(rotation) {
        this._rotation = rotation;
    }
    get scale() {
        return this._scale;
    }
    set scale(scale) {
        this._scale = scale;
    }
}
//# sourceMappingURL=Transform.js.map