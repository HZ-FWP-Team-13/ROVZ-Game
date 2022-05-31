import GameObject from "./GameObject.js";
export default class GameItem extends GameObject {
    _transform;
    constructor(id, transform) {
        super(id);
        this.transform = transform;
    }
    get transform() {
        return this._transform;
    }
    set transform(value) {
        this._transform = value;
    }
}
//# sourceMappingURL=GameItem.js.map