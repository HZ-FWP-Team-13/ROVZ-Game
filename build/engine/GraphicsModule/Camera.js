import GameObject from '../ObjectModule/GameObject.js';
import Vector2 from '../MathModule/Vector2.js';
import Transform from '../ComponentsModule/Transform.js';
import Mathematics from '../MathModule/Mathematics.js';
export default class Camera extends GameObject {
    frameDimensions;
    constructor(id, frameDimensions, transform = new Transform()) {
        super(id, transform);
        this.frameDimensions = frameDimensions;
    }
    getTopLeftCornerPosition() {
        const cameraRotation = Mathematics.radians(this.getTransform().getRotation());
        const relX = this.frameDimensions.getX() / 2;
        const relY = this.frameDimensions.getY() / 2;
        const absX = relX * Math.cos(cameraRotation) - relY * Math.sin(cameraRotation);
        const absY = relX * Math.sin(cameraRotation) + relY * Math.cos(cameraRotation);
        const topLeftCornerPosition = Vector2.vectorsSum(this.getTransform().getPosition(), new Vector2(absX, absY));
        return topLeftCornerPosition;
    }
    getFrameDimensions() {
        return this.frameDimensions;
    }
    setFrameDimensions(value) {
        this.frameDimensions = value;
    }
}
//# sourceMappingURL=Camera.js.map