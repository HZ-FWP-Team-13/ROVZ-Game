export default class GameItem {
    _transform;
    _mesh;
    constructor(transform, mesh) {
        this.transform = transform;
        this.mesh = mesh;
    }
    get transform() {
        return this._transform;
    }
    set transform(transform) {
        this._transform = transform;
    }
    get mesh() {
        return this._mesh;
    }
    set mesh(mesh) {
        this._mesh = mesh;
    }
}
//# sourceMappingURL=GameItem.js.map