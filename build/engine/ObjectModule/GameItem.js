import GameObject from './GameObject.js';
export default class GameItem extends GameObject {
    mesh;
    constructor(id, transform, mesh) {
        super(id, transform);
        this.mesh = mesh;
    }
    control(input, elapsed, camera) {
        return null;
    }
    getMesh() {
        return this.mesh;
    }
    setMesh(value) {
        this.mesh = value;
    }
}
//# sourceMappingURL=GameItem.js.map