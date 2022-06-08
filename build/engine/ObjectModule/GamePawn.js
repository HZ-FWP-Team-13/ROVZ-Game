import GameItem from './GameItem.js';
export default class GamePawn extends GameItem {
    collider;
    constructor(id, transform, mesh, collider) {
        super(id, transform, mesh);
        this.collider = collider;
    }
    createColliderPoints() {
        this.getCollider().generateRectCollider(this.getMesh().getDimensions().getX(), this.getMesh().getDimensions().getY());
    }
    getCollider() {
        return this.collider;
    }
    setCollider(value) {
        this.collider = value;
    }
}
//# sourceMappingURL=GamePawn.js.map