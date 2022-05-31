import GameObject from "./GameObject.js";
export default class GameItem extends GameObject {
    _mesh;
    constructor(id, transform, mesh) {
        super(id, transform);
        this.mesh = mesh;
    }
    get mesh() {
        return this._mesh;
    }
    set mesh(value) {
        this._mesh = value;
    }
}
//# sourceMappingURL=GameItem.js.map