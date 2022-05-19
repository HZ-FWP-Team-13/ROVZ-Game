import Vector2 from "./Vector2.js";
export default class Transform {
    position;
    orientation;
    scale;
    constructor(xPos = 0, yPos = 0, rotation = 0, scaleX = 1, scaleY = 1) {
        this.position = new Vector2(xPos, yPos);
        this.orientation = rotation;
        this.scale = new Vector2(scaleX, scaleY);
    }
    moveAbsolute(dXAbs, dYAbs, dR = 0) {
        this.position.x += dXAbs;
        this.position.y += dYAbs;
        this.rotate(dR);
    }
    rotate(dR) {
        this.orientation += dR;
    }
    moveRelative(dXRel, dYRel) {
        const dist = Math.sqrt(dXRel ** 2 + dYRel ** 2) * (dXRel >= 0 ? 1 : -1) * (dYRel >= 0 ? 1 : -1);
        const moveSlopeRel = Math.atan(dXRel / dYRel);
        const moveSlopeAbs = moveSlopeRel + this.getRotationInRadians();
        const dXAbs = dist * Math.sin(moveSlopeAbs);
        const dYAbs = dist * Math.cos(moveSlopeAbs);
        console.log(Math.atan(dXRel / dYRel));
        this.moveAbsolute(dXAbs, -dYAbs);
    }
    getRotationInRadians() {
        return (this.orientation / 180) * Math.PI;
    }
}
//# sourceMappingURL=Transform.js.map