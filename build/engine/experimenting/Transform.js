import Vector2 from "./Vector2.js";
export default class Transform {
    position;
    orientation;
    scale;
    constructor(xPos = 0, yPos = 0, rotation = 0, xScale = 1, yScale = 1) {
        this.position = new Vector2(xPos, yPos);
        this.orientation = rotation;
        this.scale = new Vector2(xScale, yScale);
    }
    moveAbsolute(vectorDAbs) {
        this.position = Vector2.vectorsSum(this.position, vectorDAbs);
    }
    rotate(dR) {
        this.orientation += dR;
    }
    moveRelative(dXRel, dYRel) {
        const dist = Math.sqrt(dXRel ** 2 + dYRel ** 2) * (dXRel >= 0 ? 1 : -1) * (dYRel >= 0 ? 1 : -1);
        const moveSlopeRel = Math.atan(dXRel / dYRel);
        const moveSlopeAbs = moveSlopeRel + this.getRotationInRadians();
        const vectorDAbs = new Vector2(dist * Math.sin(moveSlopeAbs), -dist * Math.cos(moveSlopeAbs));
        console.log(Math.atan(dXRel / dYRel));
        this.moveAbsolute(vectorDAbs);
    }
    getXPos() {
        return this.position.x;
    }
    getYPos() {
        return this.position.y;
    }
    getRotation() {
        return this.orientation;
    }
    getRotationInRadians() {
        return (this.orientation / 180) * Math.PI;
    }
    setXPos(xPos) {
        this.position.x = xPos;
    }
    setYPos(yPos) {
        this.position.y = yPos;
    }
    setRotation(rotation) {
        this.orientation = rotation;
    }
}
//# sourceMappingURL=Transform.js.map