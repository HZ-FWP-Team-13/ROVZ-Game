import Component from '../CoreModule/Component.js';
import Vector2 from '../MathModule/Vector2.js';
import Mathematics from '../MathModule/Mathematics.js';
export default class Transform extends Component {
    position;
    rotation;
    scale;
    constructor(position = Vector2.zero, rotation = 0, scale = Vector2.one) {
        super('transform');
        this.position = position;
        this.rotation = rotation;
        this.scale = scale;
    }
    translate(vectorDRel = Vector2.zero) {
        const dist = Math.sqrt(vectorDRel.getX() ** 2 + vectorDRel.getY() ** 2);
        const moveSlopeRel = Math.atan(vectorDRel.getX() / vectorDRel.getY());
        const moveSlopeAbs = moveSlopeRel + Mathematics.radians(this.rotation);
        const dXAbs = dist * Math.sin(moveSlopeAbs);
        const dYAbs = -dist * Math.cos(moveSlopeAbs);
        const vectorDAbs = new Vector2(dXAbs, dYAbs);
        if (vectorDRel.getY() < 0) {
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
    getPosition() {
        return this.position;
    }
    setPosition(value) {
        this.position = value;
    }
    getRotation() {
        return this.rotation;
    }
    setRotation(value) {
        this.rotation = value;
    }
    getScale() {
        return this.scale;
    }
    setScale(value) {
        this.scale = value;
    }
}
//# sourceMappingURL=Transform.js.map