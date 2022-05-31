import GameItem from "./GameItem.js";
export default class GamePawn extends GameItem {
    _collider;
    constructor(id, transform, mesh, collider) {
        super(id, transform, mesh);
        this.collider = collider;
    }
    get collider() {
        return this._collider;
    }
    set collider(value) {
        this._collider = value;
    }
}
//# sourceMappingURL=GamePawn.js.map