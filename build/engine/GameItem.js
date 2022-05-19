import Transform from './experimenting/Transform.js';
import Mesh from './Mesh.js';
export default class GameItem {
    transform;
    mesh;
    constructor(imgSourcePath, xPos, yPos, rotation, frameWidth, frameHeight, animationState = 0) {
        this.transform = new Transform(xPos, yPos, rotation);
        this.mesh = new Mesh(imgSourcePath, frameWidth, frameHeight, animationState);
    }
    getXPos() {
        return this.transform.position.x;
    }
    getYPos() {
        return this.transform.position.y;
    }
    getRotation() {
        return this.transform.orientation;
    }
    setXPos(xPos) {
        this.transform.position.x = xPos;
    }
    setYPos(yPos) {
        this.transform.position.y = yPos;
    }
    setRotation(rotation) {
        this.transform.orientation = rotation;
    }
    getTransform() {
        return this.transform;
    }
}
//# sourceMappingURL=GameItem.js.map