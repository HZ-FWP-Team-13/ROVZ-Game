import GameObject from '../ObjectModule/GameObject.js';
import Transform from '../ComponentsModule/Transform.js';
export default class Camera extends GameObject {
    frameDimensions;
    constructor(id, frameDimensions, transform = new Transform()) {
        super(id, transform);
        this.frameDimensions = frameDimensions;
    }
    getFrameDimensions() {
        return this.frameDimensions;
    }
    setFrameDimensions(value) {
        this.frameDimensions = value;
    }
}
//# sourceMappingURL=Camera.js.map