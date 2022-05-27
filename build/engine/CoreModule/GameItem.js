import GameObject from "./GameObject.js";
export default class GameItem extends GameObject {
    _mesh;
    constructor(transform, mesh) {
        super(transform);
        this.mesh = mesh;
    }
    get mesh() {
        return this._mesh;
    }
    set mesh(mesh) {
        this._mesh = mesh;
    }
}
//# sourceMappingURL=GameItem.js.map