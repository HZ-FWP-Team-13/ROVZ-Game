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
    translate(vectorDRel) {
        const dist = Math.sqrt(vectorDRel.x ** 2 + vectorDRel.y ** 2);
        const moveSlopeRel = Math.atan(vectorDRel.x / vectorDRel.y);
        const moveSlopeAbs = moveSlopeRel + Trigonometry.radians(this.rotation);
        const dXAbs = dist * Math.sin(moveSlopeAbs);
        const dYAbs = -dist * Math.cos(moveSlopeAbs);
        let vectorDAbs = new Vector2(dXAbs, dYAbs);
        if (vectorDRel.y < 0) {
            vectorDAbs.negate();
        }
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