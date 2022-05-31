import GameObject from "../ObjectModule/GameObject.js";
import Transform from "../ComponentsModule/Transform.js";
export default class Camera extends GameObject {
    _frameDimensions;
    constructor(id, frameDimensions, transform = new Transform()) {
        super(id, transform);
        this.frameDimensions = frameDimensions;
    }
    get frameDimensions() {
        return this._frameDimensions;
    }
    set frameDimensions(value) {
        this._frameDimensions = value;
    }
}
//# sourceMappingURL=Camera.js.map