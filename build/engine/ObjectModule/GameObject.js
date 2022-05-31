export default class GameObject {
    _id;
    _transform;
    constructor(id, transform) {
        this.id = id;
        this.transform = transform;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get transform() {
        return this._transform;
    }
    set transform(value) {
        this._transform = value;
    }
}
//# sourceMappingURL=GameObject.js.map