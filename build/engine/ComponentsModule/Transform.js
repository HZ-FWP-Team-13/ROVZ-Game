import Component from "../CoreModule/Component.js";
import Vector2 from "../MathModule/Vector2.js";
import Mathematics from "../MathModule/Mathematics.js";
export default class Transform extends Component {
    _position;
    _rotation;
    _scale;
    constructor(position = Vector2.zero, rotation = 0, scale = Vector2.one) {
        super("transform");
        this.position = position;
        this.rotation = rotation;
        this.scale = scale;
    }
    translate(vectorDRel = Vector2.zero) {
        const dist = Math.sqrt(vectorDRel.x ** 2 + vectorDRel.y ** 2);
        const moveSlopeRel = Math.atan(vectorDRel.x / vectorDRel.y);
        const moveSlopeAbs = moveSlopeRel + Mathematics.radians(this.rotation);
        const dXAbs = dist * Math.sin(moveSlopeAbs);
        const dYAbs = -dist * Math.cos(moveSlopeAbs);
        let vectorDAbs = new Vector2(dXAbs, dYAbs);
        if (vectorDRel.y < 0) {
            vectorDAbs.negate();
        }
        this.moveAbsolute(vectorDAbs);
    }
    moveAbsolute(vectorDAbs = Vector2.zero) {
        this.position = Vector2.vectorsSum(this.position, vectorDAbs);
    }
    rotate(dR = 0) {
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