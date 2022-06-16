import GameItem from './GameItem.js';
export default class GamePawn extends GameItem {
    collider;
    constructor(id, transform, mesh, collider) {
        super(id, transform, mesh);
        this.collider = collider;
    }
    getCollider() {
        return this.collider;
    }
    setCollider(value) {
        this.collider = value;
    }
}
//# sourceMappingURL=GamePawn.js.map