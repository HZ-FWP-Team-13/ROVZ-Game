import Transform from './experimenting/Transform.js';
import Mesh from './Mesh.js';
export default class GameItem {
    transform;
    mesh;
    constructor(imgSourcePath, xPos, yPos, rotation, frameWidth, frameHeight, animationState = 0) {
        this.transform = new Transform(xPos, yPos, rotation);
        this.mesh = new Mesh(imgSourcePath, frameWidth, frameHeight, animationState);
    }
    getTransform() {
        return this.transform;
    }
}
//# sourceMappingURL=GameItem.js.map